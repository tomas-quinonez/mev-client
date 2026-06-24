import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { Button, Flex, Form, FormProps, Input, message } from "antd";

interface Props {
  input?: InputPersona;
  onClose: () => void;
  afterCrud: () => void;
}

export default function PersonaForm({
  input,
  onClose,
  afterCrud,
}: Readonly<Props>) {
  const [upsertPersona] = useQuery<number>((inputPersona: any) =>
    request("/api/personas/save", inputPersona),
  );

  const onFinish: FormProps<InputPersona>["onFinish"] = async (values) => {
    values.id = input?.id ?? 0;
    try {
      await upsertPersona(values);
      message.success(
        `Persona ${values.id ? "actualizada" : "creada"} exitosamente.`,
      );
      afterCrud();
      onClose();
    } catch (e: any) {
      message.error(
        e?.response?.data?.message ??
          "Ocurrió un error al insertar la persona.",
      );
    }
  };

  return (
    <Form
      name="editarTitular"
      onFinish={onFinish}
      layout={"vertical"}
      scrollToFirstError={true}
      initialValues={input ?? {}}
    >
      <Form.Item<InputPersona>
        label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: "Por favor ingrese un nombre",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item<InputPersona>
        label="Apellido"
        name="apellido"
        rules={[
          {
            required: true,
            message: "Por favor ingrese un apellido",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item<InputPersona>
        name="dni"
        label="Documento"
        rules={[
          {
            required: true,
            message: "Por favor ingrese un número de documento",
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
