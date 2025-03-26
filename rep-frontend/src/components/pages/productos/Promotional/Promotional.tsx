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

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
              <SinglePromotional />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promotional;
