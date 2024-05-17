import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendUrl } from '../../config/conect.back';
import { Role } from './role.model'; 

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private backendUrl = `${backendUrl}roles/`; 

  constructor(private http: HttpClient) { }

  // Obtener todos los roles
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.backendUrl);
  }

  // Obtener un rol por ID
  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.backendUrl}${id}`);
  }

  // Crear un nuevo rol
  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.backendUrl, role);
  }

  // Actualizar un rol
  updateRole(id: number, role: Role): Observable<Role> {
    return this.http.patch<Role>(`${this.backendUrl}${id}`, role);
  }

  // Eliminar un rol
  deleteRole(id: number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}${id}`);
  }

  // Buscar un rol por nombre
  findRoleByName(name: string): Observable<Role> {
    return this.http.get<Role>(`${this.backendUrl}name/${name}`);
  }
}
