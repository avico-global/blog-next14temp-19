import React from "react";
import Image from "next/image";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import { sanitizeUrl } from "../../lib/myFun";
export default function Rightbar({
  blog_list,
  aboutme,
  imagePath,
  project_id,
  className,
}) {
  const featuredArticle = blog_list.filter((item) => item.isFeatured);
  const editorPick = blog_list.slice(-4);
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(
    aboutme?.value?.replaceAll(
      `https://api.sitebuilderz.com/images/project_images/${project_id}/`,
      imagePath
    ) || ""
  );
  return (
    <div className="sticky top-5 pt-14 ">
      <div className="flex items-start border-b-2 mb-7 border-quinary">
        <h1 className="text-sm text-white py-1 bg-quinary px-2 uppercase font-montserrat ">
          Featured Article
        </h1>
      </div>
      <div className="grid grid-cols-1  pb-7 gap-4">
        {featuredArticle.map((item, index) => (
          <Cardflexcol key={index} item={item} imagePath={imagePath} />
        ))}
      </div>
      <div className={className}>
        <Aboutme data={aboutme} imagePath={imagePath} content={content} />
      </div>
      <div className="flex items-start border-b-2 mb-7 border-quinary">
        <h1 className="text-sm text-white py-1 bg-quinary px-2 uppercase font-montserrat ">
          Editor's Pick
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {editorPick.map((item, index) => (
          <Cardflexcol key={index} item={item} imagePath={imagePath} />
        ))}
      </div>
    </div>
  );
}

function Cardflexcol({ item, imagePath }) {
  return (
    <>
      <div className="flex flex-col gap-2 group">
        <div className="relative overflow-hidden aspect-[12/8.5]">
          <Link href={`/${sanitizeUrl(item?.title)}`}>
            <Image
              priority
              src={`${imagePath}/${item?.image}`}
              alt={item.title}
              width={1800}
              height={1800}
              className="w-full h-full object-cover aspect-[12/8.5]"
            />
          </Link>
          <Link
            href={`/category/${item.article_category}`}
            className="text-[10px] px-1 text-white py-[2px] bg-quinary hover:bg-tertiary transition-all duration-300 font-montserrat absolute bottom-0 left-0"
          >
            {item.article_category}
          </Link>
        </div>
        <Link
          href={`/${sanitizeUrl(item?.title)}`}
          className="text-sm leading-4 line-clamp-2 group-hover:text-tertiary transition-all duration-300 font-montserrat"
        >
          {item.title}
        </Link>
        <div className="flex flex-row gap-2">
          <h2 className="text-xs font-montserrat font-semibold">
            {item.author}&nbsp;&nbsp;-
          </h2>
          <h2 className="text-xs font-montserrat text-gray-500">
            {item.published_at}
          </h2>
        </div>
      </div>
    </>
  );
}

function Aboutme({ data, imagePath, content }) {
  return (
    <Link
      href="/about_us"
      className="flex flex-col gap-2 pb-6 mb-6 border-b border-quinary group items-center justify-center"
    >
      <div className="relative group overflow-hidden aspect-[7/6 ]">
        <Image
          src={`${imagePath}/${data?.file_name}`}
          alt={data?.title || "About Me"}
          width={1800}
          height={1800}
          className="w-full h-full object-cover  aspect-[7/6] pb-5 px-5"
        />
      </div>
      <h2 className="text-sm leading-4 line-clamp-4 text-center group-hover:text-primary transition-all duration-300 font-montserrat">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </h2>
      <div className="text-sm leading-4 line-clamp-2 text-center w-fit px-2 py-1 text-white hover:bg-primary bg-black transition-all duration-300 font-montserrat">
        Read More
      </div>
    </Link>
  );
}
