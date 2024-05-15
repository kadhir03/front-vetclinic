import { Component, OnInit } from '@angular/core';
import { PetService } from '../../../services/pet.service';
import { AlertService } from '../../../services/alert.service';
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-crud-pet',
  templateUrl: './crud-pet.component.html',
  styleUrl: './crud-pet.component.css'
})
export class CrudPetComponent implements OnInit {
  pets: Pet[] = [];
  originalPetsList: Pet[] = [];
  selectedPet: Pet = this.getEmptyPet();
  isCreatePetFormVisible: boolean = false;
  searchQuery: string = '';

  constructor(private petService: PetService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAllPets();
  }

  getEmptyPet(): Pet {
    return { name: '', breed: '', gender: '', clientId: 0} as Pet;
  }

  showCreatePetForm(): void {
    this.isCreatePetFormVisible = true;
    this.selectedPet = this.getEmptyPet();
  }

  hideCreatePetForm(): void {
    this.isCreatePetFormVisible = false;
    this.selectedPet = this.getEmptyPet();
  }

  selectPet(pet: Pet): void {
    this.selectedPet = pet;
    this.isCreatePetFormVisible = true;
  }

  filterPets(): void {
    this.pets = this.searchQuery ? this.originalPetsList.filter(pet =>
      pet.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    ) : [...this.originalPetsList];
  }

  getAllPets(): void {
    this.petService.getAllPets().subscribe(pets => {
      this.originalPetsList = pets;
      this.pets = [...pets];
    }, error => console.error("Error al obtener las mascotas:", error));
  }

  createPet() {
    this.alertService.showCreateAlert().then(result => {
      if (!result.isConfirmed) {
        return;
      }
      this.petService.createPet(this.selectedPet as Pet).subscribe({
        next: (newPet) => {
          this.originalPetsList.push(newPet);
          this.filterPets();
          this.hideCreatePetForm();
          this.alertService.showSuccess("La mascota ha sido creada con éxito.");
        },
        error: () => {
          this.alertService.showError("No se pudo crear la mascota. Por favor, intente de nuevo.");
        }
      });
    });
  }

  updatePet(): void {
    if (!this.selectedPet.id) {
      this.alertService.showError("No se ha seleccionado ninguna mascota para actualizar o falta el ID.");
      return;
    }
    const petId = this.selectedPet.id;

    this.alertService.showSaveAlert(this.selectedPet.name).then(result => {
      if (result.isConfirmed) {
        this.petService.updatePet(petId, this.selectedPet).subscribe(() => {
          this.alertService.showSuccess("La mascota ha sido actualizada con éxito.");
        }, () => {
          this.alertService.showError("Error al actualizar la mascota. Por favor, intente de nuevo.");
        });
      }
    });
  }

  deletePet(id: number | undefined): void {
    if (id === undefined) {
      console.error("El ID de la mascota es undefined.");
      return;
    }
    const pet = this.originalPetsList.find(e => e.id === id);
    if (pet) {
      this.alertService.showDeleteAlert(pet.name).then(result => {
        if (result.isConfirmed) {
          this.petService.deletePet(id).subscribe(() => {
            this.originalPetsList = this.originalPetsList.filter(e => e.id !== id);
            this.filterPets();
            this.alertService.showSuccess("Mascota eliminada con éxito.");
          }, () => {
            this.alertService.showError("Error al eliminar la mascota. Por favor, intente de nuevo.");
          });
        }
      });
    }
  }
}