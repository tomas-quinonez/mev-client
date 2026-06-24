import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { Button, Flex, Form, FormProps, Input, message } from "antd";

interface Props {
  input?: InputCiudad;
  onClose: () => void;
  afterCrud: () => void;
}

export default function CiudadForm({
  input,
  onClose,
  afterCrud,
}: Readonly<Props>) {
  const [upsertCiudad] = useQuery<number>((inputCiudad: InputCiudad) =>
    request("/api/configuracion/ciudades/save", inputCiudad),
  );

  const onFinish: FormProps<InputCiudad>["onFinish"] = async (values) => {
    values.id = input?.id ?? 0;
    try {
      await upsertCiudad(values);
      message.success(
        `Ciudad ${values.id ? "actualizada" : "creada"} exitosamente.`,
      );
      afterCrud();
      onClose();
    } catch (e: any) {
      message.error(
        e?.response?.data?.message ?? "Ocurrió un error al insertar la ciudad.",
      );
    }
  };

  return (
    <Form
      name="editarCiudad"
      onFinish={onFinish}
      layout={"vertical"}
      scrollToFirstError={true}
      initialValues={input ?? {}}
    >
      <Form.Item<InputCiudad>
        label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el nombre",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item<InputCiudad>
        label="Código"
        name="codigo"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el codigo",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>

      <Flex gap="middle" justify="flex-end">
        <Button onClick={() => onClose()} danger>
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Flex>
    </Form>
  );
}
