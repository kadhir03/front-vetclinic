import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showCreateAlert(): Promise<any> {
    return Swal.fire({
      title: 'Crear Elemento',
      text: '¿Está seguro de que desea crear un nuevo elemento?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745', // Verde
      cancelButtonColor: '#dc3545', // Rojo
    });
  }

  showDeleteAlert(itemName: string): Promise<any> {
    return Swal.fire({
      title: 'Eliminar Elemento',
      text: `¿Está seguro de que desea eliminar ${itemName}? Esta acción no se puede deshacer.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545', // Rojo
      cancelButtonColor: '#3085d6', // Azul
    });
  }

  showSaveAlert(itemName: string): Promise<any> {
    return Swal.fire({
      title: 'Guardar Cambios',
      text: `¿Está seguro de que desea guardar los cambios en ${itemName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745', // Verde
      cancelButtonColor: '#dc3545', // Rojo
    });
  }

  // Muestra una alerta de éxito y retorna una promesa.
  showSuccess(message: string): Promise<any> {
    return Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  }

  // Muestra una alerta de error y retorna una promesa.
  showError(message: string): Promise<any> {
    return Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      timer: 2000,
      showConfirmButton: false
    });
  }
  
}