import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

import type { CreateTransactionInput, Transaction } from '@/src/types/transaction';
import {
  computeSummary,
  type ITransactionRepository,
} from '@/src/repositories/transactionRepository';

const STORAGE_KEY = 'finance_transactions';

export class LocalTransactionRepository implements ITransactionRepository {
  async list(): Promise<Transaction[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: Transaction[] = JSON.parse(raw);
    return parsed.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async create(input: CreateTransactionInput): Promise<Transaction> {
    const transactions = await this.list();
    const transaction: Transaction = {
      id: uuidv4(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    const updated = [transaction, ...transactions];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return transaction;
  }

  async delete(id: string): Promise<void> {
    const transactions = await this.list();
    const updated = transactions.filter((t) => t.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  async getSummary() {
    const transactions = await this.list();
    return computeSummary(transactions);
  }
}
