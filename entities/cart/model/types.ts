export interface CartPartnerPivot {
  price?: number;
  quantity?: number;
}

export interface CartProductPartner {
  id: number;
  pivot: CartPartnerPivot;
}

export interface CartProduct {
  id: number;
  partners?: CartProductPartner[];
  price?: number;
}

export interface CartItem {
  id?: number;
  product_id: number;
  partner_id?: number;
  quantity: number;
  price?: number;
  product?: {
    partners: CartProductPartner[];
  };
}

export interface PartnerLike {
  id: number;
  pivot?: CartPartnerPivot;
  price?: number;
}
