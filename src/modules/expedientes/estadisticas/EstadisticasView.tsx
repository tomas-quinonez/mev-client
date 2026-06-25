import { useEffect } from "react";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { Column } from "@ant-design/plots";

export default function EstadisticasView() {
  const [getEstadisticasAnioCiudadFuero, { data: infoEstadisticas }] = useQuery<
    ListResult<any>
  >(() => request(`/api/expedientes/estadisticas`));

  useEffect(() => {
    getEstadisticasAnioCiudadFuero();
  }, []);

  // Define the type for your data
  const data: any = infoEstadisticas ?? [];

  const chartData = data.map((item: any, index: number) => ({
    ...item,
    grupo: `${item.anio} - ${item.ciudad}`,
    barra: `${item.anio}-${item.ciudad}-${item.fuero}-${index}`,
  }));

  const config = {
    data: chartData,

    xField: "grupo",

    yField: "cantidadExpedientes",

    // cada barra es una serie distinta
    seriesField: "barra",

    isGroup: true,

    colorField: "barra",

    legend: false,

    label: {
      position: "top",
    },

    xAxis: {
      label: {
        autoRotate: true,
      },
    },

    tooltip: {
      formatter: (datum: any) => ({
        name: datum.fuero,
        value: datum.cantidadExpedientes,
      }),
    },
  };

  return (
    <>
      <h3>Estadísticas por Año y Departamento</h3>
      <Column {...config} />
    </>
  );
}
