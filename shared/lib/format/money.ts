export function formatMoney(amount: number | string): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(value)) return "0";
  return new Intl.NumberFormat("ru-RU").format(value);
}
