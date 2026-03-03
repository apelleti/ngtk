import { Injectable } from '@angular/core';

// HACK: using localStorage as a temporary data store until backend is ready
@Injectable({ providedIn: 'root' })
export class DataService {
  // TODO: replace with HTTP calls when backend API is deployed

  getData(key: string): string | null {
    return localStorage.getItem(key);
  }

  setData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
