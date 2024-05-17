import { Component } from '@angular/core';
import { UserService } from '../../../modules/user/user.service';
import { AlertService } from '../../../modules/alerts/alert.service';
import { User } from '../../../modules/user/user.model';



@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrl: './crud-user.component.css'
})
export class CrudUserComponent {
  users: User[] = [];
  originalUsersList: User[] = []; 
  selectedUser: User = this.getEmptyUser();
  isCreateUserFormVisible: boolean = false; 
  searchQuery: string = ''; 

  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit():void {
    this.getAllUsers();
  }

  getEmptyUser(): User {
    return {    
      username: '',
      email: '',
      password: '', 
      cellPhone: '', 
      age: 0 ,
      birthDate: undefined,
      address: '',
      rolId: 0   } as User;
  }



  showCreateUserForm(): void {
    this.isCreateUserFormVisible = true;
    this.selectedUser = this.getEmptyUser();
  }
  hideCreateUserForm(): void {
    this.isCreateUserFormVisible = false;
    this.selectedUser = this.getEmptyUser();
  }

  selectUser(user: User):void {
    this.selectedUser = user;
    this.isCreateUserFormVisible = true;
  }

  filterUsers() {
    if (!this.searchQuery) {
      this.users = this.originalUsersList;
      return;
    }
    this.users = this.originalUsersList.filter(user =>
      user.username?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.cellPhone?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      String(user.id)?.toLowerCase().includes(this.searchQuery.toLowerCase()) || // Convierte ID a cadena
      String(user.rolId)?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

getAllUsers(): void {
  this.userService.getAllUsers().subscribe(users => {
    this.originalUsersList = users;
    this.users = [...this.originalUsersList];
  }, error => {
    console.error("Error al obtener los usuarios:", error);
  });
  }

  createUser() {
    this.alertService.showCreateAlert().then(result => {
      if (!result.isConfirmed) {
        return; 
      }
      this.userService.createUser(this.selectedUser as User).subscribe({
        next: (newUser) => {
          this.originalUsersList.push(newUser);
          this.filterUsers(); 
          this.hideCreateUserForm(); 
          this.alertService.showSuccess("El usuario ha sido creado con éxito.");
        },
        error: () => {
          this.alertService.showError("No se pudo crear el usuario. Por favor, intente de nuevo.");
        }
      });
    });
  }
  

    updateUser(): void {
      if (!this.selectedUser.id) {
        this.alertService.showError("No se ha seleccionado ningún usuario para actualizar o falta el ID.");
        return;
      }
      const user = this.selectedUser.id; 
    
      this.alertService.showSaveAlert(this.selectedUser.username).then(result => {
        if (result.isConfirmed) {
          this.userService.updateUser(user, this.selectedUser).subscribe(() => {
            this.alertService.showSuccess("El usuario ha sido actualizado con éxito.");
          }, () => {
            this.alertService.showError("Error al actualizar el usuario. Por favor, intente de nuevo.");
          });
        }
      });
    }
    
    deleteUser(id: number | undefined): void {
      if (id === undefined) {
        console.error("El ID del usuario es undefined.");
        return;
      }
      const user = this.originalUsersList.find(e => e.id === id);
      if (user) {
        this.alertService.showDeleteAlert(user.username).then(result => {
          if (result.isConfirmed) {
            this.userService.deleteUser(id).subscribe(() => {
              this.originalUsersList = this.originalUsersList.filter(e => e.id !== id);
              this.filterUsers();
              this.alertService.showSuccess("usuario eliminado con éxito.");
            }, () => {
              this.alertService.showError("Error al eliminar el usuario. Por favor, intente de nuevo.");
            });
          }
        });
      }
    }


  }

