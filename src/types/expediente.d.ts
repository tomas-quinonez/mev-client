interface ExpedienteDTO {
  id: number;
  claveExpediente?: string;
  numero: string;
  anio: string;
  caratula: string;
  nombreCiudad: boolean;
  tipo: string;
  codigoDepartamento: any;
  codigoCiudad: any;
}

interface FiltrosExpediente {
  numero?: string;
  idExpediente?: number;
}

interface InputExpediente {
  id: number;
  idOrganismo: number;
  idTipoExpediente: number;
  numero: string;
  anio: string;
  caratula: string;
  idCiudad: boolean;
}
