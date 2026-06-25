import { useQuery } from "@hooks/useQuery";
import CiudadComboBox from "@components/combobox/CiudadComboBox";
import { request } from "@utils/axiosInstance";
import { Button, Flex, Form, Input, List, message, Select, Space } from "antd";
import OrganismoComboBox from "@components/combobox/OrganismoComboBox";
import TipoExpedienteComboBox from "@components/combobox/TipoExpedienteComboBox";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
  input?: any;
  onClose: () => void;
  afterCrud: () => void;
}

export default function EditarExpediente({
  input,
  onClose,
  afterCrud,
}: Readonly<Props>) {
  const [searchType, setSearchType] = useState("nombre");
  const [searchValue, setSearchValue] = useState();
  const [filtrosPersona, setFiltrosPersona] = useState({});
  const [idPersona, setIdPersona] = useState<number>();
  const [upsertExpediente] = useQuery<number>((inputExpediente: any) =>
    request("/api/expedientes/save", { ...inputExpediente, idPersona }),
  );
  const [getPersonas, { loading, data }] = useQuery(() =>
    request(`/api/personas`, filtrosPersona),
  );

  useEffect(() => {
    if (filtrosPersona) {
      getPersonas(filtrosPersona);
    }
  }, [filtrosPersona]);

  const onFinish = async (values: any) => {
    values.id = input?.id ?? 0;
    try {
      await upsertExpediente(values);
      message.success(
        `Expediente ${values.id ? "actualizada" : "creada"} exitosamente.`,
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

  const [form] = Form.useForm();
  return (
    <Form
      name="editarExpediente"
      layout={"vertical"}
      onFinish={onFinish}
      scrollToFirstError={true}
      form={form}
      initialValues={input ?? {}}
    >
      <Form.Item<InputExpediente>
        name="idOrganismo"
        label="Organismo"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el organismo del expediente",
          },
        ]}
      >
        <OrganismoComboBox style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item<InputExpediente>
        name="idTipoExpediente"
        label="Tipo Expediente"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el tipo de expediente",
          },
        ]}
      >
        <TipoExpedienteComboBox style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item<InputExpediente>
        label="Número"
        name="numero"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el número del expediente",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<InputExpediente>
        label="Año"
        name="anio"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el año del expediente",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<InputExpediente>
        label="Caratula"
        name="caratula"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la caratula del expediente",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<InputExpediente>
        name="idCiudad"
        label="Ciudad"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la ciudad",
          },
        ]}
      >
        <CiudadComboBox style={{ width: "100%" }} />
      </Form.Item>
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
          <strong>Seleccione un ACTOR principal</strong>
          <List
            bordered
            dataSource={data}
            loading={loading}
            renderItem={(item: any) => (
              <List.Item
                style={{
                  cursor: "pointer",
                  background: idPersona === item.id ? "#e6f4ff" : undefined,
                }}
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
