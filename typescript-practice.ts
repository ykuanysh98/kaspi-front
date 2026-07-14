/**
 * ----------------------------------------------------
 * TAPSIRMA 1: Generics (Ортақ типтер) және Жиымдар
 * ----------------------------------------------------
 */

export function getFirst<T>(arr: T[]): T | undefined {
  // Өз кодыңызды осында жазыңыз:
  return arr[0]
}

// --- ТЕКСЕРУ ТЕСТТЕРІ ---
const testNum = getFirst([100, 200, 300]) // 'number | undefined'
const testStr = getFirst(['TypeScript', 'Vue', 'Nuxt']) // 'string | undefined'

console.log(testNum, testStr)

/**
 * ----------------------------------------------------
 * TAPSIRMA 2: Generics пен keyof (Кілттерді шектеу)
 * ----------------------------------------------------
 */

export function getProperty<O, K extends keyof O>(obj: O, key: K): O[K] {
  // Өз кодыңызды осында жазыңыз:
  return obj[key]
}

// --- ТЕКСЕРУ ТЕСТТЕРІ ---
interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

const user: User = { id: 1, name: 'Asan', role: 'admin' }

const userName = getProperty(user, 'name') // OK: userName типі 'string'
const userRole = getProperty(user, 'role') // OK: userRole типі '"admin" | "user"'

console.log(userName, userRole)

/**
 * ----------------------------------------------------
 * TAPSIRMA 3: Utility Types (Pick және Omit)
 * ----------------------------------------------------
 */

interface DetailedUser {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  passwordHash: string;
}

// Осы типтерді өзгертіңіз:
export type UserPreview = Pick<DetailedUser, 'id' | 'email'>; // Pick - бұл типтің ішінен кейбір өрістерді алады
export type UserWithoutPassword = Omit<DetailedUser, 'passwordHash'>; // Omit - бұл типтің ішінен кейбір өрістерді алып тастайды

// --- ТЕКСЕРУ ТЕСТТЕРІ (Бұл жерге тиіспеңіз) ---
const preview: UserPreview = {
  id: 42,
  email: 'test@kaspi.kz'
}

const cleanUser: UserWithoutPassword = {
  id: 1,
  username: 'ykuanysh',
  email: 'y@kaspi.kz',
  phoneNumber: '8777...',
  address: 'Almaty'
}

console.log(preview, cleanUser)

/**
 * ----------------------------------------------------
 * TAPSIRMA 5: Discriminated Unions & Type Guards
 * ----------------------------------------------------
 *
 * Тапсырма мақсаты:
 * Ақпарат жүктеудің үш түрлі күйін (API State) тип қауіпсіздігімен өңдеу.
 * Бізде `loading`, `success`, `error` күйлері бар.
 *
 * Талаптар:
 * 1. ApiResponse типін Discriminated Union ретінде анықтаңыз: ол LoadingState, SuccessState немесе ErrorState болуы мүмкін.
 * 2. Әр state-тің өзіндік `status` мәні (discriminator) болуы керек:
 *    - LoadingState: { status: 'loading' }
 *    - SuccessState: { status: 'success', data: string }
 *    - ErrorState: { status: 'error', error: string }
 * 3. `handleResponse` функциясын типтеп, ішінен `status`-қа қарап сәйкестігін тексеріп (Switch немесе If арқылы):
 *    - 'loading' болса -> 'Жүктелуде...'
 *    - 'success' болса -> 'Мәлімет: ' + data
 *    - 'error' болса -> 'Қате: ' + error
 *    деп қайтаратындай етіп жазыңыз.
 * 4. `any` типтерін алып тастаңыз.
 */

interface LoadingState {
  status: 'loading';
}

interface SuccessState {
  status: 'success';
  data: string;
}

interface ErrorState {
  status: 'error';
  error: string;
}

// 1. Осы ApiResponse жиынтығын (Union) жазыңыз:
export type ApiResponse = LoadingState | SuccessState | ErrorState;

// 2. Осы функцияны толтырыңыз (any-ларды тиісті типтермен алмастырыңыз):
export function handleResponse(state: ApiResponse): string {
  // Өз кодыңызды осында жазыңыз:
  switch (state.status) {
    case 'loading':
      return 'Жүктелуде...'
    case 'success':
      return `Мәлімет: ${state.data}`
    case 'error':
      return `Қате: ${state.error}`
  }
}

// --- ТЕКСЕРУ ТЕСТТЕРІ ---
const loadState: ApiResponse = { status: 'loading' }
const succState: ApiResponse = {
  status: 'success',
  data: 'Қолданушылар тізімі'
}
const errState: ApiResponse = {
  status: 'error',
  error: 'Сервер жауап бермеді'
}

console.log(handleResponse(loadState)) // Жүктелуде...
console.log(handleResponse(succState)) // Мәлімет: Қолданушылар тізімі
console.log(handleResponse(errState)) // Қате: Сервер жауап бермеді
