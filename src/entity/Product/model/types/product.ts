export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  brand: string;
  stock: string;
  rate: string;
  images?: string[];
  discount?: string;
}
