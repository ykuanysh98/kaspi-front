import { describe, it, expect } from "vitest";
import { groupProductsByCategory } from "./array";

describe("groupProductsByCategory", () => {
  it("Өнімдерді категория бойынша топтайды", () => {
    const products = [
      { id: 1, title: "Product 1", category: "Category 1", price: 100 },
      { id: 2, title: "Product 2", category: "Category 2", price: 200 },
      { id: 3, title: "Product 3", category: "Category 1", price: 300 },
    ];

    const result = groupProductsByCategory(products);

    expect(result).toEqual({
      "Category 1": [
        { id: 1, title: "Product 1", category: "Category 1", price: 100 },
        { id: 3, title: "Product 3", category: "Category 1", price: 300 },
      ],
      "Category 2": [
        { id: 2, title: "Product 2", category: "Category 2", price: 200 },
      ],
    });
  });
});
