import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  get(key: string) {
    return localStorage.getItem('token') as string;
  }
  set(key: string, obj: any) {
    localStorage.setItem(key, obj);
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}