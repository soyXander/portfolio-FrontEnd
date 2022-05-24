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
    const roles = this.tokenStorageServices.getAuthorities();
    this.rol = 'user';
    roles.forEach(role => {
      if (role === 'ROLE_ADMIN') {
        this.rol = 'admin';
      }
    });
    if (!this.tokenStorageServices.getToken() || expectedRol.indexOf(this.rol) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
