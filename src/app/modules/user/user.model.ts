// src/app/models/user.model.ts

export interface User {
    id?: number; // Opcional porque es autoincremental
    username: string;
    email: string;
    password: string; // Considera manejar esto de manera diferente en el frontend por seguridad
    cellPhone?: string; // Opcional ya que puede ser nulo
    age?: number; // Opcional ya que puede ser nulo
    birthDate?: Date; // Tipo string ya que usualmente se maneja así en el frontend
    address?: string;
    rolId: number;  

  }
  