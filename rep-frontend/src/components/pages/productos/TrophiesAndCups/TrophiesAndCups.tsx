import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import SingleTrophiesAndCups from "@/components/pages/productos/TrophiesAndCups/SingleTrophiesAndCups";

const TrophiesAndCups = () => {
  return (
    <div>
      <Breadcrumb
        color="text-[#1e242e]"
        pageName="Copas y Trofeos"
        description="Las Copas y Trofeos que ofrecemos son galardones; son emblemas de triunfo y dedicación. Con una amplia variedad de estilos y acabados, encontrarás la opción perfecta para honrar a los ganadores y destacar su esfuerzo."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
              <SingleTrophiesAndCups />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrophiesAndCups;
