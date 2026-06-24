import { useQuery } from "@tanstack/react-query";
import { request } from "@utils/axiosInstance";
import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

export default function FueroComboBox(props: Readonly<SelectProps>) {
  const { data } = useQuery({
    queryKey: ["fueros"],
    queryFn: () => request("/api/configuracion/fueros"),
  });

  const options: DefaultOptionType[] =
    data?.map((item: FueroDTO) => {
      return {
        value: item.id,
        label: item.codigo + " - " + item.nombre,
      };
    }) ?? [];

  return (
    <div className="flex gap-2">
      <Select
        options={options}
        showSearch
        allowClear
        placeholder="Seleccione un fuero"
        {...props}
      />
    </div>
  );
}
