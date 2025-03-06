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
            <Link href={`/${sanitizeUrl(selectedData[0]?.title)}`} className="aspect-[5/4]">
              <Image
                src={`${imagePath}/${banner?.file_name}`}
                alt={selectedData[0]?.title}
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
                {banner?.value?.title}
              </div>
              <div
                href={`/${sanitizeUrl(selectedData[0]?.title)}`}
                className="text-xl line-clamp-2 font-montserrat"
              >
                {banner?.value?.tagline}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-1 h-full">
          {/* Top Article */}
          <div className="relative w-full h-1/2 group overflow-hidden">
            <Link href={`/${sanitizeUrl(selectedData[1]?.title)}`} className="aspect-[5/4]">
              <Image
                src={`${imagePath}/${selectedData[1]?.image}`}
                alt={selectedData[1]?.title}
                width={1800}
                height={1800}
                className="h-full w-full object-cover aspect-[5/2] group-hover:scale-105 transition-all duration-300"
              />
            </Link>
            <div className="absolute bg-gradient-to-t from-black to-transparent p-4 left-0 bottom-0 text-white flex flex-col gap-3">
              <Link
                href={`/category/${selectedData[1]?.article_category}`}
                className="group-hover:bg-primary transition-all duration-300 text-xs font-montserrat w-fit px-2 py-[3px] bg-black text-white font-semibold"
              >
                {selectedData[1]?.article_category}
              </Link>
              <Link
                href={`/${sanitizeUrl(selectedData[1]?.title)}`}
                className="text-2xl line-clamp-2 leading-7 font-montserrat"
              >
                {selectedData[1]?.title}
              </Link>
              <div className="flex flex-row gap-2">
                <h2 className="text-xs font-montserrat font-semibold">
                  {selectedData[1]?.author}&nbsp;&nbsp;-
                </h2>
                <h2 className="text-xs font-montserrat">
                  {selectedData[1]?.published_at}
                </h2>
              </div>
            </div>
          </div>

          {/* Bottom Two Articles */}
          <div className="flex flex-row gap-1 h-1/2">
            {/* Bottom Left */}
            <div className="relative w-1/2 group overflow-hidden">
              <Link href={`/${sanitizeUrl(selectedData[2]?.title)}`} className="aspect-[5/4]">
                <Image
                  src={`${imagePath}/${selectedData[2]?.image}`}
                  alt={selectedData[2]?.title}
                  width={1800}
                  height={1800}
                  className="h-full w-full object-cover aspect-[5/4] group-hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="absolute bg-gradient-to-t from-black to-transparent p-4 left-0 bottom-0 text-white flex flex-col gap-3">
                <Link
                  href={`/category/${selectedData[2]?.article_category}`}
                  className="group-hover:bg-primary transition-all duration-300 text-xs font-montserrat w-fit px-2 py-[3px] bg-black text-white font-semibold"
                >
                  {selectedData[2]?.article_category}
                </Link>
                <Link
                  href={`/${sanitizeUrl(selectedData[2]?.title)}`}
                  className="text-xl line-clamp-2 leading-5 font-montserrat"
                >
                  {selectedData[2]?.title}
                </Link>
                <div className="flex flex-row gap-2">
                  <h2 className="text-xs font-montserrat font-semibold">
                    {selectedData[2]?.author}&nbsp;&nbsp;-
                  </h2>
                  <h2 className="text-xs font-montserrat">
                    {selectedData[2]?.published_at}
                  </h2>
                </div>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="relative w-1/2 group overflow-hidden">
              <Link href={`/${sanitizeUrl(selectedData[3]?.title)}`} className="aspect-[5/4]">
                <Image
                  src={`${imagePath}/${selectedData[3]?.image}`}
                  alt={selectedData[3]?.title}
                  width={1800}
                  height={1800}
                  className="h-full w-full object-cover aspect-[5/4] group-hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="absolute bg-gradient-to-t from-black to-transparent p-4 left-0 bottom-0 text-white flex flex-col gap-3">
                <Link
                  href={`/category/${selectedData[3]?.article_category}`}
                  className="group-hover:bg-primary transition-all duration-300 text-xs font-montserrat w-fit px-2 py-[3px] bg-black text-white font-semibold"
                >
                  {selectedData[3]?.article_category}
                </Link>
                <Link
                  href={`/${sanitizeUrl(selectedData[3]?.title)}`}
                  className="text-xl line-clamp-2 leading-[22px] font-montserrat"
                >
                  {selectedData[3]?.title}
                </Link>
                <div className="flex flex-row gap-2">
                  <h2 className="text-xs font-montserrat font-semibold">
                    {selectedData[3]?.author}&nbsp;&nbsp;-
                  </h2>
                  <h2 className="text-xs font-montserrat">
                    {selectedData[3]?.published_at}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
