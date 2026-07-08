export interface Category {
  id: number | string;
  name: string;
  children?: Category[];
}
