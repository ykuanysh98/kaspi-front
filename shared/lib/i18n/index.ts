import { ref } from "vue";

const LOCALE_KEY = "kaspi_locale";

export const useMyI18n = () => {
  // Cache check for localStorage in client-side環境
  const getInitialLocale = (): string => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LOCALE_KEY) || "kk";
    }
    return "kk";
  };

  const locale = ref(getInitialLocale());

  const translations: Record<string, Record<string, string>> = {
    kk: {
      catalog: "Каталогтар",
      products: "Тауарлар",
      favorites: "Таңдаулылар",
      cart: "Себет",
      orders: "Тапсырыстар",
      chat: "Чат",
      profile: "Профиль",
    },
    ru: {
      catalog: "Каталоги",
      products: "Товары",
      favorites: "Избранное",
      cart: "Корзина",
      orders: "Заказы",
      chat: "Чат",
      profile: "Профиль",
    },
  };

  const setLocale = (newLocale: string) => {
    locale.value = newLocale;
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_KEY, newLocale);
    }
  };

  const t = (key: string): string => {
    return translations[locale.value]?.[key] || key;
  };

  return {
    locale,
    setLocale,
    t,
  };
};
