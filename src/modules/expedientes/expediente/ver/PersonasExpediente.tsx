import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { useEffect, useMemo } from "react";
import { Button, Flex } from "antd";
import PersonaExpedienteForm from "./acciones/PersonaExpedienteForm";
import ButtonDrawer from "@components/button/ButtonDrawer";
import AccionesPersona from "./acciones/AccionesPersonaExpediente";

declare interface Props {
  idExpediente: number;
  visible?: boolean;
  onClose: () => void;
}

const getColumns = (afterCrud: () => void, visible: boolean) => {
  const columns: ColumnsType<any> = [
    {
      key: "nombre",
      title: "Nombre",
      dataIndex: "nombre",
      width: "100px",
    },
    {
      key: "apellido",
      title: "Apellido",
      dataIndex: "apellido",
      width: "100px",
    },
    {
      key: "dni",
      title: "Documento",
      dataIndex: "dni",
      width: "100px",
    },
    {
      key: "nombreVinculo",
      title: "Vínculo",
      dataIndex: "nombreVinculo",
      render: (_, { nombreVinculo }) => nombreVinculo.toUpperCase(),
      width: "100px",
    },
    {
      key: visible ? "acciones" : "",
      title: visible ? "Acciones" : "",
      render: (_, item) =>
        visible && <AccionesPersona item={item} afterCrud={afterCrud} />,
      align: "center",
      width: visible ? "150px" : "0px",
    },
  ];
  return columns;
};

export default function PersonasExpediente({
  idExpediente,
  visible,
  onClose,
}: Readonly<Props>) {
  const [getPersonasExpediente, { loading, data }] = useQuery(
    (filtros: FiltrosExpediente) =>
      request(`/api/personas-expedientes`, filtros),
  );

  useEffect(() => {
    if (idExpediente) getPersonasExpediente({ idExpediente: idExpediente });
  }, [idExpediente]);

  const handleBuscarPersonasExpediente = async () => {
    if (idExpediente) getPersonasExpediente({ idExpediente: idExpediente });
  };
  const columns = useMemo(
    () => getColumns(handleBuscarPersonasExpediente, visible!),
    [handleBuscarPersonasExpediente, visible],
  );

  return (
    <div className="vertical-layout gap-2 grow">
      {visible && (
        <div className="flex justify-end mr-3">
          <Button color="danger" variant="solid" icon={<PlusOutlined />}>
            <ButtonDrawer
              title="Vincular Persona"
              contentRenderer={({ onClose }) => (
                <PersonaExpedienteForm
                  onClose={onClose}
                  afterCrud={handleBuscarPersonasExpediente}
                  idExpediente={idExpediente}
                />
              )}
            />
          </Button>
        </div>
      )}
      <Table<any>
        columns={columns}
        dataSource={data}
        rowKey="idPersona"
        loading={loading}
      />
      {!visible && (
        <Flex gap="middle" justify="flex-end">
          <Button onClick={() => onClose()} type="primary">
            Cerrar
          </Button>
        </Flex>
      )}
    </div>
  );
}
