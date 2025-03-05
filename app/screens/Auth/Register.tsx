import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import { FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import SuccessModal from '../../components/Modal/SuccessModal'; // Adjust path if needed
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Feather } from '@expo/vector-icons';
import { API_BASE_URL } from '../../../backend/config';

type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

// Dropdown data arrays
const areaCodeOptions = [
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

const countryOptions = [
{ label: 'Afghanistan (AF)', value: 'AF' },
{ label: 'Albania (AL)', value: 'AL' },
{ label: 'Algeria (DZ)', value: 'DZ' },
{ label: 'Andorra (AD)', value: 'AD' },
{ label: 'Angola (AO)', value: 'AO' },
{ label: 'Antigua and Barbuda (AG)', value: 'AG' },
{ label: 'Argentina (AR)', value: 'AR' },
{ label: 'Armenia (AM)', value: 'AM' },
{ label: 'Australia (AU)', value: 'AU' },
{ label: 'Austria (AT)', value: 'AT' },
{ label: 'Azerbaijan (AZ)', value: 'AZ' },
{ label: 'Bahamas (BS)', value: 'BS' },
{ label: 'Bahrain (BH)', value: 'BH' },
{ label: 'Bangladesh (BD)', value: 'BD' },
{ label: 'Barbados (BB)', value: 'BB' },
{ label: 'Belarus (BY)', value: 'BY' },
{ label: 'Belgium (BE)', value: 'BE' },
{ label: 'Belize (BZ)', value: 'BZ' },
{ label: 'Benin (BJ)', value: 'BJ' },
{ label: 'Bhutan (BT)', value: 'BT' },
{ label: 'Bolivia (BO)', value: 'BO' },
{ label: 'Bosnia and Herzegovina (BA)', value: 'BA' },
{ label: 'Botswana (BW)', value: 'BW' },
{ label: 'Brazil (BR)', value: 'BR' },
{ label: 'Brunei (BN)', value: 'BN' },
{ label: 'Bulgaria (BG)', value: 'BG' },
{ label: 'Burkina Faso (BF)', value: 'BF' },
{ label: 'Burundi (BI)', value: 'BI' },
{ label: "Côte d'Ivoire (CI)", value: 'CI' },
{ label: 'Cabo Verde (CV)', value: 'CV' },
{ label: 'Cambodia (KH)', value: 'KH' },
{ label: 'Cameroon (CM)', value: 'CM' },
{ label: 'Canada (CA)', value: 'CA' },
{ label: 'Central African Republic (CF)', value: 'CF' },
{ label: 'Chad (TD)', value: 'TD' },
{ label: 'Chile (CL)', value: 'CL' },
{ label: 'China (CN)', value: 'CN' },
{ label: 'Colombia (CO)', value: 'CO' },
{ label: 'Comoros (KM)', value: 'KM' },
{ label: 'Congo (CG)', value: 'CG' },
{ label: 'Congo, Democratic Republic (CD)', value: 'CD' },
{ label: 'Costa Rica (CR)', value: 'CR' },
{ label: 'Croatia (HR)', value: 'HR' },
{ label: 'Cuba (CU)', value: 'CU' },
{ label: 'Cyprus (CY)', value: 'CY' },
{ label: 'Czech Republic (CZ)', value: 'CZ' },
{ label: 'Denmark (DK)', value: 'DK' },
{ label: 'Djibouti (DJ)', value: 'DJ' },
{ label: 'Dominica (DM)', value: 'DM' },
{ label: 'Dominican Republic (DO)', value: 'DO' },
{ label: 'Ecuador (EC)', value: 'EC' },
{ label: 'Egypt (EG)', value: 'EG' },
{ label: 'El Salvador (SV)', value: 'SV' },
{ label: 'Equatorial Guinea (GQ)', value: 'GQ' },
{ label: 'Eritrea (ER)', value: 'ER' },
{ label: 'Estonia (EE)', value: 'EE' },
{ label: 'Eswatini (SZ)', value: 'SZ' },
{ label: 'Ethiopia (ET)', value: 'ET' },
{ label: 'Fiji (FJ)', value: 'FJ' },
{ label: 'Finland (FI)', value: 'FI' },
{ label: 'France (FR)', value: 'FR' },
{ label: 'Gabon (GA)', value: 'GA' },
{ label: 'Gambia (GM)', value: 'GM' },
{ label: 'Georgia (GE)', value: 'GE' },
{ label: 'Germany (DE)', value: 'DE' },
{ label: 'Ghana (GH)', value: 'GH' },
{ label: 'Greece (GR)', value: 'GR' },
{ label: 'Grenada (GD)', value: 'GD' },
{ label: 'Guatemala (GT)', value: 'GT' },
{ label: 'Guinea (GN)', value: 'GN' },
{ label: 'Guinea-Bissau (GW)', value: 'GW' },
{ label: 'Guyana (GY)', value: 'GY' },
{ label: 'Haiti (HT)', value: 'HT' },
{ label: 'Honduras (HN)', value: 'HN' },
{ label: 'Hungary (HU)', value: 'HU' },
{ label: 'Iceland (IS)', value: 'IS' },
{ label: 'India (IN)', value: 'IN' },
{ label: 'Indonesia (ID)', value: 'ID' },
{ label: 'Iran (IR)', value: 'IR' },
{ label: 'Iraq (IQ)', value: 'IQ' },
{ label: 'Ireland (IE)', value: 'IE' },
{ label: 'Israel (IL)', value: 'IL' },
{ label: 'Italy (IT)', value: 'IT' },
{ label: 'Jamaica (JM)', value: 'JM' },
{ label: 'Japan (JP)', value: 'JP' },
{ label: 'Jordan (JO)', value: 'JO' },
{ label: 'Kazakhstan (KZ)', value: 'KZ' },
{ label: 'Kenya (KE)', value: 'KE' },
{ label: 'Kiribati (KI)', value: 'KI' },
{ label: 'Kuwait (KW)', value: 'KW' },
{ label: 'Kyrgyzstan (KG)', value: 'KG' },
{ label: 'Laos (LA)', value: 'LA' },
{ label: 'Latvia (LV)', value: 'LV' },
{ label: 'Lebanon (LB)', value: 'LB' },
{ label: 'Lesotho (LS)', value: 'LS' },
{ label: 'Liberia (LR)', value: 'LR' },
{ label: 'Libya (LY)', value: 'LY' },
{ label: 'Liechtenstein (LI)', value: 'LI' },
{ label: 'Lithuania (LT)', value: 'LT' },
{ label: 'Luxembourg (LU)', value: 'LU' },
{ label: 'Madagascar (MG)', value: 'MG' },
{ label: 'Malawi (MW)', value: 'MW' },
{ label: 'Malaysia (MY)', value: 'MY' },
{ label: 'Maldives (MV)', value: 'MV' },
{ label: 'Mali (ML)', value: 'ML' },
{ label: 'Malta (MT)', value: 'MT' },
{ label: 'Marshall Islands (MH)', value: 'MH' },
{ label: 'Mauritania (MR)', value: 'MR' },
{ label: 'Mauritius (MU)', value: 'MU' },
{ label: 'Mexico (MX)', value: 'MX' },
{ label: 'Micronesia (FM)', value: 'FM' },
{ label: 'Moldova (MD)', value: 'MD' },
{ label: 'Monaco (MC)', value: 'MC' },
{ label: 'Mongolia (MN)', value: 'MN' },
{ label: 'Montenegro (ME)', value: 'ME' },
{ label: 'Morocco (MA)', value: 'MA' },
{ label: 'Mozambique (MZ)', value: 'MZ' },
{ label: 'Myanmar (MM)', value: 'MM' },
{ label: 'Namibia (NA)', value: 'NA' },
{ label: 'Nauru (NR)', value: 'NR' },
{ label: 'Nepal (NP)', value: 'NP' },
{ label: 'Netherlands (NL)', value: 'NL' },
{ label: 'New Zealand (NZ)', value: 'NZ' },
{ label: 'Nicaragua (NI)', value: 'NI' },
{ label: 'Niger (NE)', value: 'NE' },
{ label: 'Nigeria (NG)', value: 'NG' },
{ label: 'North Korea (KP)', value: 'KP' },
{ label: 'North Macedonia (MK)', value: 'MK' },
{ label: 'Norway (NO)', value: 'NO' },
{ label: 'Oman (OM)', value: 'OM' },
{ label: 'Pakistan (PK)', value: 'PK' },
{ label: 'Palau (PW)', value: 'PW' },
{ label: 'Palestine (PS)', value: 'PS' },
{ label: 'Panama (PA)', value: 'PA' },
{ label: 'Papua New Guinea (PG)', value: 'PG' },
{ label: 'Paraguay (PY)', value: 'PY' },
{ label: 'Peru (PE)', value: 'PE' },
{ label: 'Philippines (PH)', value: 'PH' },
{ label: 'Poland (PL)', value: 'PL' },
{ label: 'Portugal (PT)', value: 'PT' },
{ label: 'Qatar (QA)', value: 'QA' },
{ label: 'Romania (RO)', value: 'RO' },
{ label: 'Russia (RU)', value: 'RU' },
{ label: 'Rwanda (RW)', value: 'RW' },
{ label: 'Saint Kitts and Nevis (KN)', value: 'KN' },
{ label: 'Saint Lucia (LC)', value: 'LC' },
{ label: 'Saint Vincent and the Grenadines (VC)', value: 'VC' },
{ label: 'Samoa (WS)', value: 'WS' },
{ label: 'San Marino (SM)', value: 'SM' },
{ label: 'Sao Tome and Principe (ST)', value: 'ST' },
{ label: 'Saudi Arabia (SA)', value: 'SA' },
{ label: 'Senegal (SN)', value: 'SN' },
{ label: 'Serbia (RS)', value: 'RS' },
{ label: 'Seychelles (SC)', value: 'SC' },
{ label: 'Sierra Leone (SL)', value: 'SL' },
{ label: 'Singapore (SG)', value: 'SG' },
{ label: 'Slovakia (SK)', value: 'SK' },
{ label: 'Slovenia (SI)', value: 'SI' },
{ label: 'Solomon Islands (SB)', value: 'SB' },
{ label: 'Somalia (SO)', value: 'SO' },
{ label: 'South Africa (ZA)', value: 'ZA' },
{ label: 'South Korea (KR)', value: 'KR' },
{ label: 'South Sudan (SS)', value: 'SS' },
{ label: 'Spain (ES)', value: 'ES' },
{ label: 'Sri Lanka (LK)', value: 'LK' },
{ label: 'Sudan (SD)', value: 'SD' },
{ label: 'Suriname (SR)', value: 'SR' },
{ label: 'Sweden (SE)', value: 'SE' },
{ label: 'Switzerland (CH)', value: 'CH' },
{ label: 'Syria (SY)', value: 'SY' },
{ label: 'Taiwan (TW)', value: 'TW' },
{ label: 'Tajikistan (TJ)', value: 'TJ' },
{ label: 'Tanzania (TZ)', value: 'TZ' },
{ label: 'Thailand (TH)', value: 'TH' },
{ label: 'Timor-Leste (TL)', value: 'TL' },
{ label: 'Togo (TG)', value: 'TG' },
{ label: 'Tonga (TO)', value: 'TO' },
{ label: 'Trinidad and Tobago (TT)', value: 'TT' },
{ label: 'Tunisia (TN)', value: 'TN' },
{ label: 'Turkey (TR)', value: 'TR' },
{ label: 'Turkmenistan (TM)', value: 'TM' },
{ label: 'Tuvalu (TV)', value: 'TV' },
{ label: 'Uganda (UG)', value: 'UG' },
{ label: 'Ukraine (UA)', value: 'UA' },
{ label: 'United Arab Emirates (AE)', value: 'AE' },
{ label: 'United Kingdom (GB)', value: 'GB' },
{ label: 'United States (US)', value: 'US' },
{ label: 'Uruguay (UY)', value: 'UY' },
{ label: 'Uzbekistan (UZ)', value: 'UZ' },
{ label: 'Vanuatu (VU)', value: 'VU' },
{ label: 'Vatican City (VA)', value: 'VA' },
{ label: 'Venezuela (VE)', value: 'VE' },
{ label: 'Vietnam (VN)', value: 'VN' },
{ label: 'Yemen (YE)', value: 'YE' },
{ label: 'Zambia (ZM)', value: 'ZM' },
{ label: 'Zimbabwe (ZW)', value: 'ZW' },
];

const townOptionsByCountry: { [key: string]: { label: string; value: string }[] } = {
  US: [
    { label: 'Alabama (AL)', value: 'US_AL' },
    { label: 'Alaska (AK)', value: 'US_AK' },
    { label: 'Arizona (AZ)', value: 'US_AZ' },
    { label: 'Arkansas (AR)', value: 'US_AR' },
    { label: 'California (CA)', value: 'US_CA' },
    { label: 'Colorado (CO)', value: 'US_CO' },
    { label: 'Connecticut (CT)', value: 'US_CT' },
    { label: 'Delaware (DE)', value: 'US_DE' },
    { label: 'Florida (FL)', value: 'US_FL' },
    { label: 'Georgia (GA)', value: 'US_GA' },
    { label: 'Hawaii (HI)', value: 'US_HI' },
    { label: 'Idaho (ID)', value: 'US_ID' },
    { label: 'Illinois (IL)', value: 'US_IL' },
    { label: 'Indiana (IN)', value: 'US_IN' },
    { label: 'Iowa (IA)', value: 'US_IA' },
    { label: 'Kansas (KS)', value: 'US_KS' },
    { label: 'Kentucky (KY)', value: 'US_KY' },
    { label: 'Louisiana (LA)', value: 'US_LA' },
    { label: 'Maine (ME)', value: 'US_ME' },
    { label: 'Maryland (MD)', value: 'US_MD' },
    { label: 'Massachusetts (MA)', value: 'US_MA' },
    { label: 'Michigan (MI)', value: 'US_MI' },
    { label: 'Minnesota (MN)', value: 'US_MN' },
    { label: 'Mississippi (MS)', value: 'US_MS' },
    { label: 'Missouri (MO)', value: 'US_MO' },
    { label: 'Montana (MT)', value: 'US_MT' },
    { label: 'Nebraska (NE)', value: 'US_NE' },
    { label: 'Nevada (NV)', value: 'US_NV' },
    { label: 'New Hampshire (NH)', value: 'US_NH' },
    { label: 'New Jersey (NJ)', value: 'US_NJ' },
    { label: 'New Mexico (NM)', value: 'US_NM' },
    { label: 'New York (NY)', value: 'US_NY' },
    { label: 'North Carolina (NC)', value: 'US_NC' },
    { label: 'North Dakota (ND)', value: 'US_ND' },
    { label: 'Ohio (OH)', value: 'US_OH' },
    { label: 'Oklahoma (OK)', value: 'US_OK' },
    { label: 'Oregon (OR)', value: 'US_OR' },
    { label: 'Pennsylvania (PA)', value: 'US_PA' },
    { label: 'Rhode Island (RI)', value: 'US_RI' },
    { label: 'South Carolina (SC)', value: 'US_SC' },
    { label: 'South Dakota (SD)', value: 'US_SD' },
    { label: 'Tennessee (TN)', value: 'US_TN' },
    { label: 'Texas (TX)', value: 'US_TX' },
    { label: 'Utah (UT)', value: 'US_UT' },
    { label: 'Vermont (VT)', value: 'US_VT' },
    { label: 'Virginia (VA)', value: 'US_VA' },
    { label: 'Washington (WA)', value: 'US_WA' },
    { label: 'West Virginia (WV)', value: 'US_WV' },
    { label: 'Wisconsin (WI)', value: 'US_WI' },
    { label: 'Wyoming (WY)', value: 'US_WY' },
  ],
  CA: [
    { label: 'Alberta (AB)', value: 'CA_AB' },
    { label: 'British Columbia (BC)', value: 'CA_BC' },
    { label: 'Manitoba (MB)', value: 'CA_MB' },
    { label: 'New Brunswick (NB)', value: 'CA_NB' },
    { label: 'Newfoundland and Labrador (NL)', value: 'CA_NL' },
    { label: 'Northwest Territories (NW)', value: 'CA_NW' },
    { label: 'Nova Scotia (NS)', value: 'CA_NS' },
    { label: 'Nunavut (NU)', value: 'CA_NU' },
    { label: 'Ontario (ON)', value: 'CA_ON' },
    { label: 'Prince Edward Island (PE)', value: 'CA_PE' },
    { label: 'Quebec (QC)', value: 'CA_QC' },
    { label: 'Saskatchewan (SK)', value: 'CA_SK' },
    { label: 'Yukon (YT)', value: 'CA_YT' },
  ],
  AU: [
    { label: 'Australian Capital Territory (ACT)', value: 'AU_ACT' },
    { label: 'New South Wales (NSW)', value: 'AU_NSW' },
    { label: 'Northern Territory (NT)', value: 'AU_NT' },
    { label: 'Queensland (QLD)', value: 'AU_QLD' },
    { label: 'South Australia (SA)', value: 'AU_SA' },
    { label: 'Tasmania (TAS)', value: 'AU_TAS' },
    { label: 'Victoria (VIC)', value: 'AU_VIC' },
    { label: 'Western Australia (WA)', value: 'AU_WA' },
  ],
  GB: [
    { label: 'England (ENG)', value: 'GB_ENG' },
    { label: 'Northern Ireland (NIR)', value: 'GB_NIR' },
    { label: 'Scotland (SCT)', value: 'GB_SCT' },
    { label: 'Wales (WAL)', value: 'GB_WAL' },
    { label: 'Bradford', value: 'GB_BRD' },
  ],
  AE: [
    { label: 'Abu Dhabi (ABU)', value: 'AE_ABU' },
    { label: 'Dubai (DXB)', value: 'AE_DXB' },
    { label: 'Sharjah (SHJ)', value: 'AE_SHJ' },
    { label: 'Ajman (AJM)', value: 'AE_AJM' },
    { label: 'Fujairah (FUJ)', value: 'AE_FUJ' },
    { label: 'Ras Al Khaimah (RAK)', value: 'AE_RAK' },
    { label: 'Umm Al Quwain (UAQ)', value: 'AE_UAQ' },
  ],
  // ... add additional countries as needed
};

const dropdownSnapPoints = ['60%'];

const Register = ({ navigation }: RegisterScreenProps) => {
  const { colors }: { colors: any } = useTheme();

  // State for form fields
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [areaCode, setAreaCode] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [town, setTown] = useState<string>(''); // Using town for city selection
  const [postCode, setPostCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [referralId, setReferralId] = useState<string>('');

  // Validation errors & submission state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Bottom sheet for dropdowns
  const bottomSheetRef = useRef<any>(null);
  const snapPoints = useMemo(() => dropdownSnapPoints, []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  );

  // Active dropdown field: "areaCode" | "country" | "town"
  const [activeDropdown, setActiveDropdown] = useState<"areaCode" | "country" | "town" | null>(null);

  // Use the full list for each dropdown (no search bar)
  const optionsToShow = useMemo(() => {
    if (activeDropdown === 'areaCode') {
      return areaCodeOptions;
    } else if (activeDropdown === 'country') {
      return countryOptions;
    } else if (activeDropdown === 'town' && country && townOptionsByCountry[country]) {
      return townOptionsByCountry[country];
    }
    return [];
  }, [activeDropdown, country]);

  const openDropdown = (field: "areaCode" | "country" | "town") => {
    setActiveDropdown(field);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleSelectOption = (value: string) => {
    if (activeDropdown === 'areaCode') {
      setAreaCode(value);
    } else if (activeDropdown === 'country') {
      setCountry(value);
      // Reset town if country changes
      setTown('');
    } else if (activeDropdown === 'town') {
      setTown(value);
    }
    bottomSheetRef.current?.close();
    setActiveDropdown(null);
  };

  // Helper to auto-format DOB as YYYY-MM-DD
  const formatDOB = (input: string): string => {
    const digits = input.replace(/\D/g, '');
    let formatted = '';
    if (digits.length > 0) formatted = digits.substring(0, 4);
    if (digits.length >= 5) formatted += '-' + digits.substring(4, 6);
    if (digits.length >= 7) formatted += '-' + digits.substring(6, 8);
    return formatted;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Enter a valid email address';
    if (!areaCode.trim()) newErrors.areaCode = 'Country Code is required';
    if (!mobile.trim()) newErrors.mobile = 'Phone Number is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!birthday.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(birthday)) newErrors.birthday = 'Enter date in YYYY-MM-DD format';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!town.trim()) newErrors.town = 'Town/City is required';
    if (!postCode.trim()) newErrors.postCode = 'Postal Code is required';
    if (!country.trim()) newErrors.country = 'Country of Residence is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    console.log("🚀 Submitting registration...");
    const userData = {
      firstName,
      lastName,
      email,
      areaCode,
      mobile,
      password,
      birthday,
      address,
      town, // using town for city selection
      postCode,
      country,
      referralId,
    };
    console.log("Submitting userData:", userData);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const jsonResponse = await response.json();
      console.log("📩 Registration Response:", jsonResponse);
      if (jsonResponse.success) {
        console.log("✅ Registration successful. Redirecting to OTP...");
        navigation.navigate('OTPAuthentication', { email, isLogin: false });
      } else {
        console.log("❌ Registration failed:", jsonResponse.message);
        setErrors({ email: jsonResponse.message || "Registration failed." });
      }
    } catch (error) {
      console.error("❌ Error during registration:", error);
      setErrors({ email: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <SafeAreaView style={{ flex: 1, overflow: 'hidden' }}>
        {/* <Image source={IMAGES.pattern2} style={GlobalStyleSheet.colorBg1} />
        <Image source={IMAGES.pattern3} style={GlobalStyleSheet.colorBg2} /> */}
        <Header title="Sign Up" leftIcon="back" />
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}>
          <View style={[GlobalStyleSheet.container, { flex: 1 }]}>
            <View style={{ flex: 1 }}>
              <View style={{ paddingHorizontal: 5, paddingVertical: 5, marginBottom: 30, marginTop: 10 }}>
                <Text style={[GlobalStyleSheet.loginTitle, { color: colors.title, textAlign: 'left' }]}>
                  Let's get you signed up
                </Text>
                <Text style={[GlobalStyleSheet.loginDesc, { color: colors.text, textAlign: 'left', marginTop: -5}]}>
                  You're minutes away from experiencing AIAPay!
                </Text>
              </View>

              {/* 1. First Name */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>First Name *</Text>
                <Input
                  placeholder="Enter your first name"
                  value={firstName}
                  onChangeText={setFirstName}
                  errorMessage={errors.firstName}
                />
              </View>

              {/* 2. Last Name */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Last Name *</Text>
                <Input
                  placeholder="Enter your last name"
                  value={lastName}
                  onChangeText={setLastName}
                  errorMessage={errors.lastName}
                />
              </View>

              {/* 3. Email Address */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Email Address *</Text>
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  errorMessage={errors.email}
                />
              </View>

              {/* 4. Country Code (Area Code Dropdown) */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Country Code *</Text>
                <TouchableOpacity
                  onPress={() => openDropdown("areaCode")}
                  style={[
                    GlobalStyleSheet.input,
                    { backgroundColor: "#121212", borderColor: "#303030", borderWidth: 1, justifyContent: 'center' },
                  ]}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: areaCode ? colors.title : colors.text }}>
                      {areaCode ? areaCode : 'Select country code'}
                    </Text>
                    <Feather name="chevron-down" size={20} color={colors.text} />
                  </View>
                </TouchableOpacity>
                {errors.areaCode && <Text style={{ color: 'red' }}>{errors.areaCode}</Text>}
              </View>

              {/* 5. Phone Number */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Phone Number *</Text>
                <Input
                  placeholder="Enter your phone number"
                  value={mobile}
                  onChangeText={setMobile}
                  keyboardType="phone-pad"
                  errorMessage={errors.mobile}
                />
              </View>

              {/* 6. Password */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Password *</Text>
                <Input
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  type="password"
                  errorMessage={errors.password}
                />
              </View>

              {/* 7. Confirm Password */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Confirm Password *</Text>
                <Input
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  type="password"
                  errorMessage={errors.confirmPassword}
                />
              </View>

              {/* 8. Date of Birth */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Date of Birth *</Text>
                <Input
                  placeholder="YYYY-MM-DD"
                  value={birthday}
                  onChangeText={(text) => setBirthday(formatDOB(text))}
                  keyboardType="number-pad"
                  errorMessage={errors.birthday}
                />
              </View>

              {/* 12. Country of Residence Dropdown */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Country of Residence *</Text>
                <TouchableOpacity
                  onPress={() => openDropdown("country")}
                  style={[
                    GlobalStyleSheet.input,
                    { backgroundColor: "#101010", borderColor: "#303030", borderWidth: 1, justifyContent: 'center' },
                  ]}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: country ? colors.title : colors.text }}>
                      {country ? country : 'Select your country'}
                    </Text>
                    <Feather name="chevron-down" size={20} color={colors.text} />
                  </View>
                </TouchableOpacity>
                {errors.country && <Text style={{ color: 'red' }}>{errors.country}</Text>}
              </View>

              {/* 9. Address */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Address *</Text>
                <Input
                  placeholder="Enter your address"
                  value={address}
                  onChangeText={setAddress}
                  errorMessage={errors.address}
                />
              </View>

              {/* 10. Town/City Dropdown */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Town/City *</Text>
                <TouchableOpacity
                  onPress={() => openDropdown("town")}
                  style={[
                    GlobalStyleSheet.input,
                    { backgroundColor: "#101010", borderColor: "#303030", borderWidth: 1, justifyContent: 'center' },
                  ]}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: town ? colors.title : colors.text }}>
                      {town ? town : 'Select your town/city'}
                    </Text>
                    <Feather name="chevron-down" size={20} color={colors.text} />
                  </View>
                </TouchableOpacity>
                {errors.town && <Text style={{ color: 'red' }}>{errors.town}</Text>}
              </View>

              {/* 11. Postal Code */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Postal Code *</Text>
                <Input
                  placeholder="Enter your postal code"
                  value={postCode}
                  onChangeText={setPostCode}
                  errorMessage={errors.postCode}
                />
              </View>

              {/* 13. Referral ID */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom: 10 }]}>Referral ID</Text>
                <Input
                  placeholder="Enter referral ID (optional)"
                  value={referralId}
                  onChangeText={setReferralId}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Register Button Pinned to Bottom */}
      <View style={{ paddingVertical: 15, backgroundColor: colors.background }}>
        <Button
          title={isSubmitting ? "Registering..." : "Register"}
          onPress={isSubmitting ? undefined : handleRegister}
          style={{ opacity: isSubmitting ? 0.5 : 1 }}
        />
      </View>

      {/* Bottom Sheet Dropdown */}
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        index={-1}
        snapPoints={dropdownSnapPoints}
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
          {optionsToShow.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectOption(option.value)}
              style={[
                GlobalStyleSheet.listItem,
                { backgroundColor: colors.input, borderColor: colors.border },
              ]}
            >
              <Text style={[GlobalStyleSheet.listItemTxt, { color: colors.title }]}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

export default Register;