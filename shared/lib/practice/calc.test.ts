import { calculateFinalPrice } from "./calc";
import { describe, expect, it } from "vitest";

describe("calculateFinalPrice", () => {
  it("минус баға жібергенде ошибка қайтарады", () => {
    expect(() => calculateFinalPrice(-100, 10, 10)).toThrow(
      "Price cannot be negative",
    );
  });
});
