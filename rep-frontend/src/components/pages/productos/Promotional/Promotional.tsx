import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import SinglePromotional from "@/components/pages/productos/Promotional/SinglePromotional";

const Promotional = () => {
  return (
    <div>
      <Breadcrumb
        color="text-[#1e242e]"
        pageName="Promocionales y empresariales"
        description="Nuestros productos promocionales y empresariales están diseñados para fortalecer la identidad de tu marca y crear un impacto duradero. Desde regalos corporativos hasta material publicitario, ofrecemos soluciones personalizadas que reflejan la esencia de tu empresa."
      />


      <SinglePromotional />

    </div>
  );
};

export default Promotional;
