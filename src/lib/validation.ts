import { z } from 'zod';

export const createTransactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
      message: 'Enter a valid positive amount',
    }),
  category: z.string().min(1, 'Select a category'),
  note: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
});

export type CreateTransactionForm = z.infer<typeof createTransactionSchema>;
