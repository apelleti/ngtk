import { Injectable } from '@angular/core';
import { CycleBService } from './cycle-b.service';

@Injectable({ providedIn: 'root' })
export class CycleAService {
  constructor(private b: CycleBService) {}

  getValue(): string {
    return 'A:' + this.b.getName();
  }
}
