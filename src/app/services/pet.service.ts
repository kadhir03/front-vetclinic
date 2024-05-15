import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendUrl } from '../config/conect.back';
import { Pet } from '../models/pet.model'; 

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private backendUrl = `${backendUrl}pets/`; 

  constructor(private http: HttpClient) { }

  // Obtener todas las mascotas
  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.backendUrl);
  }

  // Obtener una mascota por ID
  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.backendUrl}${id}`);
  }

  // Obtener una mascota por nombre
  getPetByName(name: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.backendUrl}name/${name}`);
  }

  // Obtener mascotas por cliente
  getPetsByClient(clientId: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.backendUrl}client/${clientId}`);
  }

  // Crear una nueva mascota
  createPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.backendUrl, pet);
  }

  // Actualizar una mascota
  updatePet(id: number, pet: Pet): Observable<Pet> {
    return this.http.patch<Pet>(`${this.backendUrl}${id}`, pet);
  }

  // Eliminar una mascota
  deletePet(id: number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}${id}`);
  }
}
