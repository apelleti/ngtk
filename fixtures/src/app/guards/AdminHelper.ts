import { Injectable } from '@angular/core';

// Naming violation: this file doesn't follow Angular naming convention
// It should be admin-helper.guard.ts or admin-helper.service.ts
@Injectable({ providedIn: 'root' })
export class AdminHelper {
  canAccess(role: string): boolean {
    return role === 'admin';
  }
}
