import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendUrl } from '../../config/conect.back';
import { HistoryDetail } from './historyDetail.model'; 

@Injectable({
  providedIn: 'root'
})
export class HistoryDetailService {
  private backendUrl = `${backendUrl}history-details/`; 

  constructor(private http: HttpClient) { }

  // Obtener todos los detalles de historiales
  getAllHistoryDetails(): Observable<HistoryDetail[]> {
    return this.http.get<HistoryDetail[]>(this.backendUrl);
  }

  // Obtener un detalle de historial por ID
  getHistoryDetailById(id: number): Observable<HistoryDetail> {
    return this.http.get<HistoryDetail>(`${this.backendUrl}${id}`);
  }

  // Crear un nuevo detalle de historial
  createHistoryDetail(historyDetail: HistoryDetail): Observable<HistoryDetail> {
    return this.http.post<HistoryDetail>(this.backendUrl, historyDetail);
  }

  // Actualizar un detalle de historial
  updateHistoryDetail(id: number, historyDetail: HistoryDetail): Observable<HistoryDetail> {
    return this.http.patch<HistoryDetail>(`${this.backendUrl}${id}`, historyDetail);
  }

  // Eliminar un detalle de historial
  deleteHistoryDetail(id: number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}${id}`);
  }
}
