import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Función para mostrar una alerta de confirmación al crear un elemento
  showCreateAlert() {
    Swal.fire({
      title: 'Crear Elemento',
      text: '¿Está seguro de que desea crear un nuevo elemento?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745', // Verde para el botón de confirmar
      cancelButtonColor: '#dc3545', // Rojo para el botón de cancelar
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para crear el elemento
        Swal.fire(
          'Creado!',
          'El elemento ha sido creado correctamente.',
          'success'
        );
      }
    });
  }
  


  // Función para mostrar una alerta de éxito al eliminar un elemento
  showDeleteAlert(itemName: string) {
    Swal.fire({
      title: 'Eliminar Elemento',
      text: `¿Está seguro de que desea eliminar ${itemName}? Esta acción no se puede deshacer.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545', 
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          `${itemName} ha sido eliminado correctamente.`,
          'success'
        );
      }
    });
  }



  // Función para mostrar una alerta de confirmación al guardar cambios en un elemento
  showSaveAlert(itemName: string) {
    Swal.fire({
      title: 'Guardar Cambios',
      text: `¿Está seguro de que desea guardar los cambios realizados en ${itemName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745', // Verde para el botón de confirmar
      cancelButtonColor: '#dc3545', // Rojo para el botón de cancelar
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Guardado!',
          `${itemName} se ha actualizado correctamente.`,
          'success'
        );
      }
    });
}

}
  