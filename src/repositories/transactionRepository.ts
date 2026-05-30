import type {
  CreateTransactionInput,
  Transaction,
  TransactionSummary,
} from '@/src/types/transaction';

export interface ITransactionRepository {
  list(): Promise<Transaction[]>;
  create(input: CreateTransactionInput): Promise<Transaction>;
  delete(id: string): Promise<void>;
  getSummary(): Promise<TransactionSummary>;
}

export function computeSummary(transactions: Transaction[]): TransactionSummary {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    balance: totalIncome - totalExpense,
    totalIncome,
    totalExpense,
  };
}
