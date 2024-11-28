export interface Article {
  id: string;
  name: string;
  category_id: string;
  price: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export interface Sale {
  id: string;
  total: number;
  payment_received: number;
  change_given: number;
  payment_method: string;
  created_at: string;
  items: SaleItem[];
}

export interface SaleItem {
  id: string;
  sale_id: string;
  article_id: string;
  quantity: number;
  price_at_sale: number;
  created_at: string;
}
