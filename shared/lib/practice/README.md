# Тестілеуді Практикалық Үйрену Нұсқаулығы (Levels 1-5)

Осы жобада тестілеуді кезең-кезеңімен практикада үйренуге арналған 5 деңгейлі тапсырмалар дайындалды.

## Қалай іске қосамыз?

1. Кез келген тест файлын іске қосу:
   ```bash
   yarn test
   ```
2. Тек бір рет орындап, нәтижені көру:
   ```bash
   yarn test:run
   ```

---

## 🚀 Тапсырмалар тізімі

### Level 1: Pure Functions (Қарапайым логиканы тексеру)

Оқшауланған және кітапханаларға тәуелсіз функцияларды тексеруді меңгеру.

- **Task 1.1:** [calc.ts](file:///home/ykuanysh/test/kaspi-front/shared/lib/practice/calc.ts)  
  _Тапсырма:_ `shared/lib/practice/calc.test.ts` жасаңыз. Баға мен жеңілдік есептеуді, теріс мәндер берілгенде қате (Error) лақтыруды тексеріңіз.
- **Task 1.2:** [string.ts](file:///home/ykuanysh/test/kaspi-front/shared/lib/practice/string.ts)  
  _Тапсырма:_ `shared/lib/practice/string.test.ts` жасаңыз. Мәтін қысқарту (`truncateText`) мен Email тексеруді (`validateEmail`) тексеріңіз.
- **Task 1.3:** [array.ts](file:///home/ykuanysh/test/kaspi-front/shared/lib/practice/array.ts)  
  _Тапсырма:_ `shared/lib/practice/array.test.ts` жасаңыз. Өнімдерді категориялары бойынша топтауды тексеріңіз.

### Level 2: Basic Components (Базалық компоненттерді тексеру)

Vue компонентінің дұрыс рендерингін, Props және Emit оқиғаларын тексеруді меңгеру.

- **Task 2.1:** [BaseButton.vue](file:///home/ykuanysh/test/kaspi-front/components/practice/BaseButton.vue)  
  _Тапсырма:_ `components/practice/BaseButton.test.ts` жасаңыз. `disabled`, `loading` күйлерін, басылғанда өтетін `click` оқиғасын тексеріңіз.
- **Task 2.2:** [BaseBadge.vue](file:///home/ykuanysh/test/kaspi-front/components/practice/BaseBadge.vue)  
  _Тапсырма:_ `components/practice/BaseBadge.test.ts` жасаңыз. `type` мәніне қарай ('success', 'warning', 'danger') оның динамикалық кластары мен стильдерін тексеріңіз.

### Level 3: Intermediate Components with Async & State (Уақыт пен таймерлерді тексеру)

Компоненттегі уақыт аралығын (setInterval, setTimeout) және асинхронды әрекеттерді тексеруді меңгеру.

- **Task 3.1:** [SearchInput.vue](file:///home/ykuanysh/test/kaspi-front/components/practice/SearchInput.vue)  
  _Тапсырма:_ `components/practice/SearchInput.test.ts` жасаңыз. Пайдаланушы мәтін тергенде 300мс күтетін debounce таймерін `vi.useFakeTimers()` сияқты Vitest құралдарын қолданып тексеріңіз.
- **Task 3.2:** [AutoCounter.vue](file:///home/ykuanysh/test/kaspi-front/components/practice/AutoCounter.vue)  
  _Тапсырма:_ `components/practice/AutoCounter.test.ts` жасаңыз. Жүйелі уақытпен (setInterval) артатын санауышты және компонент жойылғанда (`unmount()`) таймердің тазалануын тексеріңіз.

### Level 4: Store Testing (Pinia дүкенін тексеру)

Жобадағы деректерді басқаратын Pinia store архитекутрасын тексеруді меңгеру.

- **Task 4.1:** [cartStore.ts](file:///home/ykuanysh/test/kaspi-front/shared/lib/practice/cartStore.ts)  
  _Тапсырма:_ `shared/lib/practice/cartStore.test.ts` жасаңыз. `setActivePinia` арқылы себетке тауар қосу, оларды өшіру және сомаларды дұрыс есептеуді тексеріңіз.

### Level 5: API & Routing (Профессионалды кодын моктау)

Сыртқы сервермен жұмыс істейтін (Axios сұраныстары) және Router құралдарын (useRoute) моктап тексеруді меңгеру.

- **Task 5.1:** [ProductFetcher.vue](file:///home/ykuanysh/test/kaspi-front/components/practice/ProductFetcher.vue)  
  _Тапсырма:_ `components/practice/ProductFetcher.test.ts` жасаңыз. `vi.mock('axios')` және `vi.mock('vue-router')` қолданып, API сұранысының сәтті/сәтсіз жағдайларын және жүктелу (loader) күйін тексеріңіз.
