import { Component } from '@angular/core';

// TODO: add pagination and filtering for large product catalogs
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'electronics' },
    { id: 2, name: 'Running Shoes', price: 129.99, category: 'sports' },
    { id: 3, name: 'Coffee Maker', price: 49.99, category: 'home' },
    { id: 4, name: 'Backpack', price: 59.99, category: 'accessories' },
  ];

  // FIXME: sorting does not persist across page navigation
  sortBy = 'name';

  sortProducts(field: string) {
    this.sortBy = field;
  }
}
