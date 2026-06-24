import { useQuery } from "@hooks/useQuery";
import CiudadComboBox from "@components/combobox/CiudadComboBox";
import { request } from "@utils/axiosInstance";
import { Button, Flex, Form, FormProps, Input, message } from "antd";
import FueroComboBox from "@components/combobox/FueroComboBox";

interface Props {
  input?: InputOrganismo;
  onClose: () => void;
  afterCrud: () => void;
}

export default function OrganismoForm({
  input,
  onClose,
  afterCrud,
}: Readonly<Props>) {
  const [upsertOrganismo] = useQuery<number>((inputOrganismo: InputOrganismo) =>
    request("/api/organismos/save", inputOrganismo),
  );

  const onFinish: FormProps<InputOrganismo>["onFinish"] = async (values) => {
    values.id = input?.id ?? 0;
    try {
      await upsertOrganismo(values);
      message.success(
        `Organismo ${values.id ? "actualizada" : "creada"} exitosamente.`,
      );
      afterCrud();
      onClose();
    } catch (e: any) {
      message.error(
        e?.response?.data?.message ??
          "Ocurrió un error al insertar el organismo.",
      );
    }
  };

  return (
    <Form
      name="editarOrganismo"
      onFinish={onFinish}
      layout={"vertical"}
      scrollToFirstError={true}
      initialValues={input ?? {}}
    >
      <Form.Item<InputOrganismo>
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

      <Form.Item<InputOrganismo>
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

      <Form.Item<InputOrganismo> label="Título" name="titulo">
        <Input allowClear />
      </Form.Item>

      <Form.Item<InputOrganismo>
        label="Ciudad"
        name="idCiudad"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la ciudad",
          },
        ]}
      >
        <CiudadComboBox style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item<InputOrganismo>
        label="Fuero"
        name="idFuero"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el fuero",
          },
        ]}
      >
        <FueroComboBox style={{ width: "100%" }} />
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
