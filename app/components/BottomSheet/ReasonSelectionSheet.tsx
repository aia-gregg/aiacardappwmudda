import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { FONTS, COLORS } from '../../constants/theme';

export type ReasonOption = {
  label: string;
  value: string;
};

type ReasonSelectionSheetProps = {
  sheetRef: React.RefObject<BottomSheet>;
  snapPoints: string[];
  reasonOptions: ReasonOption[];
  onSelect: (option: string) => void;
};

const ReasonSelectionSheet: React.FC<ReasonSelectionSheetProps> = ({
  sheetRef,
  snapPoints,
  reasonOptions,
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
        {reasonOptions.map((reason, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={() => {
              onSelect(reason.value);
              sheetRef.current?.close();
            }}
          >
            <Text style={[FONTS.font, { color: COLORS.text }]}>{reason.label}</Text>
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

export default ReasonSelectionSheet;