import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { backendUrl } from '../../config/conect.back';
import { User } from '../../modules/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private backendUrl = `${backendUrl}usuarios/`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<{ token: string; dataUser: User }>(`${this.backendUrl}login`, { username, password })
      .pipe(
        tap(response => {
          this.setToken(response.token);
          if (response.dataUser) {
           
            if (response.dataUser.id !== undefined) {
              this.setUserId(response.dataUser.id);
            }
           
            if (response.dataUser.rolId !== undefined) {
              this.setRole(response.dataUser.rolId);
            }
          }
        }),
        map(response => response.dataUser)
      );
  }
  

  logout(): Observable<void> {
    return this.http.post<void>(`${this.backendUrl}logout`, {}).pipe(
      tap(() => {
        this.cookieService.delete('token');
        this.cookieService.delete('rolId');
        this.cookieService.delete('userId');

        // Opcionalmente, limpia cualquier otra información almacenada del usuario
      })
    );
  }

  setToken(token: string) {
    let expires = new Date();
    expires.setHours(expires.getHours() + 1); // Configura la expiración del token
    this.cookieService.set('token', token, { expires, secure: true, sameSite: 'Lax' });
  }

  getToken(): string | null {
    return this.cookieService.get('token');
  }

  setRole(rolId: number) {
    this.cookieService.set('rolId', rolId.toString(), { // Asegura el correcto almacenamiento del rolId
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Establece la expiración a 24 horas
      secure: true,
      sameSite: 'Lax'
    });
  }

  getRolId(): number | null {
    const rolId = this.cookieService.get('rolId');
    return rolId ? parseInt(rolId, 10) : null; // Devuelve null si 'rolId' no está definido
  }

  setUserId(userId: number) {
    let expires = new Date();
    expires.setDate(expires.getDate() + 1); // Configura la expiración a 24 horas
    this.cookieService.set('userId', userId.toString(), {
      expires,
      secure: true,
      sameSite: 'Lax'
    });
  }

  // Método para obtener el ID del usuario desde las cookies
  getUserId(): number | null {
    const userId = this.cookieService.get('userId');
    return userId ? parseInt(userId, 10) : null;
  }
}


