import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { API_BASE_URL } from '../../../backend/config';

const countryCodes = [
  { label: 'Afghanistan (+93)', value: '+93' },
  { label: 'Albania (+355)', value: '+355' },
  { label: 'Algeria (+213)', value: '+213' },
  { label: 'American Samoa (+1-684)', value: '+1684' },
  { label: 'Andorra (+376)', value: '+376' },
  { label: 'Angola (+244)', value: '+244' },
  { label: 'Anguilla (+1-264)', value: '+1264' },
  { label: 'Antarctica (+672)', value: '+672' },
  { label: 'Antigua and Barbuda (+1-268)', value: '+1268' },
  { label: 'Argentina (+54)', value: '+54' },
  { label: 'Armenia (+374)', value: '+374' },
  { label: 'Aruba (+297)', value: '+297' },
  { label: 'Australia (+61)', value: '+61' },
  { label: 'Austria (+43)', value: '+43' },
  { label: 'Azerbaijan (+994)', value: '+994' },
  { label: 'Bahamas (+1-242)', value: '+1242' },
  { label: 'Bahrain (+973)', value: '+973' },
  { label: 'Bangladesh (+880)', value: '+880' },
  { label: 'Barbados (+1-246)', value: '+1246' },
  { label: 'Belarus (+375)', value: '+375' },
  { label: 'Belgium (+32)', value: '+32' },
  { label: 'Belize (+501)', value: '+501' },
  { label: 'Benin (+229)', value: '+229' },
  { label: 'Bermuda (+1-441)', value: '+1441' },
  { label: 'Bhutan (+975)', value: '+975' },
  { label: 'Bolivia (+591)', value: '+591' },
  { label: 'Bosnia and Herzegovina (+387)', value: '+387' },
  { label: 'Botswana (+267)', value: '+267' },
  { label: 'Brazil (+55)', value: '+55' },
  { label: 'British Indian Ocean Territory (+246)', value: '+246' },
  { label: 'British Virgin Islands (+1-284)', value: '+1284' },
  { label: 'Brunei (+673)', value: '+673' },
  { label: 'Bulgaria (+359)', value: '+359' },
  { label: 'Burkina Faso (+226)', value: '+226' },
  { label: 'Burundi (+257)', value: '+257' },
  { label: 'Cambodia (+855)', value: '+855' },
  { label: 'Cameroon (+237)', value: '+237' },
  { label: 'Canada (+1)', value: '+1' },
  { label: 'Cape Verde (+238)', value: '+238' },
  { label: 'Cayman Islands (+1-345)', value: '+1345' },
  { label: 'Central African Republic (+236)', value: '+236' },
  { label: 'Chad (+235)', value: '+235' },
  { label: 'Chile (+56)', value: '+56' },
  { label: 'China (+86)', value: '+86' },
  { label: 'Christmas Island (+61)', value: '+61' },
  { label: 'Cocos (Keeling) Islands (+61)', value: '+61' },
  { label: 'Colombia (+57)', value: '+57' },
  { label: 'Comoros (+269)', value: '+269' },
  { label: 'Cook Islands (+682)', value: '+682' },
  { label: 'Costa Rica (+506)', value: '+506' },
  { label: "Côte d'Ivoire (+225)", value: '+225' },
  { label: 'Croatia (+385)', value: '+385' },
  { label: 'Cuba (+53)', value: '+53' },
  { label: 'Curaçao (+599)', value: '+599' },
  { label: 'Cyprus (+357)', value: '+357' },
  { label: 'Czech Republic (+420)', value: '+420' },
  { label: 'Democratic Republic of the Congo (+243)', value: '+243' },
  { label: 'Denmark (+45)', value: '+45' },
  { label: 'Djibouti (+253)', value: '+253' },
  { label: 'Dominica (+1-767)', value: '+1767' },
  { label: 'Dominican Republic (+1-809)', value: '+1809' },
  { label: 'Dominican Republic (+1-829)', value: '+1829' },
  { label: 'Dominican Republic (+1-849)', value: '+1849' },
  { label: 'East Timor (+670)', value: '+670' },
  { label: 'Ecuador (+593)', value: '+593' },
  { label: 'Egypt (+20)', value: '+20' },
  { label: 'El Salvador (+503)', value: '+503' },
  { label: 'Equatorial Guinea (+240)', value: '+240' },
  { label: 'Eritrea (+291)', value: '+291' },
  { label: 'Estonia (+372)', value: '+372' },
  { label: 'Eswatini (+268)', value: '+268' },
  { label: 'Ethiopia (+251)', value: '+251' },
  { label: 'Falkland Islands (+500)', value: '+500' },
  { label: 'Faroe Islands (+298)', value: '+298' },
  { label: 'Fiji (+679)', value: '+679' },
  { label: 'Finland (+358)', value: '+358' },
  { label: 'France (+33)', value: '+33' },
  { label: 'French Polynesia (+689)', value: '+689' },
  { label: 'Gabon (+241)', value: '+241' },
  { label: 'Gambia (+220)', value: '+220' },
  { label: 'Georgia (+995)', value: '+995' },
  { label: 'Germany (+49)', value: '+49' },
  { label: 'Ghana (+233)', value: '+233' },
  { label: 'Gibraltar (+350)', value: '+350' },
  { label: 'Greece (+30)', value: '+30' },
  { label: 'Greenland (+299)', value: '+299' },
  { label: 'Grenada (+1-473)', value: '+1473' },
  { label: 'Guam (+1-671)', value: '+1671' },
  { label: 'Guatemala (+502)', value: '+502' },
  { label: 'Guernsey (+44-1481)', value: '+441481' },
  { label: 'Guinea (+224)', value: '+224' },
  { label: 'Guinea-Bissau (+245)', value: '+245' },
  { label: 'Guyana (+592)', value: '+592' },
  { label: 'Haiti (+509)', value: '+509' },
  { label: 'Honduras (+504)', value: '+504' },
  { label: 'Hong Kong (+852)', value: '+852' },
  { label: 'Hungary (+36)', value: '+36' },
  { label: 'Iceland (+354)', value: '+354' },
  { label: 'India (+91)', value: '+91' },
  { label: 'Indonesia (+62)', value: '+62' },
  { label: 'Iran (+98)', value: '+98' },
  { label: 'Iraq (+964)', value: '+964' },
  { label: 'Ireland (+353)', value: '+353' },
  { label: 'Isle of Man (+44-1624)', value: '+441624' },
  { label: 'Israel (+972)', value: '+972' },
  { label: 'Italy (+39)', value: '+39' },
  { label: 'Jamaica (+1-876)', value: '+1876' },
  { label: 'Japan (+81)', value: '+81' },
  { label: 'Jersey (+44-1534)', value: '+441534' },
  { label: 'Jordan (+962)', value: '+962' },
  { label: 'Kazakhstan (+7)', value: '+7' },
  { label: 'Kenya (+254)', value: '+254' },
  { label: 'Kiribati (+686)', value: '+686' },
  { label: 'Kosovo (+383)', value: '+383' },
  { label: 'Kuwait (+965)', value: '+965' },
  { label: 'Kyrgyzstan (+996)', value: '+996' },
  { label: 'Laos (+856)', value: '+856' },
  { label: 'Latvia (+371)', value: '+371' },
  { label: 'Lebanon (+961)', value: '+961' },
  { label: 'Lesotho (+266)', value: '+266' },
  { label: 'Liberia (+231)', value: '+231' },
  { label: 'Libya (+218)', value: '+218' },
  { label: 'Liechtenstein (+423)', value: '+423' },
  { label: 'Lithuania (+370)', value: '+370' },
  { label: 'Luxembourg (+352)', value: '+352' },
  { label: 'Macau (+853)', value: '+853' },
  { label: 'Macedonia (+389)', value: '+389' },
  { label: 'Madagascar (+261)', value: '+261' },
  { label: 'Malawi (+265)', value: '+265' },
  { label: 'Malaysia (+60)', value: '+60' },
  { label: 'Maldives (+960)', value: '+960' },
  { label: 'Mali (+223)', value: '+223' },
  { label: 'Malta (+356)', value: '+356' },
  { label: 'Marshall Islands (+692)', value: '+692' },
  { label: 'Mauritania (+222)', value: '+222' },
  { label: 'Mauritius (+230)', value: '+230' },
  { label: 'Mayotte (+262)', value: '+262' },
  { label: 'Mexico (+52)', value: '+52' },
  { label: 'Micronesia (+691)', value: '+691' },
  { label: 'Moldova (+373)', value: '+373' },
  { label: 'Monaco (+377)', value: '+377' },
  { label: 'Mongolia (+976)', value: '+976' },
  { label: 'Montenegro (+382)', value: '+382' },
  { label: 'Montserrat (+1-664)', value: '+1664' },
  { label: 'Morocco (+212)', value: '+212' },
  { label: 'Mozambique (+258)', value: '+258' },
  { label: 'Myanmar (+95)', value: '+95' },
  { label: 'Namibia (+264)', value: '+264' },
  { label: 'Nauru (+674)', value: '+674' },
  { label: 'Nepal (+977)', value: '+977' },
  { label: 'Netherlands (+31)', value: '+31' },
  { label: 'New Caledonia (+687)', value: '+687' },
  { label: 'New Zealand (+64)', value: '+64' },
  { label: 'Nicaragua (+505)', value: '+505' },
  { label: 'Niger (+227)', value: '+227' },
  { label: 'Nigeria (+234)', value: '+234' },
  { label: 'Niue (+683)', value: '+683' },
  { label: 'Norfolk Island (+672)', value: '+672' },
  { label: 'North Korea (+850)', value: '+850' },
  { label: 'Northern Mariana Islands (+1-670)', value: '+1670' },
  { label: 'Norway (+47)', value: '+47' },
  { label: 'Oman (+968)', value: '+968' },
  { label: 'Pakistan (+92)', value: '+92' },
  { label: 'Palau (+680)', value: '+680' },
  { label: 'Palestine (+970)', value: '+970' },
  { label: 'Panama (+507)', value: '+507' },
  { label: 'Papua New Guinea (+675)', value: '+675' },
  { label: 'Paraguay (+595)', value: '+595' },
  { label: 'Peru (+51)', value: '+51' },
  { label: 'Philippines (+63)', value: '+63' },
  { label: 'Pitcairn (+64)', value: '+64' },
  { label: 'Poland (+48)', value: '+48' },
  { label: 'Portugal (+351)', value: '+351' },
  { label: 'Puerto Rico (+1-787)', value: '+1787' },
  { label: 'Puerto Rico (+1-939)', value: '+1939' },
  { label: 'Qatar (+974)', value: '+974' },
  { label: 'Republic of the Congo (+242)', value: '+242' },
  { label: 'Romania (+40)', value: '+40' },
  { label: 'Russia (+7)', value: '+7' },
  { label: 'Rwanda (+250)', value: '+250' },
  { label: 'Réunion (+262)', value: '+262' },
  { label: 'Saint Barthélemy (+590)', value: '+590' },
  { label: 'Saint Helena (+290)', value: '+290' },
  { label: 'Saint Kitts and Nevis (+1-869)', value: '+1869' },
  { label: 'Saint Lucia (+1-758)', value: '+1758' },
  { label: 'Saint Martin (+590)', value: '+590' },
  { label: 'Saint Pierre and Miquelon (+508)', value: '+508' },
  { label: 'Saint Vincent and the Grenadines (+1-784)', value: '+1784' },
  { label: 'Samoa (+685)', value: '+685' },
  { label: 'San Marino (+378)', value: '+378' },
  { label: 'Sao Tome and Principe (+239)', value: '+239' },
  { label: 'Saudi Arabia (+966)', value: '+966' },
  { label: 'Senegal (+221)', value: '+221' },
  { label: 'Serbia (+381)', value: '+381' },
  { label: 'Seychelles (+248)', value: '+248' },
  { label: 'Sierra Leone (+232)', value: '+232' },
  { label: 'Singapore (+65)', value: '+65' },
  { label: 'Sint Maarten (+1-721)', value: '+1721' },
  { label: 'Slovakia (+421)', value: '+421' },
  { label: 'Slovenia (+386)', value: '+386' },
  { label: 'Solomon Islands (+677)', value: '+677' },
  { label: 'Somalia (+252)', value: '+252' },
  { label: 'South Africa (+27)', value: '+27' },
  { label: 'South Korea (+82)', value: '+82' },
  { label: 'South Sudan (+211)', value: '+211' },
  { label: 'Spain (+34)', value: '+34' },
  { label: 'Sri Lanka (+94)', value: '+94' },
  { label: 'Sudan (+249)', value: '+249' },
  { label: 'Suriname (+597)', value: '+597' },
  { label: 'Swaziland (+268)', value: '+268' },
  { label: 'Sweden (+46)', value: '+46' },
  { label: 'Switzerland (+41)', value: '+41' },
  { label: 'Syria (+963)', value: '+963' },
  { label: 'Taiwan (+886)', value: '+886' },
  { label: 'Tajikistan (+992)', value: '+992' },
  { label: 'Tanzania (+255)', value: '+255' },
  { label: 'Thailand (+66)', value: '+66' },
  { label: 'Togo (+228)', value: '+228' },
  { label: 'Tokelau (+690)', value: '+690' },
  { label: 'Tonga (+676)', value: '+676' },
  { label: 'Trinidad and Tobago (+1-868)', value: '+1868' },
  { label: 'Tunisia (+216)', value: '+216' },
  { label: 'Turkey (+90)', value: '+90' },
  { label: 'Turkmenistan (+993)', value: '+993' },
  { label: 'Turks and Caicos Islands (+1-649)', value: '+1649' },
  { label: 'Tuvalu (+688)', value: '+688' },
  { label: 'Uganda (+256)', value: '+256' },
  { label: 'Ukraine (+380)', value: '+380' },
  { label: 'United Arab Emirates (+971)', value: '+971' },
  { label: 'United Kingdom (+44)', value: '+44' },
  { label: 'United States (+1)', value: '+1' },
  { label: 'Uruguay (+598)', value: '+598' },
  { label: 'Uzbekistan (+998)', value: '+998' },
  { label: 'Vanuatu (+678)', value: '+678' },
  { label: 'Vatican City (+379)', value: '+379' },
  { label: 'Venezuela (+58)', value: '+58' },
  { label: 'Vietnam (+84)', value: '+84' },
  { label: 'Wallis and Futuna (+681)', value: '+681' },
  { label: 'Western Sahara (+212)', value: '+212' },
  { label: 'Yemen (+967)', value: '+967' },
  { label: 'Zambia (+260)', value: '+260' },
  { label: 'Zimbabwe (+263)', value: '+263' },
];

const dropdownMaxItems = 5; // Used to calculate height if needed

const ChangePhoneScreen = ({ navigation }: any) => {
  const {colors} : {colors : any} = useTheme();

  // Field states
  const [currentAreaCode, setCurrentAreaCode] = useState('');
  const [currentMobile, setCurrentMobile] = useState('');
  const [newAreaCode, setNewAreaCode] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [confirmMobile, setConfirmMobile] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // BottomSheet for area code selection
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  );

  // Which field is active: 'current' or 'new'
  const [selectedField, setSelectedField] = useState<'current' | 'new' | null>(null);

  const handleOpenSheet = (field: 'current' | 'new') => {
    setSelectedField(field);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleSelectCountryCode = (code: string) => {
    if (selectedField === 'current') {
      setCurrentAreaCode(code);
    } else if (selectedField === 'new') {
      setNewAreaCode(code);
    }
    bottomSheetRef.current?.close();
    setSelectedField(null);
  };

  const handleSubmit = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    // Basic validation
    if (
      !currentAreaCode ||
      !currentMobile ||
      !newAreaCode ||
      !newMobile ||
      !confirmMobile ||
      newMobile !== confirmMobile
    ) {
      Alert.alert('Error', 'Please ensure all phone fields are filled & match.');
      setIsUpdating(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/change-phone-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentAreaCode,
          currentMobile,
          newAreaCode,
          newMobile,
        }),
      });
      const jsonRes = await response.json();
      if (jsonRes.success) {
        navigation.navigate('OTPAuthentication', {
          isChangeMobile: true,
          areaCode: currentAreaCode,
          mobile: currentMobile,
        });
      } else {
        Alert.alert('Error', jsonRes.message || 'Failed to send phone OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
      console.error('handleSubmit error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <Header title="Change Phone Number" leftIcon="back" />
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 5,
              paddingBottom: 150,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[GlobalStyleSheet.container, { flex: 1 }]}>
              {/* Current Area Code */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginTop: 15, marginBottom: 10 }]}>
                  Current Area Code
                </Text>
                <TouchableOpacity
                  onPress={() => handleOpenSheet('current')}
                  style={[
                    GlobalStyleSheet.input,
                    { backgroundColor: "#121212", borderColor: "#303030", borderWidth: 1, justifyContent: 'center', marginBottom: 10 },
                  ]}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: currentAreaCode ? colors.title : colors.text }}>
                      {currentAreaCode ? currentAreaCode : 'Select country code'}
                    </Text>
                    <Feather name="chevron-down" size={20} color={colors.text} />
                  </View>
                </TouchableOpacity>
              </View>
              {/* Current Phone Number */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
                  Current Phone Number
                </Text>
                <Input
                  placeholder="Current phone"
                  value={currentMobile}
                  onChangeText={setCurrentMobile}
                  keyboardType="phone-pad"
                />
              </View>
              {/* New Area Code */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { marginTop: 0, marginBottom: 10, color: colors.title }]}>
                  New Area Code
                </Text>
                <TouchableOpacity
                  onPress={() => handleOpenSheet('new')}
                  style={[
                    GlobalStyleSheet.input,
                    { backgroundColor: "#101010", borderColor: "#303030", borderWidth: 1, justifyContent: 'center' },
                  ]}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: newAreaCode ? colors.title : colors.text }}>
                      {newAreaCode ? newAreaCode : 'Select country code'}
                    </Text>
                    <Feather name="chevron-down" size={20} color={colors.text} />
                  </View>
                </TouchableOpacity>
              </View>
              {/* New Phone Number */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { marginTop: 10, marginBottom: 10, color: colors.title }]}>
                  New Phone Number
                </Text>
                <Input
                  placeholder="New phone"
                  value={newMobile}
                  onChangeText={setNewMobile}
                  keyboardType="phone-pad"
                />
              </View>
              {/* Confirm Phone Number */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { marginTop: 0, marginBottom: 10, color: colors.title }]}>
                  Confirm Phone Number
                </Text>
                <Input
                  placeholder="Confirm phone"
                  value={confirmMobile}
                  onChangeText={setConfirmMobile}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </ScrollView>
          {/* Pinned Update Button */}
          <View style={{ paddingVertical: 15 }}>
            <Button onPress={handleSubmit} title={isUpdating ? 'Updating...' : 'Update'} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        index={-1}
        snapPoints={snapPoints}
        onChange={useCallback((index: number) => {
          console.log('BottomSheet index changed to', index);
        }, [])}
        backgroundStyle={{
          backgroundColor: colors.cardBg,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.border,
          width: 100,
          height: 6,
        }}
      >
        <BottomSheetScrollView contentContainerStyle={[GlobalStyleSheet.container, { padding: 0, paddingBottom: 20 }]}>
          {countryCodes.map((country, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectCountryCode(country.value)}
              style={[
                GlobalStyleSheet.listItem,
                {
                  backgroundColor: colors.input,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[GlobalStyleSheet.listItemTxt, { color: colors.title }]}>{country.label}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ChangePhoneScreen;