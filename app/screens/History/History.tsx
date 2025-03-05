import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTheme, CompositeScreenProps } from '@react-navigation/native';
import { TabView, TabBar } from 'react-native-tab-view';
import { StackScreenProps } from '@react-navigation/stack';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import Transaction from '../History/Transaction';
import TopUp from '../History/Topup';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';

type HistoryScreenProps = CompositeScreenProps<
  StackScreenProps<BottomTabParamList, 'History'>,
  StackScreenProps<RootStackParamList>
>;

// Dummy card options for dropdown
const cardOptions = [
  { name: 'Elite Card', balance: '$64,926' },
  { name: 'Standard Card', balance: '$10,000' },
  { name: 'Premium Card', balance: '$25,000' },
];

// Filter options for dropdown
const filterOptions = [
  { key: 'all', title: 'All' },
  { key: 'today', title: 'Today' },
  { key: 'thisWeek', title: 'This Week' },
  { key: 'thisMonth', title: 'This Month' },
  { key: 'last3Months', title: 'Last 3 Months' },
  { key: 'last6Months', title: 'Last 6 Months' },
];

const History = ({ navigation }: HistoryScreenProps) => {
  const {colors} : {colors : any} = useTheme();

  // Dropdown states
  const [selectedCard, setSelectedCard] = useState(cardOptions[0]);
  const [cardDropdownVisible, setCardDropdownVisible] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState<boolean>(false);

  // TabView states
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Transaction', title: 'Transactions' },
    { key: 'Topup', title: 'Topups' },
  ]);

  // ScrollView ref to scroll to top on tab change
  const scrollViewRef = useRef<ScrollView>(null);

  // For now, cast child components to any to pass extra props.
  const TransactionWithProps = Transaction as any;
  const TopupWithProps = TopUp as any;

  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case 'Transaction':
        return (
          <TransactionWithProps
            card={selectedCard}
            filter={selectedFilter}
            scrollViewRef={scrollViewRef}
          />
        );
      case 'Topup':
        return (
          <TopupWithProps
            card={selectedCard}
            filter={selectedFilter}
            scrollViewRef={scrollViewRef}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: colors.card,
        height: 50,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 0,
        shadowOpacity: 0,
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 8,
        padding: 0,
        borderRadius: 8,
      }}
      tabStyle={{
        flex: 1,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      inactiveColor={colors.text}
      activeColor={'#000'}
      indicatorStyle={{
        height: 50,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      pressColor={'transparent'}
      labelStyle={{
        ...FONTS.font,
        ...FONTS.fontSemiBold,
        lineHeight: 16,
        textTransform: 'capitalize',
        textAlign: 'center',
      }}
    />
  );

  const renderLazyPlaceholder = () => (
    <ActivityIndicator color={COLORS.primary} />
  );

  // Toggle functions ensuring only one dropdown is open at a time
  const toggleFilterDropdown = () => {
    if (cardDropdownVisible) setCardDropdownVisible(false);
    setFilterDropdownVisible(prev => !prev);
  };

  const toggleCardDropdown = () => {
    if (filterDropdownVisible) setFilterDropdownVisible(false);
    setCardDropdownVisible(prev => !prev);
  };

  return (
    <SafeAreaView style={[GlobalStyleSheet.container, { flex: 1, backgroundColor: colors.background, padding: 0 }]}>
      <Header
        title="History"
        leftIcon="back"
        leftAction={() => navigation.navigate('Home')}
      />

      {/* Row for Dropdowns */}
      <View style={styles.dropdownRow}>
        {/* Filter Dropdown (left) */}
        <View style={styles.filterDropdownWrapper}>
          <TouchableOpacity style={styles.dropdownBtn} onPress={toggleFilterDropdown}>
            <Text style={[FONTS.fontSm, { color: colors.title }]}>{selectedFilter.title}</Text>
            <Image source={IMAGES.dropdown} style={styles.dropdownIcon} />
          </TouchableOpacity>
          {filterDropdownVisible && (
            <TouchableWithoutFeedback onPress={() => setFilterDropdownVisible(false)}>
              <View style={styles.modalOverlay}>
                <TouchableOpacity style={styles.dropdownModal} activeOpacity={1}>
                  {filterOptions.map((filter, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.cardOption,
                        // filter.key === selectedFilter.key && { backgroundColor: COLORS.primary },
                      ]}
                      onPress={() => {
                        setSelectedFilter(filter);
                        setFilterDropdownVisible(false);
                      }}
                    >
                      <Text style={[FONTS.fontSm, { color: colors.title }]}>{filter.title}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>

        {/* Card Dropdown (right) */}
        <View style={styles.cardDropdownWrapper}>
          <TouchableOpacity style={styles.dropdownBtn} onPress={toggleCardDropdown}>
            <Text style={[FONTS.fontSm, { color: colors.title }]}>{selectedCard.name}</Text>
            <Image source={IMAGES.dropdown} style={styles.dropdownIcon} />
          </TouchableOpacity>
          {cardDropdownVisible && (
            <TouchableWithoutFeedback onPress={() => setCardDropdownVisible(false)}>
              <View style={styles.modalOverlay}>
                <TouchableOpacity style={styles.dropdownModal} activeOpacity={1}>
                  {cardOptions.map((card, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.cardOption,
                        // card.name === selectedCard.name && { backgroundColor: "#505050" },
                      ]}
                      onPress={() => {
                        setSelectedCard(card);
                        setCardDropdownVisible(false);
                      }}
                    >
                      <Text style={[FONTS.fontSm, { color: colors.title }]}>{card.name}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>

      {/* Tab View */}
      <TabView
        lazy
        renderLazyPlaceholder={renderLazyPlaceholder}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(newIndex) => {
          // Scroll to top when tab changes
          scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
          setIndex(newIndex);
        }}
        initialLayout={{ width: SIZES.width, height: 0 }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  filterDropdownWrapper: {
    flex: 1,
    marginRight: 5,
  },
  cardDropdownWrapper: {
    flex: 1,
    marginLeft: 5,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures text is left and icon on right
    backgroundColor: "#181818",
    borderColor: "#4a5157",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: '100%',
  },
  dropdownIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginLeft: 20,
    tintColor: COLORS.white,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    position: 'absolute',
    top: 50, // Positioned below the dropdown row
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1500,
  },
  dropdownModal: {
    backgroundColor: "#202020",
    borderRadius: 8,
    padding: 25,
    width: '100%', // Full-width relative to its container
    alignSelf: 'center',
    zIndex: 1600,
  },
  cardOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#202020",
  },
});

export default History;