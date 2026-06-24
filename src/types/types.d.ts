//----- Server Common Types
interface ListResult<T> {
  totalElements: number;
  elements: Array<T>;
}

interface CiudadDTO {
  id: number;
  nombre: string;
  codigo: string;
}

interface InputCiudad {
  id?: number;
  nombre: string;
  codigo: string;
}

interface OrganismoDTO {
  id: number;
  nombre: string;
  codigo: string;
  titulo: string;
  nombreCiudad: number;
  nombreFuero: number;
}

interface InputOrganismo {
  id: number;
  nombre: string;
  codigo: string;
  titulo: string;
  idCiudad: number;
  idFuero: number;
}

interface FueroDTO {
  id: number;
  nombre: string;
  codigo: string;
}
