import { formatMoney as libraryFormatMoney } from "ku-ui-kit";

export function formatMoney(amount: number | string): string {
  return libraryFormatMoney(amount);
}
