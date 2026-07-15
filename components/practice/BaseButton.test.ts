import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "./BaseButton.vue";

describe("BaseButton", () => {
  it("disabled болғанда click оқиғасы жіберілмейді", async () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("loading болғанда кнопка басылмайды", async () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true,
      },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });
});
