import { Button, Dropdown, MenuProps } from "antd";
import { EyeOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import PersonasExpediente from "../PersonasExpediente";
import ButtonDrawer from "@components/button/ButtonDrawer";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  expediente: any;
  afterCrud: () => void;
}

export default function AccionesExpediente({ expediente }: Readonly<Props>) {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "verPersonas",
      label: (
        <ButtonDrawer
          title="Personas"
          icon=<UserOutlined />
          contentRenderer={({ onClose }) => (
            <PersonasExpediente
              idExpediente={expediente.id}
              visible={false}
              onClose={onClose}
            />
          )}
        />
      ),
    },
    {
      key: "verExpediente",
      icon: <EyeOutlined />,
      label: (
        <Suspense fallback={<div>Loading...</div>}>
          <button
            className={"flex items-center gap-2"}
            style={{ width: "100%" }}
            onClick={() => navigate(`/expedientes/ver/${expediente.id}`)}
            type="button"
          >
            Ver Detalle
          </button>
        </Suspense>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button icon={<MoreOutlined size={50} aria-hidden="true" />} />
    </Dropdown>
  );
}
