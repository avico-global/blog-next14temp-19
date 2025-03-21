import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sanitizeUrl } from "../../../lib/myFun";

export default function LatestBlog({ data, imagePath }) {
  const lifeStyle = data?.slice(0, 2);
  const lifeStyle2 = data?.slice(2, 6);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start border-b-2 mb-3 border-tertiary">
        <h2 className="text-sm text-white py-1 bg-tertiary px-2 uppercase font-montserrat ">
          Latest Blog
        </h2>
      </div>
      <div className="pb-4">
        <Cardflexcol selectedData={lifeStyle} imagePath={imagePath} />
      </div>
      <div className="">
        <Cardflexrow dontmiss={lifeStyle2} imagePath={imagePath} />
      </div>
    </div>
  );
}

function Cardflexcol({ selectedData, imagePath }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-12  ">
      {selectedData.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 group">
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
              className="text-[10px] px-1 text-white py-[2px] bg-quinary hover:bg-tertiary transition-all duration-300 font-montserrat absolute bottom-0 left-0"
              title={item?.article_category}
           
           >
              {item.article_category}
            </Link>
          </div>
          <h3
            href={`/${sanitizeUrl(item?.title)}`}
            className="text-base md:text-[21px] leading-6 group-hover:text-tertiary transition-all duration-300 font-montserrat"
          >
            {item.title}
          </h3>
          <div className="flex flex-row gap-2">
            <p className="text-xs font-montserrat font-semibold">
              {item.author}&nbsp;&nbsp;-
            </p>
            <p className="text-xs font-montserrat text-gray-500">
              {item.published_at}
            </p>
          </div>
          <p className="text-sm font-montserrat text-gray-500">
            {item.tagline}
          </p>
        </div>
      ))}
    </div>
  );
}

function Cardflexrow({ dontmiss, imagePath }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 ">
      {dontmiss?.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 group">
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
              className="w-full col-span-1 h-full object-cover aspect-[12/8.5]"
            />
          </Link>
          <div className="flex col-span-2 flex-col gap-2">
            <Link
              href={`/${sanitizeUrl(item?.title)}`}
             className="text-sm md:text-[15px] line-clamp-3 leading-5 group-hover:text-tertiary transition-all duration-300 font-montserrat"
             title={item?.title} 
           >
              <h3>{item.title}</h3>
            </Link>

            <p className="text-xs font-montserrat text-gray-500">
              {item.published_at}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
