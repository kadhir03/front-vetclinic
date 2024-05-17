import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { AlertService } from '../../alerts/alert.service';
import { Client } from '../client.model';

@Component({
  selector: 'app-crud-client',
  templateUrl: './crud-client.component.html',
  styleUrl: './crud-client.component.css'
})
export class CrudClientComponent {

  clients: Client[] = [];
  originalClientsList: Client[] = [];
  selectedClient: Client = this.getEmptyClient();
  isCreateClientFormVisible: boolean = false;
  searchQuery: string = '';

  constructor(private clientService: ClientService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  getEmptyClient(): Client {
    return { names: '', document: '', phone: '', address: '', age: 0 } as Client;
  }

  showCreateClientForm(): void {
    this.isCreateClientFormVisible = true;
    this.selectedClient = this.getEmptyClient();
  }

  hideCreateClientForm(): void {
    this.isCreateClientFormVisible = false;
    this.selectedClient = this.getEmptyClient();
  }

  selectClient(client: Client): void {
    this.selectedClient = client;
    this.isCreateClientFormVisible = true;
  }

  filterClients(): void {
    this.clients = this.searchQuery ? this.originalClientsList.filter(client =>
      client.names.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (client.id && client.id.toString().includes(this.searchQuery.toLowerCase())) ||
      client.document.toLowerCase().includes(this.searchQuery.toLowerCase())
    ) : [...this.originalClientsList];
  }
  

  getAllClients(): void {
    this.clientService.getAllClients().subscribe(clients => {
      this.originalClientsList = clients;
      this.clients = [...clients];
    }, error => console.error("Error al obtener los clientes:", error));
  }

  createClient() {
    this.alertService.showCreateAlert().then(result => {
      if (!result.isConfirmed) {
        return;
      }
      this.clientService.createClient(this.selectedClient as Client).subscribe({
        next: (newClient) => {
          this.originalClientsList.push(newClient);
          this.filterClients();
          this.hideCreateClientForm();
          this.alertService.showSuccess("El cliente ha sido creado con éxito.");
        },
        error: () => {
          this.alertService.showError("No se pudo crear el cliente. Por favor, intente de nuevo.");
        }
      });
    });
  }

  updateClient(): void {
    if (!this.selectedClient.id) {
      this.alertService.showError("No se ha seleccionado ningún cliente para actualizar o falta el ID.");
      return;
    }
    const clientId = this.selectedClient.id;

    this.alertService.showSaveAlert(this.selectedClient.names).then(result => {
      if (result.isConfirmed) {
        this.clientService.updateClient(clientId, this.selectedClient).subscribe(() => {
          this.alertService.showSuccess("El cliente ha sido actualizado con éxito.");
        }, () => {
          this.alertService.showError("Error al actualizar el cliente. Por favor, intente de nuevo.");
        });
      }
    });
  }

  deleteClient(id: number | undefined): void {
    if (id === undefined) {
      console.error("El ID del cliente es undefined.");
      return;
    }
    const client = this.originalClientsList.find(e => e.id === id);
    if (client) {
      this.alertService.showDeleteAlert(client.names).then(result => {
        if (result.isConfirmed) {
          this.clientService.deleteClient(id).subscribe(() => {
            this.originalClientsList = this.originalClientsList.filter(e => e.id !== id);
            this.filterClients();
            this.alertService.showSuccess("Cliente eliminado con éxito.");
          }, () => {
            this.alertService.showError("Error al eliminar el cliente. Por favor, intente de nuevo.");
          });
        }
      });
    }
  }
}