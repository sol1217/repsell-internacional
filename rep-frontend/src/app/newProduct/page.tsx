import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import NewProducts from "@/components/pages/productos/NewProducts/NewProducts";

export const metadata: Metadata = {
  title: "Nuevo productos",
  description: "Nuevos productos en Repsell International",
};

const NewProductPage = () => {
  return (
    <div className="bg-white">
      <Breadcrumb
        color="text-[#000000]"
        pageName="¿Deseas agregar nuevos productos?"
        description="Agrega nuevos Reconocimientos, Medallas, Promocionales, Trofeos, Copas y Impresiones."
      />

      <section className="add-product pb-[120px] pt-[120px]">
        <NewProducts />
      </section>
    </div>
  );
};

export default NewProductPage;
