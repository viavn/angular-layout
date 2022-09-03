import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser!: User | null;
  redirectUrl!: string;

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, _password: string): void {
    // Code here would log into a back end service
    // and return user information
    // This is just hard-coded here.
    this.currentUser = {
      id: 2,
      userName,
      isAdmin: false
    };
  }

  logout(): void {
    this.currentUser = null;
  }
}
