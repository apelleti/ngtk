import { Injectable } from '@angular/core';
import { CycleAService } from './cycle-a.service';

@Injectable({ providedIn: 'root' })
export class CycleBService {
  constructor(private a: CycleAService) {}

  getName(): string {
    return 'B';
  }
}
