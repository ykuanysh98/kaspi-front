/**
 * Тапсырма 1.1: Math Helper
 *
 * Тапсырма: Осы функция сәйкес тесттерді жазыңыз.
 * Тексерілетін жағдайлар:
 * 1. Жеңілдік (discount) дұрыс есептеледі ме? (мысалы 100 бағасына 10% жеңілдік)
 * 2. Салық (tax) жеңілдіктен кейінгі бағаға дұрыс қосыла ма?
 * 3. Баға теріс сан болса, қате (Error) лақтыра ма?
 * 4. Жеңілдік 0-ден кіші немесе 100-ден үлкен болса қате лақтыра ма?
 */
export function calculateFinalPrice(
  price: number, // бағасы
  discountPercent: number, // жеңілдік пайызы
  taxPercent: number, // салық пайызы
): number {
  if (price < 0) {
    throw new Error("Price cannot be negative");
  }
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Discount must be between 0 and 100");
  }
  if (taxPercent < 0) {
    throw new Error("Tax cannot be negative");
  }

  const discountAmount = price * (discountPercent / 100);
  const priceAfterDiscount = price - discountAmount;
  const taxAmount = priceAfterDiscount * (taxPercent / 100);

  return Number((priceAfterDiscount + taxAmount).toFixed(2));
}
