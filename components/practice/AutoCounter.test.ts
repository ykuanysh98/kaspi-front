import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import AutoCounter from "./AutoCounter.vue";

describe("AutoCounter", () => {
  it("әр сикунт сайын санауыш 1-ге артады", async () => {
    vi.useFakeTimers();

    const wrapper = mount(AutoCounter);

    expect(wrapper.find("[data-testid='counter-val']").text()).toBe("0");

    vi.advanceTimersByTime(1000);

    await wrapper.vm.$nextTick();

    expect(wrapper.find("[data-testid='counter-val']").text()).toBe("1");

    vi.useRealTimers();
  });

  it("компонент өшкенде таймер тазалана ма?", () => {
    const clearIntervalSpy = vi.spyOn(global, "clearInterval"); // clearInterval функциясын тыңдаймыз, vi.spyOn - функцияны тыңдауға мүмкіндік береді, global - барлық функцияларды қамтиды

    const wrapper = mount(AutoCounter);

    wrapper.unmount();

    expect(clearIntervalSpy).toHaveBeenCalled(); // clearInterval функциясы шақырылды ма? дегенді тексереміз, toHaveBeenCalled - функция шақырылды ма екенін тексеретін функция
  });
});
