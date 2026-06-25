interface PersonaDTO {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  createdAt: string;
  updatedAt: string;
}

interface FiltrosPersona {
  nombre?: string;
  apellido?: string;
  dni?: string;
}

interface InputPersona  {
  id?: number;
  nombre: string;
  apellido: string;
  dni?: string;
  cuit?: string; 
  idExpediente?: number;
  idPersona?: number;
}