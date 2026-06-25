import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@hooks/useQuery";
import { Table } from "antd/lib";
import FiltroBuscarExpedientes from "./FiltroBuscarExpediente";
import { request } from "@utils/axiosInstance";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BtnExpediente from "../components/BtnExpediente";
import AccionesExpediente from "./ver/acciones/AccionesExpediente";
import EditarExpediente from "./ver/acciones/EditarExpediente";
import ButtonDrawer from "@components/button/ButtonDrawer";

function renderAcciones(item: any, afterCrud: () => void) {
  return (
    <div className="flex justify-center gap-3 items-center">
      <AccionesExpediente expediente={item} afterCrud={afterCrud} />
    </div>
  );
}
const getColumns = (afterCrud: () => void): ColumnsType<ExpedienteDTO> => {
  return [
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
    {
      key: "acciones",
      title: "Acciones",
      align: "center",
      fixed: "right",
      width: "150px",
      render: (_, item) => renderAcciones(item, afterCrud),
    },
  ];
};

export default function ExpedientesView() {
  const [filtros, setFiltros] = useState<FiltrosExpediente>({});

  const [getExpedientes, { loading, data }] = useQuery(
    (filtros: FiltrosExpediente) => request(`/api/expedientes`, filtros),
  );

  useEffect(() => {
    if (filtros) {
      getExpedientes(filtros);
    }
  }, [filtros]);

  const handleBuscarExpedientes = async () => {
    if (filtros) getExpedientes(filtros);
  };

  const columns = useMemo(
    () => getColumns(handleBuscarExpedientes),
    [getExpedientes],
  );

  return (
    <>
      <h3>Expedientes</h3>
      <div
        id="headerControlesExpediente"
        className="horizontal-layout items-end justify-between flex-wrap gap-3"
      >
        <FiltroBuscarExpedientes loading={loading} onBuscar={setFiltros} />
        <Button icon=<PlusOutlined /> type="primary">
          <ButtonDrawer
            title="Crear Expediente"
            contentRenderer={({ onClose }) => (
              <EditarExpediente
                onClose={onClose}
                afterCrud={handleBuscarExpedientes}
              />
            )}
          />
        </Button>
      </div>
      <Table<ExpedienteDTO> columns={columns} dataSource={data} rowKey="id" />
    </>
  );
}
