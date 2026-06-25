import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { Suspense } from "react";
import EliminarPersonaExpediente from "./EliminarPersonaExpediente";

export interface Props {
  afterCrud: () => void;
  item?: any;
}

export default function AccionesPersonaExpediente({
  afterCrud,
  item,
}: Readonly<Props>) {
  const items: MenuProps["items"] = [
    {
      key: "eliminarPersona",
      label: (
        <Suspense fallback={<div>Loading...</div>}>
          <EliminarPersonaExpediente
            idPersonaExpediente={item.id}
            afterCrud={afterCrud}
          />
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
