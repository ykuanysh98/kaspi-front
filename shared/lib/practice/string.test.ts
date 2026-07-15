import { describe, it, expect } from "vitest";
import { truncateText, validateEmail } from "./string";

describe("truncateText", () => {
  it("Мәтін ұзындығы көрсетілгеннен ұзын болса, қысқартады", () => {
    const text = "Hello, world!";
    const length = 5;
    const result = truncateText(text, length);
    expect(result).toBe("Hello...");
  });

  it("Email дұрыс болса true қайтарады", () => {
    const email = "exam@gmail.com";
    const result = validateEmail(email);
    expect(result).toBe(true);
  });

  it("Email дұрыс болмаса false қайтарады", () => {
    const email = "exam@gmailcom";
    const result = validateEmail(email);
    expect(result).toBe(false);
  });
});
