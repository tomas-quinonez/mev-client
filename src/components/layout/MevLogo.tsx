import escudoUrl from "./../../assets/mev.png";

export interface MevLogoProps {
  width?: number | string;
  height?: number | string;
}

export default function MevLogo({ width = "100px", height = "100px" }: Readonly<MevLogoProps>) {
  return (
    <img
      width={width}
      height={height}
      src={escudoUrl}
      alt="MEV - Poder Judicial de Neuquén"
      aria-label="Ir al Inicio"
    />
  );
}
