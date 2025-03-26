import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import trofeo from "public/images/products/repsell-3.jpg";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <div className="group relative flex-wrap overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
        <Link
          href="/blog-details"
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
            category
          </span>
          <Image
            className="mx-auto"
            src={trofeo}
            alt=""
            width={350}
            height={300}
          />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href="/blog-details"
              className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              name
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            description
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex flex-col items-center gap-3 border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  Colores Disponibles:
                </h4>
              </div>
              <div className="mr-4 flex flex-row flex-wrap gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={trofeo} alt="author" fill />
                </div>
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={trofeo} alt="author" fill />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Altura: 6CM
              </h4>
              <a
                href="/trophiesAndCups"
                className="rounded-sm bg-[#e11b24] px-9 py-2 text-center text-base font-medium text-white shadow-submit duration-300 hover:bg-[#e11b25]/90 dark:shadow-submit-dark"
              >
                Añadir
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
