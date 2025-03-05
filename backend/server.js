const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { MongoClient, ServerApiVersion } = require('mongodb');
const crypto = require('crypto');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const stripe = require('stripe')('sk_test_51Qy1IkDO1xHmcck34QjJM47p4jkKFGViTuIVlbY1njZqObWxc9hWMvrWCsiSVgCRd08Xx1fyfXYG90Hxw6yl84WO00Xt3GGTjU'); // Test secret key
const { callWasabiApi } = require('./wasabiApi');

// MongoDB Connection
const uri = "mongodb+srv://faz:p6dH6vkUBrcGy4Ed@aiacard-sandbox.a03vg.mongodb.net/?retryWrites=true&w=majority&appName=aiacard-sandbox";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

function generateSignature(message, privateKey) {
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(message);
  signer.end();
  return signer.sign(privateKey, 'base64');
}

// Helper: Generate a random alphanumeric string of 22 characters for merchantOrderNo
function generateMerchantOrderNo(length = 22) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Function to open a card using the WasabiCard API
async function openCard(holderId) {
  const payload = {
    merchantOrderNo: generateMerchantOrderNo(),
    holderId: holderId,
    cardTypeId: 111016,
    amount: 50
  };
  try {
    const response = await callWasabiApi('/merchant/core/mcb/card/openCard', payload);
    console.log('Card opened successfully:', response);
    return response;
  } catch (error) {
    console.error('Error opening card:', error);
    throw error;
  }
}

// Secret key for JWT (store securely in production)
const secretKey = "your_super_secret_key";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
client.connect()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// Helper: Generate a 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "verify@card.aianalysis.group",
    pass: "1gL5zemXG6gFsv331epx",
  },
  tls: { ciphers: 'SSLv3' }
});

// Registration Endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password, ...userData } = req.body;
    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered. Please log in." });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

    await collection.insertOne({
      ...userData,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      otpVerified: false,
    });

    console.log(`📩 Generated OTP for ${email}: ${otp}`);

    await transporter.sendMail({
      from: "verify@card.aianalysis.group",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`
    });

    res.status(200).json({ success: true, message: "OTP sent for verification." });
  } catch (error) {
    console.error("❌ Error during registration:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// OTP Verification for Registration
app.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");

    const user = await collection.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    if (user.otp !== otp || new Date(user.otpExpiry) < new Date()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP. Please try again." });
    }

    await collection.updateOne(
      { email },
      { $set: { otpVerified: true }, $unset: { otp: "", otpExpiry: "" } }
    );

    const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
    console.log(`✅ OTP verified for ${email}. User is now verified.`);

    res.status(200).json({
      success: true,
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photo: user.photo,         
        birthday: user.birthday,
        address: user.address,
        town: user.town,
        postCode: user.postCode,
        country: user.country,
        referralId: user.referralId,
        holderId: user.holderId,
      }
    });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login & OTP Send Endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");

    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid username or password." });
    }

    console.log("Stored password:", user.password, "Provided password:", password);

    if (!user.password) {
      return res.status(500).json({ success: false, message: "User password is missing from the database." });
    }

    if (!(await bcryptjs.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid username or password." });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60000);
    console.log(`🔑 Generated Login OTP for ${email}: ${otp}`);

    await collection.updateOne({ email }, { $set: { otp, otpExpiry } });

    await transporter.sendMail({
      from: "verify@card.aianalysis.group",
      to: email,
      subject: "Your Login OTP Code",
      text: `Your OTP code for login is: ${otp}. It is valid for 10 minutes.`
    });

    res.status(200).json({ success: true, requiresOTP: true, message: "OTP sent for login verification." });
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Resend OTP for Login
app.post('/resend-login-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");

    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60000);
    console.log(`🔑 Resent Login OTP for ${email}: ${otp}`);

    await collection.updateOne({ email }, { $set: { otp, otpExpiry } });
    await transporter.sendMail({
      from: "verify@card.aianalysis.group",
      to: email,
      subject: "Your Login OTP Code",
      text: `Your OTP code for login is: ${otp}. It is valid for 10 minutes.`
    });

    res.status(200).json({ success: true, message: "OTP resent for login verification." });
  } catch (error) {
    console.error("❌ Error resending login OTP:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Resend OTP for Registration
app.post('/resend-register-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");

    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
    console.log(`📩 Resent Register OTP for ${email}: ${otp}`);

    await collection.updateOne({ email }, { $set: { otp, otpExpiry } });
    await transporter.sendMail({
      from: "verify@card.aianalysis.group",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`
    });

    res.status(200).json({ success: true, message: "OTP resent for registration verification." });
  } catch (error) {
    console.error("❌ Error resending register OTP:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// OTP Verification for Login
app.post('/verify-login-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");

    const user = await collection.findOne({ email });
    if (!user || user.otp !== otp || new Date(user.otpExpiry) < new Date()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP. Please try again." });
    }

    await collection.updateOne({ email }, { $unset: { otp: "", otpExpiry: "" } });

    const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
    console.log(`✅ OTP verified for ${email}. User is now logged in.`);

    res.status(200).json({
      success: true,
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photo: user.photo,
        birthday: user.birthday,
        address: user.address,
        town: user.town,
        postCode: user.postCode,
        country: user.country,
        referralId: user.referralId,
        holderId: user.holderId,
      }
    });
  } catch (error) {
    console.error("❌ Error verifying login OTP:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update Profile Endpoint
app.post('/updateProfile', async (req, res) => {
  try {
    const { email, ...updatedData } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }
    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");

    // Perform the update
    const result = await collection.updateOne({ email }, { $set: updatedData });
    if (result.modifiedCount > 0) {
      // Retrieve the updated user record
      const updatedUser = await collection.findOne({ email });

      // **Generate a NEW token** with updated user info (e.g., if email changed).
      const newToken = jwt.sign(
        { id: updatedUser._id, email: updatedUser.email },
        secretKey,
        { expiresIn: '1h' }
      );

      // Return the new token & updated user
      res.status(200).json({ 
        success: true,
        user: updatedUser,
        token: newToken, 
      });
    } else {
      res.status(400).json({ success: false, message: "Update failed." });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Request to change email
app.post('/change-email-otp', async (req, res) => {
  try {
    const { currentEmail, newEmail } = req.body;
    if (!currentEmail || !newEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Both currentEmail and newEmail are required." });
    }

    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");

    // Validate the user by current email
    const user = await collection.findOne({ email: currentEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const emailChangeOtp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60000);

    await collection.updateOne(
      { email: currentEmail },
      {
        $set: {
          emailChangeOtp,
          emailChangeExpiry: otpExpiry,
          tempNewEmail: newEmail,
        },
      }
    );

    console.log(`🔑 Generated Email Change OTP for ${currentEmail}: ${emailChangeOtp}`);

    await transporter.sendMail({
      from: "verify@card.aianalysis.group",
      to: newEmail,
      subject: "Your Email Change OTP Code",
      text: `Your OTP code for changing email is: ${emailChangeOtp}. It is valid for 10 minutes.`,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to new email address. Please verify to complete the change.",
    });
  } catch (error) {
    console.error("❌ Error in /change-email-otp:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Verify and update email
app.post('/verify-change-email-otp', async (req, res) => {
  try {
    const { currentEmail, otp } = req.body;
    if (!currentEmail || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "currentEmail and otp are required." });
    }

    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");

    const user = await collection.findOne({ email: currentEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (
      user.emailChangeOtp !== otp ||
      !user.emailChangeExpiry ||
      new Date(user.emailChangeExpiry) < new Date()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP. Please try again." });
    }

    const newEmail = user.tempNewEmail;
    if (!newEmail) {
      return res.status(400).json({
        success: false,
        message: "No new email found. Please request email change again.",
      });
    }

    const existingUserWithNewEmail = await collection.findOne({ email: newEmail });
    if (existingUserWithNewEmail) {
      return res
        .status(400)
        .json({ success: false, message: "New email is already in use." });
    }

    await collection.updateOne(
      { email: currentEmail },
      {
        $set: { email: newEmail },
        $unset: {
          emailChangeOtp: "",
          emailChangeExpiry: "",
          tempNewEmail: "",
        },
      }
    );

    const updatedUser = await collection.findOne({ email: newEmail });

    const token = jwt.sign(
      { id: updatedUser._id, email: updatedUser.email },
      secretKey,
      { expiresIn: '1h' }
    );

    console.log(`✅ Email updated from ${currentEmail} to ${newEmail} successfully. New token generated.`);

    res.status(200).json({
      success: true,
      message: "Email updated successfully.",
      newEmail,
      token,  
      user: updatedUser
    });
  } catch (error) {
    console.error("❌ Error in /verify-change-email-otp:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Request to change phone
app.post('/change-phone-otp', async (req, res) => {
  try {
    // Instead of single phone, retrieve area codes & mobiles:
    const { currentAreaCode, currentMobile, newAreaCode, newMobile } = req.body;
    if (!currentAreaCode || !currentMobile || !newAreaCode || !newMobile) {
      return res
        .status(400)
        .json({ success: false, message: "currentAreaCode, currentMobile, newAreaCode, and newMobile are required." });
    }

    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");

    // Find user by BOTH fields
    const user = await collection.findOne({ areaCode: currentAreaCode, mobile: currentMobile });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const phoneChangeOtp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60000);

    // Store new areaCode + mobile in temp fields
    await collection.updateOne(
      { areaCode: currentAreaCode, mobile: currentMobile },
      {
        $set: {
          phoneChangeOtp,
          phoneChangeExpiry: otpExpiry,
          tempNewAreaCode: newAreaCode,
          tempNewPhone: newMobile,
        },
      }
    );

    console.log(`🔑 Generated Phone Change OTP for ${currentAreaCode}${currentMobile}: ${phoneChangeOtp}`);

    // If user has an email, send them the OTP. 
    if (user.email) {
      await transporter.sendMail({
        from: "verify@card.aianalysis.group",
        to: user.email,
        subject: "Your Phone Change OTP Code",
        text: `Your OTP code for changing phone is: ${phoneChangeOtp}. It is valid for 10 minutes.`,
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP sent. Please verify to complete phone change.",
    });
  } catch (error) {
    console.error("❌ Error in /change-phone-otp:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Verify phone OTP and update
app.post('/verify-change-phone-otp', async (req, res) => {
  try {
    // Retrieve areaCode, mobile, and OTP
    const { currentAreaCode, currentMobile, otp } = req.body;
    if (!currentAreaCode || !currentMobile || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "currentAreaCode, currentMobile, and otp are required." });
    }

    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");

    const user = await collection.findOne({ areaCode: currentAreaCode, mobile: currentMobile });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (
      user.phoneChangeOtp !== otp ||
      !user.phoneChangeExpiry ||
      new Date(user.phoneChangeExpiry) < new Date()
    ) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP. Please try again." });
    }

    // Retrieve the new areaCode + mobile stored in temp fields
    const newAreaCode = user.tempNewAreaCode;
    const newMobile = user.tempNewPhone;
    if (!newAreaCode || !newMobile) {
      return res.status(400).json({
        success: false,
        message: "No new phone found. Please request phone change again.",
      });
    }

    // Ensure new phone is not already in use
    const existingUserWithNewPhone = await collection.findOne({ areaCode: newAreaCode, mobile: newMobile });
    if (existingUserWithNewPhone) {
      return res.status(400).json({ success: false, message: "New phone is already in use." });
    }

    await collection.updateOne(
      { areaCode: currentAreaCode, mobile: currentMobile },
      {
        $set: { areaCode: newAreaCode, mobile: newMobile },
        $unset: {
          phoneChangeOtp: "",
          phoneChangeExpiry: "",
          tempNewAreaCode: "",
          tempNewPhone: "",
        },
      }
    );

    const updatedUser = await collection.findOne({ areaCode: newAreaCode, mobile: newMobile });

    const token = jwt.sign(
      { id: updatedUser._id, email: updatedUser.email, mobile: updatedUser.mobile },
      secretKey,
      { expiresIn: '1h' }
    );

    console.log(`✅ Phone updated from ${currentAreaCode}${currentMobile} to ${newAreaCode}${newMobile} successfully. Token regenerated.`);

    res.status(200).json({
      success: true,
      message: "Phone updated successfully.",
      newPhone: newAreaCode + newMobile,
      token,
      user: updatedUser
    });
  } catch (error) {
    console.error("❌ Error in /verify-change-phone-otp:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Change Password OTP Endpoint
app.post('/change-password-otp', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: "Authorization token is required." });
    }
    const token = req.headers.authorization.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }
    const email = decoded.email;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Current and new password are required." });
    }
    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    const valid = await bcryptjs.compare(currentPassword, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Current password is incorrect." });
    }
    // Generate OTP for password change
    const passwordChangeOtp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60000); // valid for 10 minutes
    // Store OTP and the new password in a temporary field
    await collection.updateOne({ email }, {
      $set: {
        passwordChangeOtp,
        passwordChangeExpiry: otpExpiry,
        tempNewPassword: newPassword
      }
    });
    console.log(`🔑 Generated Password Change OTP for ${email}: ${passwordChangeOtp}`);
    // Send OTP via email
    await transporter.sendMail({
      from: "verify@card.aianalysis.group",
      to: email,
      subject: "Your Password Change OTP Code",
      text: `Your OTP code for changing password is: ${passwordChangeOtp}. It is valid for 10 minutes.`
    });
    res.status(200).json({
      success: true,
      message: "OTP sent to your email for password change. Please verify to complete the change."
    });
  } catch (error) {
    console.error("❌ Error in /change-password-otp:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Verify Change Password OTP and Update Endpoint
app.post('/verify-change-password-otp', async (req, res) => {
  try {
    const { otp } = req.body;
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: "Authorization token is required." });
    }
    const token = req.headers.authorization.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }
    const email = decoded.email;
    if (!otp) {
      return res.status(400).json({ success: false, message: "OTP is required." });
    }
    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    if (user.passwordChangeOtp !== otp || !user.passwordChangeExpiry || new Date(user.passwordChangeExpiry) < new Date()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }
    const tempNewPassword = user.tempNewPassword;
    if (!tempNewPassword) {
      return res.status(400).json({ success: false, message: "New password not found. Please request a password change again." });
    }
    // Hash the new password
    const hashedNewPassword = await bcryptjs.hash(tempNewPassword, 10);
    // Update the user's password and remove temporary fields
    const updateResult = await collection.updateOne({ email }, {
      $set: { password: hashedNewPassword },
      $unset: { passwordChangeOtp: "", passwordChangeExpiry: "", tempNewPassword: "" }
    });
    if (updateResult.modifiedCount > 0) {
      const updatedUser = await collection.findOne({ email });
      const newToken = jwt.sign(
        { id: updatedUser._id, email: updatedUser.email },
        secretKey,
        { expiresIn: '1h' }
      );
      console.log(`✅ Password updated for ${email}. New token generated.`);
      return res.status(200).json({
        success: true,
        message: "Password updated successfully.",
        token: newToken,
        user: updatedUser
      });
    } else {
      return res.status(400).json({ success: false, message: "Failed to update password." });
    }
  } catch (error) {
    console.error("❌ Error in /verify-change-password-otp:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Ping Endpoint
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// Stripe Integration Endpoint
app.post('/payment-sheet', async (req, res) => {
  const { amount } = req.body;
  try {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2022-11-15' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Cardholder Endpoint & Open Card Integration
app.post('/create-cardholder', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const database = client.db("aiacard-sandbox-db");
    const collection = database.collection("aiacard-sandox-col");
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const requiredFields = [
      "firstName", "lastName", "email", "areaCode",
      "mobile", "birthday", "address", "town", "postCode", "country"
    ];
    for (const field of requiredFields) {
      if (!user[field]) {
        return res.status(400).json({ success: false, message: `Missing required field: ${field}` });
      }
    }

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      areaCode: user.areaCode,
      mobile: user.mobile,
      birthday: user.birthday,
      address: user.address,
      town: user.town,
      postCode: user.postCode,
      country: user.country,
      cardTypeId: 111016,
    };

    const wasabiResult = await callWasabiApi("/merchant/core/mcb/card/holder/create", payload);
    console.log("WasabiCard API response:", wasabiResult);

    const holderId = wasabiResult.data.holderId;
    await collection.updateOne({ email: user.email }, { $set: { holderId } });
    console.log(`Updated user ${email} with holderId: ${holderId}`);

    try {
      const openCardResponse = await openCard(holderId);
      console.log("Open Card API response:", openCardResponse);
    } catch (openError) {
      console.error("Failed to open card for holderId", holderId, openError);
    }

    res.json({ success: true, data: wasabiResult });
  } catch (error) {
    console.error("Error creating cardholder on WasabiCard API:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
server.on('error', (err) => {
  console.error('Server error:', err);
});