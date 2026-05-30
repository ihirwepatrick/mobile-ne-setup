import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { colors } from '@/src/theme/colors';

interface CategoryPickerProps {
  categories: readonly string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryPicker({ categories, selected, onSelect }: CategoryPickerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {categories.map((category) => {
        const isActive = category === selected;
        return (
          <Pressable
            key={category}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onSelect(category)}>
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{category}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.chip,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: colors.chipActive,
  },
  chipText: {
    color: colors.chipText,
    fontWeight: '500',
  },
  chipTextActive: {
    color: colors.chipTextActive,
  },
});
