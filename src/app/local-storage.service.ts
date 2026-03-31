import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  setItem<T>(key: string, value: T): void {
      const jsonData: string = JSON.stringify(value);
      localStorage.setItem(key, jsonData);
  }

  getItem<T>(key: string): T | null {
      const item: string | null = localStorage.getItem(key);
      return item ? (JSON.parse(item)) : null;
  }

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }
  
  clearAllItem(): void {
     localStorage.clear();
  }
  
}
