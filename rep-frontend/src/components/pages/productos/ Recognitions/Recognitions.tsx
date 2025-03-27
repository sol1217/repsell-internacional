import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import SingleRecognitions from "@/components/pages/productos/ Recognitions/SingleRecognitions";

const Recognitions = () => {
  return (
    <div className="#ffffff">
      <Breadcrumb
        color="text-[#1e242e]"
        pageName="Reconocimientos "
        description="Los reconocimientos que ofrecemos capturan la esencia del mérito y la excelencia. Con una variedad de estilos y acabados, estos galardones son perfectos para celebrar hitos importantes y destacar el esfuerzo y la dedicación de quienes los reciben."
      />

      <SingleRecognitions />

    </div>
  );
};

export default Recognitions;
