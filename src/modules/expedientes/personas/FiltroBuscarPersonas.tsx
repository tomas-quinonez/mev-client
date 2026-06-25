import { Button, Form, Input } from "antd";
import { FormProps, useWatch } from "antd/es/form/Form";
import { useEffect } from "react";

type FiltrosBuscarViewProps = {
  loading: boolean;
  onBuscar: (data: FiltrosPersona) => void;
};

export default function FiltroBuscarPersonas({
  onBuscar,
}: Readonly<FiltrosBuscarViewProps>) {
  const [form] = Form.useForm();
  const apellido = useWatch("apellido", form);
  const nombre = useWatch("nombre", form);
  const dni = useWatch("dni", form);

  const onFinish: FormProps<FiltrosPersona>["onFinish"] = (values) => {
    onBuscar(values);
  };

  useEffect(() => {
    onBuscar({});
  }, [onBuscar]);

  return (
    <Form
      name="formBuscarPersonas"
      className="!flex-row items-baseline flex-wrap !gap-y-2"
      onFinish={onFinish}
      form={form}
      autoComplete="off"
    >
      <Form.Item<FiltrosPersona> label="Nombre" name="nombre">
        <Input allowClear />
      </Form.Item>

      <Form.Item<FiltrosPersona> label="Apellido" name="apellido">
        <Input allowClear />
      </Form.Item>

      <Form.Item<FiltrosPersona> name="dni" label="DNI">
        <Input allowClear />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          {nombre || apellido || dni ? "Buscar" : "Buscar todo"}
        </Button>
      </Form.Item>
    </Form>
  );
}
