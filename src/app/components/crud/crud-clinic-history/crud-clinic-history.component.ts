import { Component, OnInit } from '@angular/core';
import { ClinicHistoryService } from '../../../services/clinicHistory.service';
import { AlertService } from '../../../services/alert.service';
import { ClinicHistory } from '../../../models/clinicHistory.model';

@Component({
  selector: 'app-crud-clinic-history',
  templateUrl: './crud-clinic-history.component.html',
  styleUrl: './crud-clinic-history.component.css'
})
export class CrudClinicHistoryComponent {

  clinicHistories: ClinicHistory[] = [];
  originalClinicHistoriesList: ClinicHistory[] = [];
  selectedClinicHistory: ClinicHistory = this.getEmptyClinicHistory();
  isCreateClinicHistoryFormVisible: boolean = false;
  searchQuery: string = '';

  constructor(private clinicHistoryService: ClinicHistoryService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAllClinicHistories();
  }

  getEmptyClinicHistory(): ClinicHistory {
    return { date: new Date(), time: '', petId: 0 } as ClinicHistory;
  }

  showCreateClinicHistoryForm(): void {
    this.isCreateClinicHistoryFormVisible = true;
    this.selectedClinicHistory = this.getEmptyClinicHistory();
  }

  hideCreateClinicHistoryForm(): void {
    this.isCreateClinicHistoryFormVisible = false;
    this.selectedClinicHistory = this.getEmptyClinicHistory();
  }

  selectClinicHistory(clinicHistory: ClinicHistory): void {
    this.selectedClinicHistory = clinicHistory;
    this.isCreateClinicHistoryFormVisible = true;
  }

  filterClinicHistories(): void {
    this.clinicHistories = this.searchQuery ? this.originalClinicHistoriesList.filter(history =>
      history.date.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
    ) : [...this.originalClinicHistoriesList];
  }

  getAllClinicHistories(): void {
    this.clinicHistoryService.getAllClinicHistories().subscribe(histories => {
      this.originalClinicHistoriesList = histories;
      this.clinicHistories = [...histories];
    }, error => console.error("Error al obtener los historiales de clínica:", error));
  }

  createClinicHistory() {
    this.clinicHistoryService.createClinicHistory(this.selectedClinicHistory as ClinicHistory).subscribe({
      next: (newHistory) => {
        this.originalClinicHistoriesList.push(newHistory);
        this.filterClinicHistories();
        this.hideCreateClinicHistoryForm();
        this.alertService.showSuccess("El historial de clínica ha sido creado con éxito.");
      },
      error: () => {
        this.alertService.showError("No se pudo crear el historial de clínica. Por favor, inténtelo de nuevo.");
      }
    });
  }

  updateClinicHistory(): void {
    if (!this.selectedClinicHistory.id) {
      this.alertService.showError("No se ha seleccionado ningún historial de clínica para actualizar o falta el ID.");
      return;
    }
    const historyId = this.selectedClinicHistory.id;

    this.clinicHistoryService.updateClinicHistory(historyId, this.selectedClinicHistory).subscribe(() => {
      this.alertService.showSuccess("El historial de clínica ha sido actualizado con éxito.");
    }, () => {
      this.alertService.showError("Error al actualizar el historial de clínica. Por favor, inténtelo de nuevo.");
    });
  }

  deleteClinicHistory(id: number | undefined): void {
    if (id === undefined) {
      console.error("El ID del historial de clínica es undefined.");
      return;
    }
    const history = this.originalClinicHistoriesList.find(e => e.id === id);
    if (history) {
      this.alertService.showDeleteAlert(history.date.toString()).then(result => {
        if (result.isConfirmed) {
          this.clinicHistoryService.deleteClinicHistory(id).subscribe(() => {
            this.originalClinicHistoriesList = this.originalClinicHistoriesList.filter(e => e.id !== id);
            this.filterClinicHistories();
            this.alertService.showSuccess("Historial de clínica eliminado con éxito.");
          }, () => {
            this.alertService.showError("Error al eliminar el historial de clínica. Por favor, inténtelo de nuevo.");
          });
        }
      });
    }
  }
}