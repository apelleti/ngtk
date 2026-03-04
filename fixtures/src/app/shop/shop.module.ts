import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [ProductListComponent, CheckoutComponent],
  imports: [CommonModule, ShopRoutingModule],
})
export class ShopModule {}
