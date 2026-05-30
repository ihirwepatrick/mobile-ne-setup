import type {
  CreateTransactionInput,
  Transaction,
  TransactionSummary,
} from '@/src/types/transaction';
import type { ITransactionRepository } from '@/src/repositories/transactionRepository';

/**
 * Placeholder for future Spring Boot API integration.
 * Set EXPO_PUBLIC_API_URL and implement JWT-backed CRUD when the backend is ready.
 */
export class ApiTransactionRepository implements ITransactionRepository {
  constructor(private readonly baseUrl: string) {}

  private notImplemented(method: string): never {
    throw new Error(
      `ApiTransactionRepository.${method} is not implemented yet. Base URL: ${this.baseUrl}`
    );
  }

  async list(): Promise<Transaction[]> {
    this.notImplemented('list');
  }

  async create(_input: CreateTransactionInput): Promise<Transaction> {
    this.notImplemented('create');
  }

  async delete(_id: string): Promise<void> {
    this.notImplemented('delete');
  }

  async getSummary(): Promise<TransactionSummary> {
    this.notImplemented('getSummary');
  }
}
