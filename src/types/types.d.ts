//----- Server Common Types
interface ListResult<T> {
  totalElements: number;
  elements: Array<T>;
}

interface DepartamentoDTO {
  id: number;
  codigo: string;
  descripcion: string;
  idDepartamento?: number;
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

interface InputDepartamento {
  id?: number;
  codigo: string;
  descripcion: string;
}
