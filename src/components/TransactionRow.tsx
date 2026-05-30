import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatCurrency } from '@/src/lib/currency';
import type { Transaction } from '@/src/types/transaction';
import { colors } from '@/src/theme/colors';

interface TransactionRowProps {
  transaction: Transaction;
  onDelete?: (id: string) => void;
}

export function TransactionRow({ transaction, onDelete }: TransactionRowProps) {
  const isIncome = transaction.type === 'income';
  const amountPrefix = isIncome ? '+' : '-';

  return (
    <View style={styles.row}>
      <View style={[styles.icon, isIncome ? styles.incomeIcon : styles.expenseIcon]}>
        <Text style={styles.iconText}>{transaction.category.charAt(0)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.category}>{transaction.category}</Text>
        {transaction.note ? (
          <Text style={styles.note} numberOfLines={1}>
            {transaction.note}
          </Text>
        ) : null}
        <Text style={styles.date}>{formatDisplayDate(transaction.date)}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.amount, isIncome ? styles.incomeAmount : styles.expenseAmount]}>
          {amountPrefix}
          {formatCurrency(transaction.amount).replace(/^-/, '')}
        </Text>
        {onDelete ? (
          <Pressable onPress={() => onDelete(transaction.id)} hitSlop={8}>
            <Text style={styles.delete}>Delete</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

function formatDisplayDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-RW', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  incomeIcon: {
    backgroundColor: colors.incomeBg,
  },
  expenseIcon: {
    backgroundColor: colors.expenseBg,
  },
  iconText: {
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  note: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
  },
  incomeAmount: {
    color: colors.income,
  },
  expenseAmount: {
    color: colors.expense,
  },
  delete: {
    marginTop: 6,
    fontSize: 12,
    color: colors.danger,
  },
});
