import React, { useState, useRef, useEffect } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';

// ----- Dropdown Options -----
const cardOptions = [
  { name: 'Elite Card', balance: '$64,926' },
  { name: 'Standard Card', balance: '$10,000' },
  { name: 'Premium Card', balance: '$25,000' },
];

export type FilterOption = { key: string; title: string };
const filterOptions: FilterOption[] = [
  { key: 'all', title: 'All' },
  { key: 'today', title: 'Today' },
  { key: 'thisWeek', title: 'This Week' },
  { key: 'thisMonth', title: 'This Month' },
  { key: 'last3Months', title: 'Last 3 Months' },
  { key: 'last6Months', title: 'Last 6 Months' },
];

// ----- Helper Functions -----
const getRandomAmount = (): string => {
  const num = Math.random() * (50000 - 500) + 500;
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const coins = ["BTC", "CCO2", "AIAT", "USDT", "USDC", "SOL", "BNB", "ETH"];
const getRandomCurrency = (): string => coins[Math.floor(Math.random() * coins.length)];

const getRandomTimestamp = (): number => {
  const start = new Date(2024, 10, 24).getTime();
  const end = new Date(2025, 1, 28).getTime();
  return Math.floor(start + Math.random() * (end - start));
};

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const generateTopUpData = (cardName: string): any[] => {
  let count = 60; // Default for "Elite Card"
  if (cardName === 'Standard Card') count = 40;
  else if (cardName === 'Premium Card') count = 80;

  const data = [];
  for (let i = 0; i < count; i++) {
    const ts = getRandomTimestamp();
    data.push({
      currency: getRandomCurrency(),
      transactionTime: formatTimestamp(ts),
      timestamp: ts,
      amount: getRandomAmount(),
      status: "Complete", // Default status; will be overridden below
    });
  }
  return data.sort((a, b) => b.timestamp - a.timestamp);
};

const overrideStatuses = (data: any[]): any[] => {
  if (data.length > 0) data[0].status = "Pending";
  if (data.length > 1) data[1].status = "Processing";
  const failedIndices = [5, 15, 30, 45, 55];
  failedIndices.forEach(idx => {
    if (idx < data.length) {
      data[idx].status = "Failed";
    }
  });
  return data;
};

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'pending':
      return "#808080"; // grey
    case 'processing':
      return "#FFD700"; // yellow
    case 'complete':
      return COLORS.success; // green
    case 'failed':
      return "#FF0000"; // red
    default:
      return COLORS.text;
  }
};

const filterTopUpData = (data: any[], filter: FilterOption): any[] => {
  const currentDate = new Date("2025-02-25"); // Simulated current date
  switch(filter.key) {
    case 'all':
      return data;
    case 'today':
      return data.filter(item => new Date(item.timestamp).toDateString() === currentDate.toDateString());
    case 'thisWeek': {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return data.filter(item => {
        const d = new Date(item.timestamp);
        return d >= startOfWeek && d <= endOfWeek;
      });
    }
    case 'thisMonth': {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      return data.filter(item => {
        const d = new Date(item.timestamp);
        return d.getMonth() === month && d.getFullYear() === year;
      });
    }
    case 'last3Months': {
      const startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 3);
      return data.filter(item => {
        const d = new Date(item.timestamp);
        return d >= startDate && d < currentDate;
      });
    }
    case 'last6Months': {
      const startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 6);
      return data.filter(item => {
        const d = new Date(item.timestamp);
        return d >= startDate && d < currentDate;
      });
    }
    default:
      return data;
  }
};

// ----- Component Props -----
type TopupProps = {
  card: { name: string; balance: string };
  filter?: FilterOption;
};

const Topup = ({ card, filter }: TopupProps) => {
  const { colors } : { colors: any } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Use overrideStatuses on generated data
  const [topUpData, setTopUpData] = useState<any[]>(overrideStatuses(generateTopUpData(card.name)));
  const pageSize = 15;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTopUpData(overrideStatuses(generateTopUpData(card.name)));
    setCurrentPage(1);
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 100);
  }, [card.name]);

  const filteredData = filter ? filterTopUpData(topUpData, filter) : topUpData;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const currentItems = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }, 100);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }, 100);
    }
  };

  return (
    <ScrollView ref={scrollViewRef}>
      <View style={GlobalStyleSheet.container}>
        {currentItems.map((data, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.input,
              marginBottom: 8,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: SIZES.radius_sm,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: SIZES.radius_sm,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.success,
                marginRight: 12,
              }}
            >
              <Image
                source={IMAGES.deposit2}
                style={{
                  height: 18,
                  width: 18,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  FONTS.font,
                  FONTS.fontSemiBold,
                  { color: colors.title, marginBottom: 4, top: -1 }
                ]}
              >
                {data.currency}
              </Text>
              <Text style={[FONTS.fontXs, { color: colors.text }]}>{data.transactionTime}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[FONTS.font, FONTS.fontBaseSemiBold, { color: colors.title, marginBottom: 5 }]}>
                ${data.amount}
              </Text>
              <Text style={[FONTS.fontXs, { color: getStatusColor(data.status) }]}>{data.status}</Text>
            </View>
          </View>
        ))}

        {/* Pagination Controls */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            disabled={currentPage === 1}
            onPress={handlePrev}
            style={{ padding: 10, opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            <Text style={[FONTS.font, { color: currentPage === 1 ? COLORS.grey : colors.title }]}>
              Previous
            </Text>
          </TouchableOpacity>
          <View style={styles.paginationTextContainer}>
            <Text style={styles.paginationText}>
              Page {currentPage} of {totalPages}
            </Text>
          </View>
          <TouchableOpacity
            disabled={currentPage === totalPages}
            onPress={handleNext}
            style={{ padding: 10, opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            <Text style={[FONTS.font, { color: currentPage === totalPages ? COLORS.grey : colors.title }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    justifyContent: 'space-between', // Text left, icon right
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
    tintColor: COLORS.white,
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
    width: '100%',
  },
  paginationTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationText: {
    ...FONTS.font,
    color: COLORS.title,
    textAlign: 'center',
  },
});

export default Topup;