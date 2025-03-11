import React from "react";
import Container from "../common/Container";
import Image from "next/image";
import { sanitizeUrl } from "../../lib/myFun";
import Link from "next/link";
export default function HomeBanner({ data, imagePath, banner }) {
  const selectedData = data.slice(0, 4);

  return (
    <Container className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 py-24 ">
        {/* Left Column */}
        <div className="h-full">
          <div className="relative w-full  group overflow-hidden">
            <Link
              href={`/${sanitizeUrl(selectedData[0]?.title)}`}
              className="aspect-[5/4]"
              title={banner?.value?.title}
            >
              <Image
                src={`${imagePath}/${banner?.file_name}`}
                alt={selectedData[0]?.title}
                title={banner?.value?.title}
                width={1800}
                height={1800}
                priority
                className="h-full w-full object-cover aspect-[5/4] group-hover:scale-105 transition-all duration-300"
              />
            </Link>
            <div className="absolute p-4 left-0 bg-gradient-to-t from-black to-transparent  bottom-0 text-white flex flex-col gap-3">
              <div
                href={`/${sanitizeUrl(selectedData[0]?.title)}`}
                className="text-3xl line-clamp-2 font-montserrat"
              >
                <h1>{banner?.value?.title}</h1>
              </div>

              <p
                href={`/${sanitizeUrl(selectedData[0]?.title)}`}
                className="text-xl line-clamp-2 font-montserrat"
              >
                {banner?.value?.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-1 h-full">
          {/* Top Article */}
          <div className="relative w-full h-1/2 group overflow-hidden">
            <Link
              href={`/${sanitizeUrl(selectedData[1]?.title)}`}
              className="aspect-[5/4]"
              title={selectedData[1]?.title}
            >
              <Image
                src={`${imagePath}/${selectedData[1]?.image}`}
                alt={selectedData[1]?.title}
                title={selectedData[1]?.title}
                width={1800}
                height={1800}
                className="h-full w-full object-cover aspect-[5/2] group-hover:scale-105 transition-all duration-300"
              />
            </Link>
            <div className="absolute bg-gradient-to-t from-black to-transparent p-4 left-0 bottom-0 text-white flex flex-col gap-3">
              <Link
                href={`/category/${selectedData[1]?.article_category}`}
                className="group-hover:bg-primary transition-all duration-300 text-xs font-montserrat w-fit px-2 py-[3px] bg-black text-white font-semibold"
              title={selectedData[1]?.article_category}
              >
                {selectedData[1]?.article_category}
              </Link>
              <Link
                href={`/${sanitizeUrl(selectedData[1]?.title)}`}
                className="text-2xl line-clamp-2 leading-7 font-montserrat"
                title={selectedData[1]?.title}
              >
                <h3>{selectedData[1]?.title}</h3>
              </Link>
              <div className="flex flex-row gap-2">
                <p className="text-xs font-montserrat font-semibold">
                  {selectedData[1]?.author}&nbsp;&nbsp;-
                </p>
                <p className="text-xs font-montserrat">
                  {selectedData[1]?.published_at}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Two Articles */}
          <div className="flex flex-row gap-1 h-1/2">
            <div className="relative w-1/2 group overflow-hidden">
              <Link
                href={`/${sanitizeUrl(selectedData[2]?.title)}`}
                className="aspect-[5/4]"
                title={selectedData[2]?.title}
              >
                <Image
                  src={`${imagePath}/${selectedData[2]?.image}`}
                  alt={selectedData[2]?.title}
                  title={selectedData[2]?.title}
                  width={1800}
                  height={1800}
                  className="h-full w-full object-cover aspect-[5/4] group-hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="absolute bg-gradient-to-t from-black to-transparent p-4 left-0 bottom-0 text-white flex flex-col gap-3">
                <Link
                  href={`/category/${selectedData[2]?.article_category}`}
                  className="group-hover:bg-primary transition-all duration-300 text-xs font-montserrat w-fit px-2 py-[3px] bg-black text-white font-semibold"
                 title={selectedData[2]?.article_category}
               >
                  {selectedData[2]?.article_category}
                </Link>
                <Link
                  href={`/${sanitizeUrl(selectedData[2]?.title)}`}
                  className="text-xl line-clamp-2 leading-5 font-montserrat"
                  title={selectedData[2]?.title}
             >
                  <h3>{selectedData[2]?.title}</h3>
                </Link>
                <div className="flex flex-row gap-2">
                  <p className="text-xs font-montserrat font-semibold">
                    {selectedData[2]?.author}&nbsp;&nbsp;-
                  </p>
                  <p className="text-xs font-montserrat">
                    {selectedData[2]?.published_at}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-1/2 group overflow-hidden">
              <Link
                href={`/${sanitizeUrl(selectedData[3]?.title)}`}
                className="aspect-[5/4]"
                title={selectedData[3]?.title}
              >
                <Image
                  src={`${imagePath}/${selectedData[3]?.image}`}
                  alt={selectedData[3]?.title}
                  title={selectedData[3]?.title}
                  width={1800}
                  height={1800}
                  className="h-full w-full object-cover aspect-[5/4] group-hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="absolute bg-gradient-to-t from-black to-transparent p-4 left-0 bottom-0 text-white flex flex-col gap-3">
                <Link
                  href={`/category/${selectedData[3]?.article_category}`}
                  className="group-hover:bg-primary transition-all duration-300 text-xs font-montserrat w-fit px-2 py-[3px] bg-black text-white font-semibold"
                  title={selectedData[3]?.article_category}
               >
                  {selectedData[3]?.article_category}
                </Link>
                <Link
                  href={`/${sanitizeUrl(selectedData[3]?.title)}`}
                  className="text-xl line-clamp-2 leading-[22px] font-montserrat"
                  title={selectedData[3]?.title}
                >
                  {selectedData[3]?.title}
                </Link>
                <div className="flex flex-row gap-2">
                  <p className="text-xs font-montserrat font-semibold">
                    {selectedData[3]?.author}&nbsp;&nbsp;-
                  </p>
                  <p className="text-xs font-montserrat">
                    {selectedData[3]?.published_at}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
