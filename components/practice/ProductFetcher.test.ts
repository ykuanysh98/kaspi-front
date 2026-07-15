import { vi, describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import axios from "axios";
import ProductFetcher from "./ProductFetcher.vue";

// 1. axios кітапханасын моктау (жалған ету)
vi.mock("axios");

// 2. vue-router-дің useRoute хугын моктау (мысалы, белсенді id '123' деп қайтаратын етеміз)
vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: { id: "123" }
  })
}));

describe("ProductFetcher", () => {
  it("shows loader and then product data", async () => {
    // 3. axios.get сұранысына жалған жауап дайындаймыз
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: { id: 123, title: "Mocked Phone", price: 500 }
    });

    const wrapper = mount(ProductFetcher);

    // Әуелі Жүктелуде... сөзі көрінуі тиіс
    expect(wrapper.text()).toContain("Жүктелуде...");

    // Асинхронды API сұранысы мен Vue өмірлік циклінің (mounted) аяқталуын күтеміз:
    await new Promise((resolve) => setTimeout(resolve, 0));
    await wrapper.vm.$nextTick();

    // Жүктелу аяқталған соң өнімнің атауы көрінуі тиіс
    expect(wrapper.text()).toContain("Mocked Phone");
    expect(wrapper.text()).not.toContain("Жүктелуде...");
  });
});