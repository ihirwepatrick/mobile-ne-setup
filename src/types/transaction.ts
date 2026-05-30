export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  note?: string;
  date: string;
  createdAt: string;
}

export interface TransactionSummary {
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

export interface CreateTransactionInput {
  type: TransactionType;
  amount: number;
  category: string;
  note?: string;
  date: string;
}

export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'] as const;
export const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Bills', 'Shopping', 'Health', 'Other'] as const;

export const DEFAULT_CATEGORIES = {
  income: INCOME_CATEGORIES,
  expense: EXPENSE_CATEGORIES,
} as const;
