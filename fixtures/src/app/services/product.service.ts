import { Injectable } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

// TODO: replace mock data with HTTP calls to the product API
@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'electronics', description: 'Premium sound quality' },
    { id: 2, name: 'Running Shoes', price: 129.99, category: 'sports', description: 'Lightweight and durable' },
    { id: 3, name: 'Coffee Maker', price: 49.99, category: 'home', description: 'Brew your perfect cup' },
    { id: 4, name: 'Backpack', price: 59.99, category: 'accessories', description: 'Spacious and ergonomic' },
  ];

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  // FIXME: search is case-sensitive — should normalize input
  search(query: string): Product[] {
    return this.products.filter(p => p.name.includes(query));
  }
}
