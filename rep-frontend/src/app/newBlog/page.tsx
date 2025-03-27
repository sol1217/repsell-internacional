import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import NewBlog from "@/components/pages/Blogs/NewBlog/NewBlog";

export const metadata: Metadata = {
  title: "Repsell International Blog ",
  description:
    "Explora el blog de Repsell International para obtener las últimas noticias, tendencias e innovaciones en premiaciones y reconocimientos. Descubre artículos sobre trofeos, copas y productos personalizados para galardonar a los mejores.",
  keywords:
    "Repsell International, blog, premiaciones, reconocimientos, trofeos, copas, productos personalizados, galardones, innovaciones",
};

const NewBlogPage = () => {
  return (
    <div className="bg-white">
      <Breadcrumb
        color="text-[#000000]"
        pageName="¿Deseas crear un nuevo Blog?"
        description="Comparte información valiosa o destaca un producto relevante creando una nueva publicación para tu audiencia."
      />

      <NewBlog />
    </div>
  );
};

export default NewBlogPage;
