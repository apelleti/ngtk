import { Component } from '@angular/core';

// TODO: integrate with payment gateway (Stripe) for real transactions
// FIXME: checkout does not validate shipping address before submission
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  step = 1;
  shippingAddress = '';
  paymentMethod = 'credit-card';

  nextStep() {
    if (this.step < 3) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  placeOrder() {
    console.log('Order placed!');
  }
}
