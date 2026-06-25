import { Button, Descriptions } from "antd";
import PersonasExpediente from "./PersonasExpediente";
import EditarExpediente from "./acciones/EditarExpediente";
import { Space } from "antd/lib";
import ButtonDrawer from "@components/button/ButtonDrawer";
import { EditOutlined } from "@ant-design/icons";

interface Props {
  expediente: ExpedienteDTO;
  afterAccion: () => void;
}

export default function ExpedienteViewForm({
  expediente,
  afterAccion,
}: Readonly<Props>) {
  console.log("🚀 ~ ExpedienteViewForm ~ expediente:", expediente);

  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }}>
        <Descriptions
          bordered
          title="Datos del Expediente"
          size="small"
          column={1}
        >
          <Descriptions.Item label="Clave">
            {expediente?.claveExpediente}
          </Descriptions.Item>
          <Descriptions.Item label="Tipo">{expediente?.tipo}</Descriptions.Item>
          <Descriptions.Item label="Número">
            {expediente?.numero}
          </Descriptions.Item>
          <Descriptions.Item label="Año">{expediente?.anio}</Descriptions.Item>
          <Descriptions.Item label="Caratula">
            {expediente?.caratula}
          </Descriptions.Item>
          <Descriptions.Item label="Ciudad">
            {expediente?.nombreCiudad}
          </Descriptions.Item>
        </Descriptions>
      </Space>
      <Space direction="vertical" style={{ display: "flex" }}>
        <div className="horizontal-layout justify-end gap-2">
          <Descriptions
            extra={
              <Button icon=<EditOutlined /> type="primary">
                <ButtonDrawer
                  title="Editar Expediente"
                  contentRenderer={({ onClose }) => (
                    <EditarExpediente
                      onClose={onClose}
                      input={expediente}
                      afterCrud={afterAccion}
                    />
                  )}
                />
              </Button>
            }
          />
        </div>
      </Space>
      <span className="flex-row items-center gap-2">
        <h2 className="text-xl font-bold">Personas del Expediente</h2>
      </span>
      <PersonasExpediente
        idExpediente={expediente?.id}
        visible={true}
        onClose={function (): void {}}
      />
    </>
  );
}
