export interface ClinicHistory {
    id?: number; // Opcional porque es autoincremental
    date: Date;
    time: string;
    petId: number;
}
