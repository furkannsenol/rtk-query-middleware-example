export interface IProduct {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  stock: number;
  description: string;
}

export interface ICategory {
  id: number;
  name: string;
}
