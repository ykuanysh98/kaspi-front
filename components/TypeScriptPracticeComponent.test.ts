import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TypeScriptPracticeComponent from "./TypeScriptPracticeComponent.vue";

describe("TypeScriptPracticeComponent.vue", () => {
  const dummyProduct = {
    id: 42,
    title: "Test Product",
    price: 99.99,
    inStock: true,
  };

  it("renders product title and price correctly", () => {
    const wrapper = mount(TypeScriptPracticeComponent, {
      props: {
        product: dummyProduct,
      },
    });

    expect(wrapper.text()).toContain("Test Product");
    expect(wrapper.text()).toContain("$99.99");
  });

  it("disables cart button if product is out of stock", () => {
    const wrapper = mount(TypeScriptPracticeComponent, {
      props: {
        product: { ...dummyProduct, inStock: false },
      },
    });

    const cartButton = wrapper.find("button"); // first button is "Себетке салу"
    expect(cartButton.attributes("disabled")).toBeDefined();
  });

  it("emits add-to-cart when cart button is clicked", async () => {
    const wrapper = mount(TypeScriptPracticeComponent, {
      props: {
        product: dummyProduct,
      },
    });

    const cartButton = wrapper.find("button");
    await cartButton.trigger("click");

    expect(wrapper.emitted("add-to-cart")).toBeTruthy();
    expect(wrapper.emitted("add-to-cart")?.[0]).toEqual([42, 1]);
  });

  it("emits toggle-favorite when favorite button is clicked", async () => {
    const wrapper = mount(TypeScriptPracticeComponent, {
      props: {
        product: dummyProduct,
      },
    });

    const faveButton = wrapper.findAll("button")[1]; // second button is "Таңдаулы"
    await faveButton?.trigger("click");

    expect(wrapper.emitted("toggle-favorite")).toBeTruthy();
    expect(wrapper.emitted("toggle-favorite")?.[0]).toEqual([42]);
  });
});
