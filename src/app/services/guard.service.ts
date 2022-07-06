import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  rol: string;

  constructor(
    private tokenStorageServices: TokenStorageService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    this.rol = this.tokenStorageServices.isAdmin() ? 'admin': 'user';
    if (!this.tokenStorageServices.isLogged() || expectedRol.indexOf(this.rol) < 0) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
