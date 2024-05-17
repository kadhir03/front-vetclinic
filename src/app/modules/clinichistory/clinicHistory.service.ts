import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendUrl } from '../../config/conect.back';
import { ClinicHistory } from '../clinichistory/clinicHistory.model'; 

@Injectable({
  providedIn: 'root'
})
export class ClinicHistoryService {
  private backendUrl = `${backendUrl}clinic-histories/`; 

  constructor(private http: HttpClient) { }

  // Obtener todos los historiales clínicos
  getAllClinicHistories(): Observable<ClinicHistory[]> {
    return this.http.get<ClinicHistory[]>(this.backendUrl);
  }

  // Obtener un historial clínico por ID
  getClinicHistoryById(id: number): Observable<ClinicHistory> {
    return this.http.get<ClinicHistory>(`${this.backendUrl}${id}`);
  }

  // Crear un nuevo historial clínico
  createClinicHistory(clinicHistory: ClinicHistory): Observable<ClinicHistory> {
    return this.http.post<ClinicHistory>(this.backendUrl, clinicHistory);
  }

  // Actualizar un historial clínico
  updateClinicHistory(id: number, clinicHistory: ClinicHistory): Observable<ClinicHistory> {
    return this.http.patch<ClinicHistory>(`${this.backendUrl}${id}`, clinicHistory);
  }

  // Eliminar un historial clínico
  deleteClinicHistory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}${id}`);
  }
}
