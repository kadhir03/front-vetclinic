// src/app/models/role.model.ts

export interface Role {
    id?: number; // Opcional porque es autoincremental
    name: string;
    status: boolean; // Indica si el rol está activo o no
  }
  