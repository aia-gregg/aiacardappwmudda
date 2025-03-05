const bcryptjs = require('bcryptjs');

async function testHash() {
  const rawPassword = "Password";
  const saltRounds = 10;
  const hash = await bcryptjs.hash(rawPassword, saltRounds);
  console.log("Raw:", rawPassword);
  console.log("Hash:", hash);
}

testHash();
