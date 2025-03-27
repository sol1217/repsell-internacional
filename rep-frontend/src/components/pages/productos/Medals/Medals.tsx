import Breadcrumb from "@/components/Common/Breadcrumb";

import React from "react";
import SingleMedals from "@/components/pages/productos/Medals/SingleMedals";

const Medals = () => {
  return (
    <div>
      <Breadcrumb
        color="text-[#1e242e]"
        pageName="Medallas"
        description="Las Medallas Repsell International destacan por su artesanía superior y su diseño distintivo. Perfectas para premiar a los mejores en cualquier competencia, estas medallas reflejan el prestigio y la dedicación que define a los ganadores."
      />


      <SingleMedals />

    </div>
  );
};

export default Medals;
