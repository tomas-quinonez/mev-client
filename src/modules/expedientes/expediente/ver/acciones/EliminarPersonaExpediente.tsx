import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { message, Modal } from "antd";

declare interface Props {
  idPersonaExpediente: number;
  afterCrud: () => void;
}

const showPromiseConfirm = (onConfirm: () => Promise<void>) => {
  Modal.confirm({
    title: "Eliminar Persona Expediente",
    content: "¿Está seguro que desea eliminar la persona del expediente?",
    onOk: onConfirm,
    okCancel: true,
  });
};
export default function EliminarPersonaExpediente({
  idPersonaExpediente,
  afterCrud,
}: Readonly<Props>) {
  const [eliminar] = useQuery<number>((idPersonaExpediente: number) =>
    request("/api/personas-expedientes/delete", { id: idPersonaExpediente }),
  );
  const handleEliminar = async () => {
    try {
      await eliminar(idPersonaExpediente);
      message.success(`Persona eliminada exitosamente del expediente.`);
      afterCrud();
    } catch (e: any) {
      message.error(
        e.message ??
          "Ocurrió un error al eliminar la persona del expediente. Intente nuevamente o comuníquese con soporte.",
      );
    }
  };

  return (
    <button
      className={"flex items-center gap-2"}
      style={{ width: "100%" }}
      onClick={() => showPromiseConfirm(handleEliminar)}
      type="button"
    >
      {<DeleteOutlined />}
      <span>Eliminar Persona</span>
    </button>
  );
}
