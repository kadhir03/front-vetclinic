//pages/dashboard/das.component.ts
import { Component,Type } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { AlertService } from '../../services/alert.service';

import { CrudUserComponent } from '../../components/crud/crud-user/crud-user.component';
import { CrudRolComponent } from '../../components/crud/crud-rol/crud-rol.component';

import { CrudPetComponent } from '../../components/crud/crud-pet/crud-pet.component';
import { CrudClientComponent } from '../../components/crud/crud-client/crud-client.component';

import { CrudClinicHistoryComponent } from '../../components/crud/crud-clinic-history/crud-clinic-history.component';
import { CrudHistoryDetailComponent } from '../../components/crud/crud-history-detail/crud-history-detail.component';




@Component({
  selector: 'app-das',
  templateUrl: './das.component.html',
  styleUrls: ['./das.component.css'] 
})
export class DasComponent {
  sidebarVisible = true;
  componenteActual: Type<any> | null = null;

  // Asegúrate de inyectar tanto LoginService como Router aquí
  constructor(
    private loginService: LoginService, 
    private alertService: AlertService, 
    private router: Router) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  mostrarComponente(componente: string) {
    const componentes: { [key: string]: Type<any> } = {

      'roles': CrudRolComponent,
      'usuarios': CrudUserComponent,
      'mascotas': CrudPetComponent,
      'clientes': CrudClientComponent,
      'historias-clinicas': CrudClinicHistoryComponent,
      'historias-detalladas': CrudHistoryDetailComponent,
    };
    this.componenteActual = componentes[componente] || null;
  }

salir() {
    this.loginService.logout().subscribe({
      next: (response) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        this.alertService.showSuccess('Se ha cerrado la sesión con éxito.'); // Usa la función showSuccess
      },
      error: (error) => {
        console.error('Error al cerrar sesión', error);
        this.alertService.showError('No se pudo cerrar la sesión correctamente.'); // Usa la función showError
      }
    });
}



}