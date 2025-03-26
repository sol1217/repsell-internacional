import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import Image from "next/image";
import productos from "../../../public/images/hero/products-text.png";

const FeaturesSection = () => {
  return (
    <div className="relative flex items-center justify-center bg-dark">
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          playsInline
          muted
        >
          <source src="/images/video/atletismo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A0F24]/50 backdrop-blur-sm"></div>
      </div>

      <section
        id="features"
        className="relative z-10 w-full bg-white bg-opacity-0 py-16 md:py-20 lg:py-28"
      >
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-center">
            <Image src={productos} alt="" height={300} width={300} />
          </div>

          <SectionTitle
            titleColor="text-[#ffffff]"
            paragraph="En REPSELL INTERNACIONAL, nos especializamos en ofrecer una amplia gama de productos diseñados para celebrar y reconocer los logros de manera única y memorable."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14  md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
