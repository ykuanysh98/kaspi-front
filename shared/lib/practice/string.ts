/**
 * Тапсырма 1.2: String Helper
 *
 * Тапсырма: Төмендегі функцияларға толық тесттер жазыңыз.
 * Тексерілетін жағдайлар:
 * 1. truncateText:
 *    - Мәтін ұзындығы лимиттен кіші болса, өзгеріссіз қайтарады ма?
 *    - Мәтін ұзындығы лимиттен үлкен болса, қиып соңына '...' қоса ма?
 *    - Ұзындығы дәл лимитке тең болса қалай әрекет етеді?
 *
 * 2. validateEmail:
 *    - Дұрыс email болса (мысалы test@gmail.com) true қайтара ма?
 *    - Бұрыс email болса (мысалы test@gmail, @gmail.com, test.com) false қайтара ма?
 */

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
