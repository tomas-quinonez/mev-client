import { SearchOutlined } from "@ant-design/icons";
import TipoVinculoComboBox from "@components/combobox/TipoVinculoComboBox";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  List,
  message,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";

interface Props {
  input?: InputPersonaExpediente;
  onClose: () => void;
  afterCrud: () => void;
  idExpediente: number;
}

export default function PersonaExpedienteForm({
  input,
  onClose,
  afterCrud,
  idExpediente,
}: Readonly<Props>) {
  const [searchType, setSearchType] = useState("nombre");
  const [searchValue, setSearchValue] = useState();
  const [filtrosPersona, setFiltrosPersona] = useState({});
  const [idPersona, setIdPersona] = useState<number>();
  const [form] = Form.useForm();

  const [upsertPersona] = useQuery<number>(
    (inputPersonaExpediente: InputPersonaExpediente) =>
      request("/api/personas-expedientes/save", inputPersonaExpediente),
  );
  const [getPersonas, { loading, data }] = useQuery(() =>
    request(`/api/personas`, filtrosPersona),
  );

  useEffect(() => {
    if (filtrosPersona) {
      getPersonas(filtrosPersona);
    }
  }, [filtrosPersona]);

  const onFinish: FormProps<InputPersonaExpediente>["onFinish"] = async (
    values,
  ) => {
    const inputPersonaExpediente = {
      idExpediente,
      idPersona,
      idTipoVinculo: values.idTipoVinculo,
    };
    try {
      await upsertPersona(inputPersonaExpediente);
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

  const handleBuscarPersona = () => {
    switch (searchType) {
      case "nombre":
        setFiltrosPersona({ nombre: searchValue });
        break;
      case "apellido":
        setFiltrosPersona({ apellido: searchValue });
        break;
      case "documento":
        setFiltrosPersona({ dni: searchValue });
        break;
    }
  };

  const handleSelectItem = (persona: PersonaDTO) => {
    form.setFieldsValue({
      nombre: persona.nombre,
      apellido: persona.apellido,
      dni: persona.dni,
    });

    setIdPersona(persona.id);
  };

  return (
    <Form
      name="editarTitular"
      onFinish={onFinish}
      layout={"vertical"}
      scrollToFirstError={true}
      initialValues={input ?? {}}
      form={form}
    >
      <Form.Item<InputPersonaExpediente>
        label="Buscar Persona"
        name="busquedaPersona"
      >
        <Space.Compact>
          <Select
            value={searchType}
            onChange={setSearchType}
            style={{ width: 170 }}
            options={[
              { value: "nombre", label: "Nombre" },
              { value: "apellido", label: "Apellido" },
              { value: "documento", label: "Documento" },
            ]}
          />

          <Input
            placeholder={`Buscar por ${searchType}`}
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          />

          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleBuscarPersona}
          >
            Buscar
          </Button>
        </Space.Compact>
      </Form.Item>

      {!loading && data && (
        <>
          <strong>Seleccione una persona</strong>
          <List
            bordered
            dataSource={data}
            loading={loading}
            renderItem={(item: any) => (
              <List.Item
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleSelectItem(item);
                }}
              >
                {item.nombre} {item.apellido} - {item.dni}
              </List.Item>
            )}
          />
        </>
      )}

      <Form.Item<InputPersonaExpediente>
        label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: "Por favor ingrese sus nombres",
          },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item<InputPersonaExpediente>
        label="Apellido"
        name="apellido"
        rules={[
          {
            required: true,
            message: "Por favor ingrese sus apellidos",
          },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item<InputPersonaExpediente>
        name="dni"
        label="Documento"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su documento",
          },
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item<InputPersonaExpediente>
        name="idTipoVinculo"
        label="Tipo Expediente"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el tipo de expediente",
          },
        ]}
      >
        <TipoVinculoComboBox style={{ width: "100%" }} />
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
