import { Button, Form, Input } from "antd";
import { FormProps, useWatch } from "antd/es/form/Form";

type FiltrosBuscarViewProps = {
  loading: boolean;
  onBuscar: (data: FiltrosExpediente) => void;
};

export default function FiltroBuscarExpedientes({
  onBuscar,
}: Readonly<FiltrosBuscarViewProps>) {
  const onFinish: FormProps<FiltrosExpediente>["onFinish"] = (values) => {
    onBuscar(values);
  };

  const [form] = Form.useForm();
  const numero = useWatch("numero", form);
  return (
    <Form
      name="formBuscarExpedientes"
      form={form}
      className="!flex-row items-baseline flex-wrap !gap-y-2"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FiltrosExpediente> label="Número" name="numero">
        <Input allowClear />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {numero ? "Buscar" : "Buscar todo"}
        </Button>
      </Form.Item>
    </Form>
  );
}
