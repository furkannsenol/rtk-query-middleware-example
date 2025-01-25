import { Product } from "../models/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    categoryId: 1,
    stock: 10,
    description: "High-performance laptop",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 800,
    categoryId: 1,
    stock: 15,
    description: "Latest model smartphone",
  },
  {
    id: 3,
    name: "Novel",
    price: 20,
    categoryId: 2,
    stock: 50,
    description: "Best-selling novel",
  },
  {
    id: 4,
    name: "T-Shirt",
    price: 15,
    categoryId: 3,
    stock: 100,
    description: "Comfortable cotton t-shirt",
  },
];
