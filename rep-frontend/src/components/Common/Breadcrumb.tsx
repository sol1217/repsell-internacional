"use client";

const Breadcrumb = ({
  pageName,
  description,
  adm,
  href,
  color,
}: {
  pageName: string;
  description: string;
  adm?: string;
  href?: string;
  color?: string;
}) => {
  const goBack = () => {
    window.history.back();
  };


  const buttonClass = adm
    ? "mt-5 rounded-md bg-[#e11b24] px-9 py-4 text-base font-medium text-white shadow-md hover:bg-[#c8101c] transition"
    : "";

  return (
    <section
      className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]"
      style={{
        background:
          "radial-gradient(circle at top left, #f5f7fa 0%, #dbe7ff 50%, #ffffff 100%)",
      }}
    >
      <div className="container pt-6">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 md:w-8/12 lg:w-7/12">
            <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
              <p className=" font-mono text-4xl font-bold leading-relaxed text-[#0A0F24] drop-shadow">
                {pageName}
              </p>
              <p className="text-base font-medium leading-relaxed text-[#0A0F24]/80">
                {description}
              </p>
              {adm && (
                <button className={buttonClass}>
                  <a href={href}>{adm}</a>
                </button>
              )}
            </div>
          </div>

          <div className="w-full px-4 md:w-4/12 lg:w-5/12">
            <div className="text-end">
              <ul className="flex items-center md:justify-end">
                <li className="flex items-center">
                  <button
                    className="pr-1 text-base font-medium text-[#0A0F24]/80 hover:text-[#e11b24]"
                    onClick={goBack}
                  >
                    Regresar
                  </button>
                  <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-[#0A0F24]/50"></span>
                </li>
                <li className="text-base font-medium text-[#e11b24]">
                  {pageName}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Decoración SVG suave */}
      <div>
        <span className="absolute left-0 top-0 z-[-1] opacity-10">
          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="150" cy="150" r="150" fill="#4A6CF7" />
          </svg>
        </span>
        <span className="absolute right-0 top-0 z-[-1] opacity-10">
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="110" cy="110" r="110" fill="#e11b24" />
          </svg>
        </span>
      </div>
    </section>
  );
};

export default Breadcrumb;
