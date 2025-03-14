import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sanitizeUrl } from "../../../lib/myFun";
export default function TrendingNow({ data, imagePath }) {
  const trendingnow = data.filter((item) => item.trendingNews);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start border-b-2 mb-3 border-quinary">
        <h2 className="text-sm text-white py-1 bg-quinary px-2 uppercase font-montserrat ">
          Trending Now
        </h2>
      </div>
      <Cardflexcol selectedData={trendingnow} imagePath={imagePath} />
    </div>
  );
}

function Cardflexcol({ selectedData, imagePath }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-12  ">
      {selectedData.map((item, index) => (
        <div
          key={index}
          className={`${
            index === 0 ? "col-span-2" : ""
          } flex flex-col gap-2 group`}
        >
          <div className="relative overflow-hidden aspect-[12/8.5]">
            <Link
             href={`/${sanitizeUrl(item?.title)}`}
             title={item?.title}
             >
              <Image
                src={`${imagePath}/${item?.image}`}
                alt={item.title}
                title={item?.title}
                width={1800}
                height={1800}
                className="w-full h-full object-cover aspect-[12/8.5]"
              />
            </Link>
            <Link
              href={`/category/${item.article_category}`}
              className="text-[10px] px-1 text-white py-[2px] bg-quinary hover:bg-primary transition-all duration-300 font-montserrat absolute bottom-0 left-0"
              title={item?.article_category}
          >
              {item.article_category}
            </Link>
          </div>
          <Link
            href={`/${sanitizeUrl(item?.title)}`}
            className="text-base md:text-[21px] leading-6 group-hover:text-primary transition-all duration-300 font-montserrat"
            title={item?.title}
        >
            <h3>{item.title}</h3>
          </Link>
          <div className="flex flex-row gap-2">
            <p className="text-xs font-montserrat font-semibold">
              {item.author}&nbsp;&nbsp;-
            </p>
            <p className="text-xs font-montserrat text-gray-500">
              {item.published_at}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
