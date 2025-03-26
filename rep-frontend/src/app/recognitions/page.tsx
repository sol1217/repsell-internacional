import { Metadata } from "next";
import Recognitions from "@/components/pages/productos/ Recognitions/Recognitions";

export const metadata: Metadata = {
  title: "Reconocimientos",
  description:
    "Los reconocimientos que ofrecemos capturan la esencia del mérito y la excelencia. Con una variedad de estilos y acabados, estos galardones son perfectos para celebrar hitos importantes y destacar el esfuerzo y la dedicación de quienes los reciben.",
  keywords: "reconocimientos, excelencia, estilos, esfuerzo",
};

const RecognitionsPage = () => {
  return (
    <div className="bg-white">
      <Recognitions />
    </div>
  );
};

export default RecognitionsPage;
