import BlogSidebar from "@/components/pages/Blogs/BlogSidebar";
import Breadcrumb from "@/components/Common/Breadcrumb";

const BlogPage = () => {
  return (
    <div className="bg-white">
      <Breadcrumb pageName="Blog Publicados" description="Descubre nuestro espacio de contenido donde compartimos artículos, noticias y publicaciones recientes sobre nuestros productos, servicios y tendencias del sector. En Repsell Internacional creemos en el poder de la información para inspirar, educar y conectar con nuestros clientes."/>
      <BlogSidebar />
    </div>
  );
};

export default BlogPage;
