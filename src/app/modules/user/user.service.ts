import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendUrl } from '../../config/conect.back';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  private backendUrl = `${backendUrl}users/`;

  constructor(private http: HttpClient) { }

    createUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.backendUrl}`, user);
    }

     // Actualizar un usuario
     updateUser(id: number, user: User): Observable<User> {
      return this.http.patch<User>(`${this.backendUrl}${id}`, user);
    }
  
    // Eliminar un usuario
    deleteUser(id: number): Observable<any> {
      return this.http.delete<any>(`${this.backendUrl}${id}`);
    }
  
    // Obtener todos los usuarios
    getAllUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.backendUrl}`);
    }
  
    // Obtener un usuario por ID
    getUserById(id: number): Observable<User> {
      return this.http.get<User>(`${this.backendUrl}${id}`);
    }
  
    // Buscar usuario por rol
    getUsersByRole(rol: string): Observable<User[]> {
      return this.http.get<User[]>(`${this.backendUrl}rol/${rol}`);
    }
  
    // Buscar usuario por username
    getUserByUsername(username: string): Observable<User> {
      return this.http.get<User>(`${this.backendUrl}username/${username}`);
    }
  
    // Buscar usuario por email
    getUserByEmail(email: string): Observable<User> {
      return this.http.get<User>(`${this.backendUrl}email/${email}`);
    }
  }
  