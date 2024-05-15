import { Component,OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service'; 
import { AlertService } from '../../../services/alert.service';
import { Role } from '../../../models/role.model';

@Component({
  selector: 'app-crud-rol',
  templateUrl: './crud-rol.component.html',
  styleUrl: './crud-rol.component.css'
})
export class CrudRolComponent implements OnInit {
  roles: Role[] = []; 
  originalRolesList: Role[] = [];
  selectedRole: Role = this.getEmptyRole();
  isCreateRoleFormVisible: boolean = false; 
  searchQuery: string = ''; 

  constructor(private roleService: RoleService, private alertService: AlertService) { }

  ngOnInit():void {
    this.getAllRoles();
  }

  getEmptyRole(): Role {
    return { name: '', status: false } as Role;
  }

  showCreateRoleForm(): void {
    this.isCreateRoleFormVisible = true;
    this.selectedRole = this.getEmptyRole();
  }

  hideCreateRoleForm(): void {
    this.isCreateRoleFormVisible = false;
    this.selectedRole = this.getEmptyRole();
  }


  selectRole(role: Role): void {
    this.selectedRole = role;
    this.isCreateRoleFormVisible = true;
  }

  filterRoles(): void {
    this.roles = this.searchQuery ? this.originalRolesList.filter(role =>
      role.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    ) : [...this.originalRolesList];
  }

  getAllRoles(): void {
    this.roleService.getAllRoles().subscribe(roles => {
      this.originalRolesList = roles;
      this.roles = [...roles];
    }, error => console.error("Error al obtener los roles:", error));
  }

  createRole() {
    
    this.alertService.showCreateAlert().then(result => {
      if (!result.isConfirmed) {
        return; 
      }
      this.roleService.createRole(this.selectedRole as Role).subscribe({
        next: (newRole) => {
          this.originalRolesList.push(newRole);
          this.filterRoles(); 
          this.hideCreateRoleForm(); 
          this.alertService.showSuccess("El rol ha sido creado con éxito.");
        },
        error: () => {
          this.alertService.showError("No se pudo crear el rol. Por favor, intente de nuevo.");
        }
      });
    });
  }


  updateRole(): void {
    if (!this.selectedRole.id) {
      this.alertService.showError("No se ha seleccionado ningún rol para actualizar o falta el ID.");
      return;
    }
    const roleId = this.selectedRole.id;

    this.alertService.showSaveAlert(this.selectedRole.name).then(result => {
      if (result.isConfirmed) {
        this.roleService.updateRole(roleId, this.selectedRole).subscribe(() => {
          this.alertService.showSuccess("El rol ha sido actualizado con éxito.");
        }, () => {
          this.alertService.showError("Error al actualizar el rol. Por favor, intente de nuevo.");
        });
      }
    });
  }

  deleteRole(id: number | undefined): void {
    if (id === undefined) {
      console.error("El ID del rol es undefined.");
      return;
    }
    const role = this.originalRolesList.find(e => e.id === id);
    if (role) {
      this.alertService.showDeleteAlert(role.name).then(result => {
        if (result.isConfirmed) {
          this.roleService.deleteRole(id).subscribe(() => {
            this.originalRolesList = this.originalRolesList.filter(e => e.id !== id);
            this.filterRoles();
            this.alertService.showSuccess("Rol eliminado con éxito.");
          }, () => {
            this.alertService.showError("Error al eliminar el rol. Por favor, intente de nuevo.");
          });
        }
      });
    }
  }
}
