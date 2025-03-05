import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { FONTS, COLORS } from '../../constants/theme';

export type CardOption = {
  name: string;
  balance: string;
};

type CardSelectionSheetProps = {
  sheetRef: React.RefObject<BottomSheet>;
  snapPoints: string[];
  cardOptions: CardOption[];
  onSelect: (option: CardOption) => void;
};

const CardSelectionSheet: React.FC<CardSelectionSheetProps> = ({
  sheetRef,
  snapPoints,
  cardOptions,
  onSelect,
}) => {
  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
    >
      <ScrollView contentContainerStyle={styles.sheetContent}>
        {cardOptions.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={() => {
              onSelect(card);
              sheetRef.current?.close();
            }}
          >
            <Text style={[FONTS.font, { color: COLORS.text }]}>
              {card.name} - {card.balance}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetContent: {
    padding: 20,
  },
  optionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark3 || '#ccc',
  },
});

export default CardSelectionSheet;