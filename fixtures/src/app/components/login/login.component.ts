import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

// TODO: add form validation and error messages for login fields
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    // FIXME: password is sent in plain text — use HTTPS + hashing
    if (!this.authService.login(this.username, this.password)) {
      this.errorMessage = 'Invalid credentials';
    }
  }
}
