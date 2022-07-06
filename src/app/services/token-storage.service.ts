import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return this.getToken() !== null;
  }

  public getUsername(): string {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const value = JSON.parse(payloadDecoded);
    const username = value.sub;

    return username;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const value = JSON.parse(payloadDecoded);
    const roles = value.roles;
    if (roles.includes('ROLE_ADMIN')) {
      return true;
    }
    return false;
  }

  public logOut(): void {
    window.localStorage.clear();
  }
}
