import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericStorageService {

  setItem<T>(key: string, value: T) {
    try {
      const  jsonData = JSON.stringify(value);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.error(`Error saving to localStorage (key: ${key}):`, error);
    }
  }

  getItem<T>(key: string): T | null {
     try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item)) : null;
     } catch (error) {
      console.error(`Error reading from localStorage (key: ${key}):`, error);
      return null;
     }
  }

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }
  
  clearAllItem(): void {
     localStorage.clear();
  }
  
}
