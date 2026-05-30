import { StyleSheet, Text, View } from 'react-native';

import { formatCurrency } from '@/src/lib/currency';
import type { TransactionSummary } from '@/src/types/transaction';
import { colors } from '@/src/theme/colors';

interface BalanceCardProps {
  summary: TransactionSummary;
}

export function BalanceCard({ summary }: BalanceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Current balance</Text>
      <Text style={styles.balance}>{formatCurrency(summary.balance)}</Text>
      <View style={styles.row}>
        <View style={[styles.pill, styles.incomePill]}>
          <Text style={styles.pillLabel}>Income</Text>
          <Text style={[styles.pillValue, styles.incomeText]}>
            {formatCurrency(summary.totalIncome)}
          </Text>
        </View>
        <View style={[styles.pill, styles.expensePill]}>
          <Text style={styles.pillLabel}>Expenses</Text>
          <Text style={[styles.pillValue, styles.expenseText]}>
            {formatCurrency(summary.totalExpense)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    marginBottom: 4,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  pill: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
  },
  incomePill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  expensePill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  pillLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    marginBottom: 4,
  },
  pillValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  incomeText: {
    color: colors.incomeBg,
  },
  expenseText: {
    color: colors.expenseBg,
  },
});
