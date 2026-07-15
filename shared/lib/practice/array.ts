/**
 * Тапсырма 1.3: Array Helper
 *
 * Тапсырма: Осы функцияға тест орындаңыз.
 * Тексерілетін жағдайлар:
 * 1. Бос өнімдер массиві берілсе, бос объект `{}` қайтара ма?
 * 2. Өнімдерді категориясы бойынша дұрыс топтай ма?
 * 3. Бірдей категориядағы өнімдерді сол категорияның астына жинай ма?
 */
export interface PracticeProduct {
  id: number;
  title: string;
  category: string;
  price: number;
}

export function groupProductsByCategory(
  products: PracticeProduct[],
): Record<string, PracticeProduct[]> {
  const result: Record<string, PracticeProduct[]> = {};

  for (const product of products) {
    if (!result[product.category]) {
      result[product.category] = [];
    }
    result[product.category]?.push(product);
  }

  return result;
}

/**
 * const products = [
 *   { id: 1, title: "Product 1", category: "Category 1", price: 100 },
 *   { id: 2, title: "Product 2", category: "Category 2", price: 200 },
 *   { id: 3, title: "Product 3", category: "Category 1", price: 300 },
 * ];
 * 
 * groupProductsByCategory(products)
 * 
 * {
 *  "Category 1": [
 *    { id: 1, title: "Product 1", category: "Category 1", price: 100 },
 *    { id: 3, title: "Product 3", category: "Category 1", price: 300 },
 *  ],
 *  "Category 2": [
 *    { id: 2, title: "Product 2", category: "Category 2", price: 200 },
 *  ],
 * }
 */