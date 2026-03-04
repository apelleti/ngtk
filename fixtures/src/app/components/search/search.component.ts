import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private productService = inject(ProductService);
  query = signal('');
  private debounceTimer: any;

  onSearch(value: string) {
    this.query.set(value);
    clearTimeout(this.debounceTimer);
    // HACK: debounce is implemented with setTimeout instead of RxJS debounceTime
    this.debounceTimer = setTimeout(() => {
      this.productService.search(value);
    }, 300);
  }
}
