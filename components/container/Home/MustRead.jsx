import React from "react";

import Image from "next/image";
import Link from "next/link";
import { sanitizeUrl } from "../../../lib/myFun";
export default function MustRead({ data, imagePath }) {
  const mustread = data?.filter((item) => item.isMustRead === true);
  const selectedData = mustread?.slice(0, 1);
  const dontmiss = mustread?.slice(1, 5);

  return (
    <div className="">
      <div className="flex items-start border-b-2 mb-7 border-secondary">
        <h2 className="text-sm py-1 bg-secondary px-2 uppercase font-montserrat ">
          Must Read
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div className="col-span-1 ">
          <Cardflexcol selectedData={selectedData} imagePath={imagePath} />
        </div>
        <div className="col-span-1">
          <Cardflexrow dontmiss={dontmiss} imagePath={imagePath} />
        </div>
      </div>
    </div>
  );
}



function Cardflexcol({ selectedData, imagePath }) {
  return (
    <div className="flex flex-col gap-3 group">
      {selectedData?.map((item, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="relative overflow-hidden ">
            <Link href={`/${sanitizeUrl(item?.title)}`} title={item?.title}>
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
              className="text-[10px] px-1 text-white py-[2px] bg-quinary hover:bg-secondary hover:text-white transition-all duration-300 font-montserrat absolute bottom-0 left-0"
              title={item?.article_category}
            >
              {item.article_category}
            </Link>
          </div>
          <Link
            href={`/${sanitizeUrl(item?.title)}`}
            className="text-lg md:text-[21px] group-hover:text-secondary transition-all duration-300 font-montserrat"
            title={item?.title}
          >
            {item.title}
          </Link>
          <div className="flex flex-row gap-2">
            <p className="text-xs font-montserrat font-semibold">
              {item.author}&nbsp;&nbsp;-
            </p>
            <p className="text-xs font-montserrat text-gray-500">
              {item.published_at}
            </p>
          </div>
          <p className="text-sm line-clamp-3 font-montserrat text-gray-500">
            {item.tagline}
          </p>
        </div>
      ))}
    </div>
  );
}

function Cardflexrow({ dontmiss, imagePath }) {
  return (
    <div className="flex flex-col gap-7">
      {dontmiss?.map((item, index) => (
        <Link
          href={`/${sanitizeUrl(item?.title)}`}
          key={index}
          className="grid grid-cols-3 gap-4 group"
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

          <div className="flex col-span-2 flex-col gap-2">
            <h3 className="text-sm md:text-[15px] line-clamp-3 leading-5 group-hover:text-secondary transition-all duration-300 font-montserrat">
              {item.title}
            </h3>

            <p className="text-xs font-montserrat text-gray-500">
              {item.published_at}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
