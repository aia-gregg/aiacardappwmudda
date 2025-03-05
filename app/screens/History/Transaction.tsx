import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';

// ---------- Helper Functions ----------

const getRandomAmount = (): string => {
  const num = Math.random() * (50000 - 500) + 500;
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const merchantNames = [
  "Burj Al Arab",
  "Atlantis The Palm",
  "Mall of Emirates",
  "Dubai Mall",
  "Jumeirah Beach",
  "City Walk",
  "Dubai Fountain",
  "La Mer",
  "Dubai Marina",
  "Alserkal Ave",
  "Dubai Opera",
  "Dubai Frame",
  "Madinat Jumeirah",
  "Mercato Mall",
  "Festival City",
  "Global Village",
  "Meydan City",
  "City Centre",
  "Wafi Mall",
  "Dragon Mart",
  "Deira Centre",
  "JBR The Walk",
  "Gold Souk"
];

const getRandomMerchant = (): string => {
  return merchantNames[Math.floor(Math.random() * merchantNames.length)];
};

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

const getRandomStatus = (): string => {
  return "Complete";
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
      return "#808080";
    case 'processing':
      return "#FFD700";
    case 'complete':
      return COLORS.success;
    case 'failed':
      return "#FF0000";
    default:
      return COLORS.text;
  }
};

// Generate transaction data based on card type
const generateTransactionData = (cardName: string): any[] => {
  let count = 60; // Default for "Elite Card"
  if (cardName === 'Standard Card') count = 40;
  else if (cardName === 'Premium Card') count = 80;

  const data = [];
  for (let i = 0; i < count; i++) {
    const ts = getRandomTimestamp();
    data.push({
      merchant: getRandomMerchant(),
      transactionTime: formatTimestamp(ts),
      timestamp: ts,
      amount: getRandomAmount(),
      status: getRandomStatus(),
    });
  }
  data.sort((a, b) => b.timestamp - a.timestamp);
  return overrideStatuses(data);
};

// ---------- Filtering Function ----------

type FilterOption = { key: string; title: string };

const filterTransactions = (data: any[], filter: FilterOption): any[] => {
  // Simulated current date for filtering purposes
  const currentDate = new Date("2025-02-25");
  switch (filter.key) {
    case 'all':
      return data;
    case 'today':
      return data.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate.toDateString() === currentDate.toDateString();
      });
    case 'thisWeek': {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return data.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      });
    }
    case 'thisMonth': {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      return data.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate.getMonth() === month && itemDate.getFullYear() === year;
      });
    }
    case 'last3Months': {
      const startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 3);
      return data.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= startDate && itemDate < currentDate;
      });
    }
    case 'last6Months': {
      const startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 6);
      return data.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= startDate && itemDate < currentDate;
      });
    }
    default:
      return data;
  }
};

// ---------- Component Props ----------
type TransactionProps = {
  card: { name: string; balance: string };
  filter?: FilterOption;
};

const Transaction = ({ card, filter }: TransactionProps) => {
  const { colors } : { colors: any } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  // Generate transaction data based on selected card name
  const [transactionData, setTransactionData] = useState<any[]>(generateTransactionData(card.name));
  const pageSize = 15;
  const [currentPage, setCurrentPage] = useState(1);

  // Update data if card prop changes
  useEffect(() => {
    setTransactionData(generateTransactionData(card.name));
    setCurrentPage(1); // reset page to first when card changes
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [card.name]);

  // Apply filtering if a filter is provided
  const filteredData = filter ? filterTransactions(transactionData, filter) : transactionData;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const currentItems = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
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
                backgroundColor: COLORS.danger,
                marginRight: 12,
              }}
            >
              <Image
                source={IMAGES.withdraw2}
                style={{
                  height: 18,
                  width: 18,
                  tintColor: COLORS.white,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[FONTS.font, FONTS.fontSemiBold, { color: colors.title, marginBottom: 4, top: -1 }]}>
                {data.merchant}
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
            style={styles.paginationButton} 
            disabled={currentPage === 1} 
            onPress={handlePrev}
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
            style={styles.paginationButton} 
            disabled={currentPage === totalPages} 
            onPress={handleNext}
          >
            <Text style={[FONTS.font, { color: currentPage === totalPages ? COLORS.grey : colors.title }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  paginationButton: {
    width: 60,
    margin: 5,
    alignItems: 'center',
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

export default Transaction;