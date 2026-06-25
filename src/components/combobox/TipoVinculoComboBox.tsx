import { useQuery } from "@tanstack/react-query";
import { request } from "@utils/axiosInstance";
import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

export default function TipoVinculoComboBox(props: Readonly<SelectProps>) {
  const { data } = useQuery({
    queryKey: ["tipos-vinculos"],
    queryFn: () => request("/api/configuracion/tipos-vinculos"),
  });

  const options: DefaultOptionType[] =
    data?.map((item: TipoVinculoDTO) => {
      return {
        value: item.id,
        label: item.descripcion,
      };
    }) ?? [];

  return (
    <div className="flex gap-2">
      <Select
        options={options}
        showSearch
        allowClear
        placeholder="Seleccione un tipo de vínculo"
        {...props}
      />
    </div>
  );
}
