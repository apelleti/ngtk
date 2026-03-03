import { Injectable } from '@angular/core';

// TODO: implement proper JWT token refresh logic
@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;

  login(username: string, password: string): boolean {
    // FIXME: this should call an actual API
    this.token = 'fake-token';
    return true;
  }

  logout(): void {
    this.token = null;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  getToken(): string | null {
    return this.token;
  }
}
