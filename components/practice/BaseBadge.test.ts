import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseBadge from "./BaseBadge.vue";

describe("BaseBadge", () => {
  it("type='success' болғанда, тегтің астында 'bg-green-100' және 'text-green-800' кластары бар ма?", () => {
    const wrapper = mount(BaseBadge, {
      props: {
        type: "success",
      },
    });

    expect(wrapper.classes()).toContain("bg-green-100");
    expect(wrapper.classes()).toContain("text-green-800");
  });

  it("type='warning' болғанда, тегтің астында 'bg-yellow-100' және 'text-yellow-800' кластары бар ма?", () => {
    const wrapper = mount(BaseBadge, {
      props: {
        type: "warning",
      },
    });

    expect(wrapper.classes()).toContain("bg-yellow-100");
    expect(wrapper.classes()).toContain("text-yellow-800");
  });

  it("type='danger' болғанда, тегтің астында 'bg-red-100' және 'text-red-800' кластары бар ма?", () => {
    const wrapper = mount(BaseBadge, {
      props: {
        type: "danger",
      },
    });

    expect(wrapper.classes()).toContain("bg-red-100");
    expect(wrapper.classes()).toContain("text-red-800");
  });
});
