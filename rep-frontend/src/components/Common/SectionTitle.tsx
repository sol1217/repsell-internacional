import Image from "next/image";

const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "100px",
  titleColor = "text-white",
  img = "../../../public/images/hero/products-text.png",
}: {
  title?: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
  titleColor?: string;
  img?: string;
}) => {
  return (
    <>
      <div
        className={`w-full ${center ? "mx-auto text-center" : ""} `}
        style={{ maxWidth: width, marginBottom: mb }}
      >
        <h2
          className={`mb-4 text-3xl font-bold !leading-tight sm:text-4xl md:text-[45px] ${titleColor}`}
        >
          {title}
        </h2>
        <p className={` !leading-relaxed  md:text-lg  ${titleColor}`}>
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
