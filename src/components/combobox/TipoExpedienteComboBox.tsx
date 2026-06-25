import { useQuery } from "@tanstack/react-query";
import { request } from "@utils/axiosInstance";
import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

export default function TipoExpedienteComboBox(props: Readonly<SelectProps>) {
  const { data } = useQuery({
    queryKey: ["tipos-expedientes"],
    queryFn: () => request("/api/configuracion/tipos-expedientes"),
  });

  const options: DefaultOptionType[] =
    data?.map((item: TipoExpedienteDTO) => {
      return {
        value: item.id,
        label: item.nombre,
      };
    }) ?? [];

  return (
    <div className="flex gap-2">
      <Select
        options={options}
        showSearch
        allowClear
        placeholder="Seleccione un tipo de expediente"
        {...props}
      />
    </div>
  );
}
