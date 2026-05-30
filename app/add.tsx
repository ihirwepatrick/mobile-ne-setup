import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { CategoryPicker } from '@/src/components/CategoryPicker';
import { useTransactions } from '@/src/context/TransactionContext';
import { createTransactionSchema } from '@/src/lib/validation';
import { DEFAULT_CATEGORIES, type TransactionType } from '@/src/types/transaction';
import { colors } from '@/src/theme/colors';

export default function AddTransactionScreen() {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);

  const categories = useMemo(
    () => (type === 'income' ? DEFAULT_CATEGORIES.income : DEFAULT_CATEGORIES.expense),
    [type]
  );

  const handleTypeChange = (next: TransactionType) => {
    setType(next);
    setCategory('');
  };

  const handleSave = async () => {
    const parsed = createTransactionSchema.safeParse({
      type,
      amount,
      category,
      note: note.trim() || undefined,
      date: new Date(date).toISOString(),
    });

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'Invalid input';
      Alert.alert('Validation', message);
      return;
    }

    setSaving(true);
    try {
      await addTransaction({
        type: parsed.data.type,
        amount: Number(parsed.data.amount),
        category: parsed.data.category,
        note: parsed.data.note,
        date: parsed.data.date,
      });
      router.back();
    } catch {
      Alert.alert('Error', 'Could not save the transaction. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.typeRow}>
          <Pressable
            style={[styles.typeButton, type === 'expense' && styles.typeButtonActiveExpense]}
            onPress={() => handleTypeChange('expense')}>
            <Text
              style={[
                styles.typeButtonText,
                type === 'expense' && styles.typeButtonTextActive,
              ]}>
              Expense
            </Text>
          </Pressable>
          <Pressable
            style={[styles.typeButton, type === 'income' && styles.typeButtonActiveIncome]}
            onPress={() => handleTypeChange('income')}>
            <Text
              style={[
                styles.typeButtonText,
                type === 'income' && styles.typeButtonTextActive,
              ]}>
              Income
            </Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="0"
          keyboardType="decimal-pad"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>Category</Text>
        <CategoryPicker
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />

        <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="2026-05-30"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>Note (optional)</Text>
        <TextInput
          style={[styles.input, styles.noteInput]}
          value={note}
          onChangeText={setNote}
          placeholder="What was this for?"
          multiline
          placeholderTextColor={colors.textMuted}
        />

        <Pressable
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={() => void handleSave()}
          disabled={saving}>
          <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save transaction'}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeButtonActiveExpense: {
    backgroundColor: colors.expenseBg,
    borderColor: colors.expense,
  },
  typeButtonActiveIncome: {
    backgroundColor: colors.incomeBg,
    borderColor: colors.income,
  },
  typeButtonText: {
    fontWeight: '600',
    color: colors.textMuted,
  },
  typeButtonTextActive: {
    color: colors.text,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  noteInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 28,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
