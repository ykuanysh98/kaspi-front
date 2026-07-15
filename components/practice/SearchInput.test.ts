import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import SearchInput from "./SearchInput.vue";

describe("SearchInput", () => {
  it("debounce таймері 300мс жұмыс істей ме?", () => {
    vi.useFakeTimers(); // useFakeTimers - уақытты жалған етуді бастайды

    const wrapper = mount(SearchInput);

    wrapper.find("input").setValue("hello");

    expect(wrapper.emitted("search")).toBeUndefined(); // 300мс өтпей тұрып, 'search' оқиғасы жіберілмеу керек, toBeUndefined - undefined екенін тексереді

    vi.advanceTimersByTime(300); // 300мс өткен соң, 'search' оқиғасы жіберілу керек, advanceTimersByTime - уақытты алға жылжытады

    expect(wrapper.emitted("search")).toEqual([["hello"]]); // 'search' оқиғасы жіберілді, toEqual - теңдікті тексереді

    vi.useRealTimers(); // уақытты қалпына келтіру
  });
});