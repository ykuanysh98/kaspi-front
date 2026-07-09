export interface SelectOption {
  value: string | number;
  label: string;
}

export type OptionLike = SelectOption | string | number;

export type ModelValue = OptionLike[] | string | number | null;
