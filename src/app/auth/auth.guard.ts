//auth/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Intentar obtener el token y el rolId del usuario
    const token = this.cookieService.get('token');
    const userRoleId = parseInt(this.cookieService.get('rolId'), 10);

  
    if (!token) {
      // No autenticado, redirigir al login
      return this.router.createUrlTree(['/login']);
    }

    // Lógica específica de redirección basada en el rol
    switch (userRoleId) {
      case 1: // SAdmin: puede acceder a cualquier ruta
      return true;
      case 2: // Admin: puede acceder a cualquier ruta
        return true;
      case 3: // Usuario estándar: limitado solo a /work
        if (state.url === '/work' || state.url === '/') {
          return true;
        } else {
          // Intenta acceder a una ruta no permitida, redirige a /work
          return this.router.createUrlTree(['/work']);
        }
      default:
        // Por defecto, o para cualquier otro rol, redirigir a /login o una página de error específica
        return this.router.createUrlTree(['/login']);
    }
  }
}
