//auth/role.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRoleIds = route.data['roles'] as Array<number>;
    const userRoleId = parseInt(this.cookieService.get('rolId'), 10);

    if (expectedRoleIds.includes(userRoleId)) {
      return true;
    }

    return this.router.createUrlTree(['/login']); // Redirige a una página de "Acceso Denegado"
  }
}

