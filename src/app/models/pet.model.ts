// src/app/models/role.model.ts

export interface Pet {
    id?: number; // Opcional porque es autoincremental
    name: string;
    breed: string;
    gender: string;
    clientId: number;
}
