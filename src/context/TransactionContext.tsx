import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { ApiTransactionRepository } from '@/src/repositories/apiTransactionRepository';
import { LocalTransactionRepository } from '@/src/repositories/localTransactionRepository';
import type { ITransactionRepository } from '@/src/repositories/transactionRepository';
import type {
  CreateTransactionInput,
  Transaction,
  TransactionSummary,
} from '@/src/types/transaction';

interface TransactionContextValue {
  transactions: Transaction[];
  summary: TransactionSummary;
  loading: boolean;
  refresh: () => Promise<void>;
  addTransaction: (input: CreateTransactionInput) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
}

const emptySummary: TransactionSummary = {
  balance: 0,
  totalIncome: 0,
  totalExpense: 0,
};

const TransactionContext = createContext<TransactionContextValue | null>(null);

function createRepository(): ITransactionRepository {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (apiUrl) {
    return new ApiTransactionRepository(apiUrl);
  }
  return new LocalTransactionRepository();
}

export function TransactionProvider({ children }: { children: ReactNode }) {
  const repository = useMemo(() => createRepository(), []);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary>(emptySummary);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [list, summaryData] = await Promise.all([
        repository.list(),
        repository.getSummary(),
      ]);
      setTransactions(list);
      setSummary(summaryData);
    } finally {
      setLoading(false);
    }
  }, [repository]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addTransaction = useCallback(
    async (input: CreateTransactionInput) => {
      await repository.create(input);
      await refresh();
    },
    [repository, refresh]
  );

  const removeTransaction = useCallback(
    async (id: string) => {
      await repository.delete(id);
      await refresh();
    },
    [repository, refresh]
  );

  const value = useMemo(
    () => ({
      transactions,
      summary,
      loading,
      refresh,
      addTransaction,
      removeTransaction,
    }),
    [transactions, summary, loading, refresh, addTransaction, removeTransaction]
  );

  return (
    <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionProvider');
  }
  return context;
}
