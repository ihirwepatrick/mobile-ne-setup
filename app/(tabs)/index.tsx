import { Link } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BalanceCard } from '@/src/components/BalanceCard';
import { EmptyState } from '@/src/components/EmptyState';
import { TransactionRow } from '@/src/components/TransactionRow';
import { useTransactions } from '@/src/context/TransactionContext';
import { colors } from '@/src/theme/colors';

const RECENT_LIMIT = 5;

export default function DashboardScreen() {
  const { transactions, summary, loading } = useTransactions();
  const recent = transactions.slice(0, RECENT_LIMIT);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : (
        <>
          <BalanceCard summary={summary} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent transactions</Text>
            <Link href="/add" asChild>
              <Pressable>
                <Text style={styles.addLink}>+ Add</Text>
              </Pressable>
            </Link>
          </View>
          {recent.length === 0 ? (
            <EmptyState
              title="No transactions yet"
              message="Add your first income or expense to start tracking your finances."
            />
          ) : (
            recent.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  loader: {
    marginTop: 48,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  addLink: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 15,
  },
});
