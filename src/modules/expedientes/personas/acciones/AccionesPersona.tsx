import { Button, Dropdown, MenuProps } from "antd";
import {
  EditOutlined,
  FileTextOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer";
import ExpedientesPersona from "./ExpedientesPersona";
import PersonaForm from "./EditarPersona";
import { Suspense } from "react";
import EliminarPersona from "./EliminarPersona";

interface Props {
  persona: PersonaDTO;
  afterCrud: () => void;
}

export default function AccionesExpediente({
  persona,
  afterCrud,
}: Readonly<Props>) {
  const items: MenuProps["items"] = [
    {
      key: "editarPersona",
      label: (
        <ButtonDrawer
          title="Editar Persona"
          icon={<EditOutlined />}
          contentRenderer={({ onClose }) => (
            <PersonaForm
              onClose={onClose}
              input={persona}
              afterCrud={afterCrud}
            />
          )}
        />
      ),
    },
    {
      key: "verExpedientes",
      label: (
        <ButtonDrawer
          title="Ver Expedientes"
          icon={<FileTextOutlined />}
          contentRenderer={({ onClose }) => (
            <ExpedientesPersona idPersona={persona.id} onClose={onClose} />
          )}
        />
      ),
    },
    {
      key: "eliminarOrganismo",
      label: (
        <Suspense fallback={<div>Loading...</div>}>
          <EliminarPersona idPersona={persona.id} afterCrud={afterCrud} />
        </Suspense>
      ),
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button icon={<MoreOutlined size={50} aria-hidden="true" />} />
    </Dropdown>
  );
}
