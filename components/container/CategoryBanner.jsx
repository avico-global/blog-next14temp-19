import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { sanitizeUrl } from "../../lib/myFun";
import Link from "next/link";
import FullContainer from "../common/FullContainer";
import Breadcrumb from "../container/BreadCrumb";
import Container from "../common/Container";
export default function CategoryBanner({ data, blog_list = [], imagePath }) {
  const router = useRouter();
  const { categories } = router.query;
  const celectedbanner = data?.filter(
    (item) =>
      item.title?.replace(/\s+/g, "-").toLowerCase() ===
      categories?.toLowerCase()
  );
  const selectedCategory = blog_list?.filter(
    (item) =>
      item.title?.replace(/\s+/g, "-").toLowerCase() ===
      data?.title?.toLowerCase()
  );

  const selectedData = selectedCategory.slice(0, 5);
  return (
    <FullContainer>
      <div className="relative h-[80vh] sm:h-[50vh] md:h-[500px]  ">
        <div className=" bg-black/60  absolute top-0 left-0 w-full h-full " />
        <Image
          src={`${imagePath}/${celectedbanner[0]?.image}`}
          title={celectedbanner[0]?.title}
          alt={celectedbanner[0]?.title}
          width={1800}
          height={1800}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute flex flex-col   top-0 pt-12  left-0 w-full  h-[80vh] sm:h-[50vh] md:h-[500px] ">
        <div className="">
          <Breadcrumb  className="  text-white" />
        </div>
        <h1 className="text-white text-4xl h-full pt-32 text-center  font-bold">
          {celectedbanner[0]?.title}
        </h1>
      </div>
    </FullContainer>
  );
}
