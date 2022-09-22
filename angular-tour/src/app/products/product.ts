/* Defines the product entity */
export interface Product {
  id: number | null;
  productName: string;
  productCode: string;
  description: string;
  starRating: number;
}

export interface Asset {
  id: number;
  name: string;
  code: string;
}

export interface Order {
  id: number;
  create_date: Date;
}
