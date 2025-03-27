import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import details from "public/images/hero/cada-detalle-cuenta.png";
import { Star } from "lucide-react"; // usa esto si estás usando íconos de lucide

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Marlon Villalobos",
    designation: "Producto: Copas y Trofeos",
    content:
      "Está demasiado lindo el trofeo 🏆. Normalmente doy medallas al campeón, es la primera vez que daré también trofeo y les va a gustar",
    imagePerson: "/images/hero/person-2.png",
    star: 5,
  },
  {
    id: 2,
    name: "⁠María José Céspedes",
    designation: "Producto: Promocionales",
    content:
      "El cristal quedó perfecto muchas gracias y muchas gracias también por el excelente servicio ",
    imagePerson: "/images/hero/person-1.png",
    star: 5,
  },
  {
    id: 3,
    name: "Julio Zúñiga",
    designation: "Producto: Medallas",
    content:
      "Esperamos el otro año volver a trabajar con ustedes, el trabajo quedó muy bien y ha gustado mucho. Gracias.",
    imagePerson: "/images/hero/person-3.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section
      className="relative z-10 py-28 text-white"
      style={{
        background:
          "radial-gradient(circle at top left, #1E3A8A 0%, #0A0F24 80%)",
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <div className=" mb-12  flex justify-center">
          <Image
            src={details}
            alt="Cada detalle cuenta"
            width={300}
            height={300}
            className="opacity-80"
          />
        </div>
        <h2 className="mb-6 font-mono text-4xl font-bold drop-shadow">
          Lo que dicen nuestros clientes
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-white/80">
          En Repsell Internacional, la calidad no es solo un objetivo, es
          nuestra promesa.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonialData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl bg-[#101933]/60 p-8 shadow-lg backdrop-blur-md transition hover:shadow-blue-500/30"
            >
              <div className="mb-4 flex items-center gap-4">
                <Image
                  src={testimonial.imagePerson}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-[#4A6CF7]"
                />
                <div className="text-left">
                  <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                  <span className="text-xs text-white/60">
                    {testimonial.designation}
                  </span>
                </div>
              </div>
              <div className="mb-3 flex gap-1 text-[#4A6CF7]">
                {Array(testimonial.star)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={18} fill="#e11b24" stroke="#e11b24" />
                  ))}
              </div>
              <p className="text-sm leading-relaxed text-white/80">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="star animate-star absolute left-[60%] top-[20%] h-1 w-1 rounded-full bg-white opacity-70" />
      <div className="star animate-star delay-2000 absolute left-[70%] top-[40%] h-1 w-1 rounded-full bg-white opacity-50" />
      <div className="star animate-star absolute left-[80%] top-[60%] h-1 w-1 rounded-full bg-white opacity-60 delay-1000" />
    </section>
  );
};

export default Testimonials;
