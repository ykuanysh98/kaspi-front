import { describe, it, expect } from "vitest";
import { formatMoney } from "./money";

describe("formatMoney utility", () => {
  it("should return a string", () => {
    const result = formatMoney(1000);
    expect(typeof result).toBe("string");
  });

  it("should handle string inputs as numbers if possible", () => {
    const result = formatMoney("5000");
    expect(typeof result).toBe("string");
  });
});
