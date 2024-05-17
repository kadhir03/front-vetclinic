import { Component, OnInit } from '@angular/core';
import { HistoryDetailService } from '../historyDetail.service';
import { AlertService } from '../../alerts/alert.service';
import { HistoryDetail } from '../historyDetail.model'

@Component({
  selector: 'app-crud-history-detail',
  templateUrl: './crud-history-detail.component.html',
  styleUrl: './crud-history-detail.component.css'
})
export class CrudHistoryDetailComponent {

  historyDetails: HistoryDetail[] = [];
  originalHistoryDetailsList: HistoryDetail[] = [];
  selectedHistoryDetail: HistoryDetail = this.getEmptyHistoryDetail();
  isCreateHistoryDetailFormVisible: boolean = false;
  searchQuery: string = '';

  constructor(private historyDetailService: HistoryDetailService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAllHistoryDetails();
  }

  getEmptyHistoryDetail(): HistoryDetail {
    return { temperature: 0, weight: 0, heartRate: 0, date: new Date(), time: '', userId: 0, clinicHistoryId: 0, observation:'' } as HistoryDetail;
  }

  showCreateHistoryDetailForm(): void {
    this.isCreateHistoryDetailFormVisible = true;
    this.selectedHistoryDetail = this.getEmptyHistoryDetail();
  }

  hideCreateHistoryDetailForm(): void {
    this.isCreateHistoryDetailFormVisible = false;
    this.selectedHistoryDetail = this.getEmptyHistoryDetail();
  }

  selectHistoryDetail(historyDetail: HistoryDetail): void {
    this.selectedHistoryDetail = historyDetail;
    this.isCreateHistoryDetailFormVisible = true;
  }

  filterHistoryDetails(): void {
    this.historyDetails = this.searchQuery ? this.originalHistoryDetailsList.filter(detail =>
      detail.date.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
    ) : [...this.originalHistoryDetailsList];
  }

  getAllHistoryDetails(): void {
    this.historyDetailService.getAllHistoryDetails().subscribe(details => {
      this.originalHistoryDetailsList = details;
      this.historyDetails = [...details];
    }, error => console.error("Error al obtener los detalles de historiales:", error));
  }

  createHistoryDetail() {
    this.historyDetailService.createHistoryDetail(this.selectedHistoryDetail as HistoryDetail).subscribe({
      next: (newDetail) => {
        this.originalHistoryDetailsList.push(newDetail);
        this.filterHistoryDetails();
        this.hideCreateHistoryDetailForm();
        this.alertService.showSuccess("El detalle de historial ha sido creado con éxito.");
      },
      error: () => {
        this.alertService.showError("No se pudo crear el detalle de historial. Por favor, inténtelo de nuevo.");
      }
    });
  }

  updateHistoryDetail(): void {
    if (!this.selectedHistoryDetail.id) {
      this.alertService.showError("No se ha seleccionado ningún detalle de historial para actualizar o falta el ID.");
      return;
    }
    const detailId = this.selectedHistoryDetail.id;

    this.historyDetailService.updateHistoryDetail(detailId, this.selectedHistoryDetail).subscribe(() => {
      this.alertService.showSuccess("El detalle de historial ha sido actualizado con éxito.");
    }, () => {
      this.alertService.showError("Error al actualizar el detalle de historial. Por favor, inténtelo de nuevo.");
    });
  }

  deleteHistoryDetail(id: number | undefined): void {
    if (id === undefined) {
      console.error("El ID del detalle de historial es undefined.");
      return;
    }
    const detail = this.originalHistoryDetailsList.find(e => e.id === id);
    if (detail) {
      this.alertService.showDeleteAlert(detail.date.toString()).then(result => {
        if (result.isConfirmed) {
          this.historyDetailService.deleteHistoryDetail(id).subscribe(() => {
            this.originalHistoryDetailsList = this.originalHistoryDetailsList.filter(e => e.id !== id);
            this.filterHistoryDetails();
            this.alertService.showSuccess("Detalle de historial eliminado con éxito.");
          }, () => {
            this.alertService.showError("Error al eliminar el detalle de historial. Por favor, inténtelo de nuevo.");
          });
        }
      });
    }
  }
}