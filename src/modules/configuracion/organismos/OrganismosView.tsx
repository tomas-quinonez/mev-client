import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo } from "react";
import { useQuery } from "@hooks/useQuery";
import { Button, Table } from "antd/lib";
import { request } from "@utils/axiosInstance";
import AccionesOrganismo from "./acciones/AccionesOrganismo";
import OrganismoForm from "./acciones/OrganismoForm";
import { PlusOutlined } from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer";

function renderAcciones(item: any, afterCrud: () => void) {
  return (
    <div className="flex justify-center gap-3 items-center">
      <AccionesOrganismo item={item} afterCrud={afterCrud} />
    </div>
  );
}

const getColumns = (afterCrud: () => void): ColumnsType<OrganismoDTO> => {
  return [
    {
      key: "codigo",
      title: "Código",
      dataIndex: "codigo",
      align: "center",
      width: "100px",
    },
    {
      key: "nombre",
      title: "Nombre",
      dataIndex: "nombre",
      width: "250px",
    },
    {
      key: "titulo",
      title: "Título",
      dataIndex: "titulo",
      width: "250px",
    },
    {
      key: "nombreCiudad",
      title: "Ciudad",
      dataIndex: "nombreCiudad",
      width: "250px",
    },
    {
      key: "nombreFuero",
      title: "Fuero",
      dataIndex: "nombreFuero",
      width: "250px",
    },
    {
      key: "acciones",
      title: "Acciones",
      render: (_, item) => renderAcciones(item, afterCrud),
      align: "center",
      fixed: "right",
      width: "150px",
    },
  ];
};

export default function OrganismosView() {
  const [getOrganismos, { data }] = useQuery(() => request(`/api/organismos`));

  useEffect(() => {
    getOrganismos();
  }, []);

  const columns = useMemo(() => getColumns(getOrganismos), [getOrganismos]);

  return (
    <>
      <h3>Organismos</h3>
      <div className="flex justify-end mr-2">
        <Button icon=<PlusOutlined /> type="primary">
          <ButtonDrawer
            title="Crear Organismo"
            contentRenderer={({ onClose }) => (
              <OrganismoForm onClose={onClose} afterCrud={getOrganismos} />
            )}
          />
        </Button>
      </div>
      <Table<OrganismoDTO> columns={columns} dataSource={data} rowKey="id" />
    </>
  );
}
