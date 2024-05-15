import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendUrl } from '../config/conect.back';
import { Client } from '../models/client.model'; 

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private backendUrl = `${backendUrl}clients/`; 

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.backendUrl);
  }

  // Obtener un cliente por ID
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.backendUrl}${id}`);
  }

  // Obtener un cliente por nombre
  getClientByName(name: string): Observable<Client> {
    return this.http.get<Client>(`${this.backendUrl}name/${name}`);
  }

  // Obtener un cliente por documento
  getClientByDocument(document: string): Observable<Client> {
    return this.http.get<Client>(`${this.backendUrl}document/${document}`);
  }

  // Crear un nuevo cliente
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.backendUrl, client);
  }

  // Actualizar un cliente
  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.patch<Client>(`${this.backendUrl}${id}`, client);
  }

  // Eliminar un cliente
  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}${id}`);
  }
}
