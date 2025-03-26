import Image from "next/image";
import galleryOne from "public/images/hero/3.jpg";
import galleryTwo from "public/images/products/gallery-2.jpeg";
import galleryThree from "public/images/products/gallery-3.jpeg";
import galleryFour from "public/images/products/gallery-4.jpg";
import galleryFive from "public/images/products/gallery-5.jpeg";
import gallerySix from "public/images/products/gallery-6.jpg";
import { Gallery } from "@/types/gallery";
import SectionTitle from "@/components/Common/SectionTitle";

const Images: Gallery[] = [
  { image: galleryOne },
  { image: galleryTwo },
  { image: galleryThree },
  { image: galleryFour },
  { image: galleryFive },
  { image: gallerySix },
];

const GalleryAbout = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover opacity-50 mix-blend-darken"
          autoPlay
          loop
          playsInline
          muted
        >
          <source src="/images/video/corporativo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A0F24]/50 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 mt-20">
        <SectionTitle
          titleColor="text-white"
          title="GALERÍA"
          paragraph="En Repsell Internacional, convertimos sus ideas en obras maestras de gran formato. Desde murales impresionantes hasta banners impactantes, nuestra impresión de gran formato eleva su visión al siguiente nivel."
          center
        />

        <div className="mb-20 flex flex-wrap items-center justify-center gap-4 px-4">
          {Images.map((item, index) => (
            <div key={index} className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="transform overflow-hidden rounded-lg border-4 border-[#4A6CF7] shadow-lg hover:shadow-blue-500/90">
                <Image
                  src={item.image}
                  className="rounded-md object-cover"
                  alt={`Gallery Image ${index + 1}`}
                  width={380}
                  height={380}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryAbout;
