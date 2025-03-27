import Breadcrumb from "@/components/Common/Breadcrumb";
import NewProducts from "@/components/pages/productos/NewProducts/NewProducts";

const BubbleDecoration = () => {
  return (
    <>
      <span className="absolute left-0 top-0 z-0 opacity-10">
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
      <span className="absolute bottom-0 right-0 z-0 opacity-10">
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
      <span className="absolute bottom-10 left-10 z-0 opacity-10">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" fill="#ffffff" />
        </svg>
      </span>
      <span className="absolute right-10 top-1/2 z-0 opacity-10">
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="90" cy="90" r="90" fill="#4A6CF7" />
        </svg>
      </span>
      <span className="absolute right-10 top-1/2 z-0 opacity-10">
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="90" cy="90" r="90" fill="#4A6CF7" />
        </svg>
      </span>

    </>
  );
};

export default BubbleDecoration ;
