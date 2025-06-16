import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor() {
    this.isLoggedIn = localStorage.getItem('logueado') === 'true';
  }

  login() {
    this.isLoggedIn = true;
    localStorage.setItem('logueado', 'true');
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('logueado');
  }

  estaLogueado(): boolean {
    return this.isLoggedIn;
  }
}
