export interface Product {
  id: number;
  name: string;
  price: number;
  images?: { path: string }[];
  partners?: { pivot: { quantity: number; price?: number }; id: number }[];
  is_favorite?: boolean;
}

export interface ProductFilters {
  search: string;
  category_id: number | null;
  min_price: number | null;
  max_price: number | null;
  partner_id: number | null;
  favorites_only: boolean;
  sort: string | null;
}

export interface ProductListMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
