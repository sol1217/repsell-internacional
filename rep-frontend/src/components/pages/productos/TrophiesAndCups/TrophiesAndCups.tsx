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

              <SingleTrophiesAndCups />
    </div>
  );
};

export default TrophiesAndCups;
