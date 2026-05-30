export const CURRENCY_CODE = 'RWF';

export function formatCurrency(amount: number): string {
  const formatted = Math.abs(amount).toLocaleString('en-RW', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const prefix = amount < 0 ? '-' : '';
  return `${prefix}${CURRENCY_CODE} ${formatted}`;
}
