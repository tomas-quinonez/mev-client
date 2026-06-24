import { EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";
import { lazy } from "react";
import CiudadesView from "./ciudades/CiudadesView";
const OrganismosView = lazy(
  () => import("@modules/configuracion/organismos/OrganismosView"),
);

const configuracionRoutes = {
  path: "configuracion",
  children: [
    {
      path: "Organismos",
      element: <OrganismosView />,
      icon: <EnvironmentOutlined />,
    },
    { path: "Ciudades", element: <CiudadesView />, icon: <GlobalOutlined /> },
  ],
};

export { configuracionRoutes };
