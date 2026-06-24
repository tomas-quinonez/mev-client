import { useQuery } from "@hooks/useQuery";
import BtnExpediente from "@modules/expedientes/components/BtnExpediente";
import { request } from "@utils/axiosInstance";
import { ColumnsType } from "antd/es/table";
import { Button, Flex, Table } from "antd/lib";

import { useEffect, useMemo } from "react";

declare interface Props {
  idPersona: number;
  onClose: () => void;
}

const getColumns = () => {
  const columns: ColumnsType<any> = [
    {
      key: "claveExpediente",
      title: "Clave",
      dataIndex: "claveExpediente",
      width: "250px",
      render: (_, item) => {
        return <BtnExpediente item={item} />;
      },
    },
    {
      key: "caratula",
      title: "Carátula",
      dataIndex: "caratula",
      align: "center",
      width: "500px",
    },
    {
      key: "tipo",
      title: "Tipo",
      dataIndex: "tipo",
      align: "center",
      width: "200px",
    },
    {
      key: "numero",
      title: "Número",
      dataIndex: "numero",
      align: "center",
      width: "200px",
    },
    {
      key: "anio",
      title: "Año",
      dataIndex: "anio",
      align: "center",
      width: "200px",
    },
    {
      key: "nombreCiudad",
      title: "Ciudad",
      dataIndex: "nombreCiudad",
      align: "center",
      width: "300px",
    },
  ];

  return columns;
};

export default function ExpedientesPersona({
  idPersona,
  onClose,
}: Readonly<Props>) {
  const [getExpedientes, { loading, data }] = useQuery(
    (filtros: FiltrosExpediente) => request(`/api/expedientes`, filtros),
  );

  useEffect(() => {
    if (idPersona) getExpedientes({ idPersona: idPersona });
  }, [idPersona]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <div className="vertical-layout gap-2 grow">
      <Table<any>
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
      />
      <Flex gap="middle" justify="flex-end">
        <Button onClick={() => onClose()} type="primary">
          Cerrar
        </Button>
      </Flex>
    </div>
  );
}
