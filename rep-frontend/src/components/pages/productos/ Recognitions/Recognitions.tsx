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

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="grid grid-cols-1 gap-6  md:grid-cols-3 lg:grid-cols-3">
              <SingleRecognitions />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recognitions;
