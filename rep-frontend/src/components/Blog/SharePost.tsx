import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const SharePost = () => {
  return (
    <>
      <a
        href="https://wa.link/26xce4"
        aria-label="social-share"
        className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-sm bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary sm:ml-3"
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://www.instagram.com/repsellcr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        aria-label="social-share"
        className="mb-3 ml-3 inline-flex h-9 w-9 items-center justify-center rounded-sm bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.facebook.com/repsellcr/"
        aria-label="social-share"
        className="mb-3 ml-3 inline-flex h-9 w-9 items-center justify-center rounded-sm bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1 10.4939V7.42705C12.1 6.23984 13.085 5.27741 14.3 5.27741H16.5V2.05296L13.5135 1.84452C10.9664 1.66676 8.8 3.63781 8.8 6.13287V10.4939H5.5V13.7183H8.8V20.1667H12.1V13.7183H15.4L16.5 10.4939H12.1Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </>
  );
};

export default SharePost;
