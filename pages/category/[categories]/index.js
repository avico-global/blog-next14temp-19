import React from "react";
import CategoryBanner from "@/components/container/CategoryBanner";
import banner from "@/public/images/catbanner.jpg";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Container from "@/components/common/Container";
import Image from "next/image";
import Slider from "../../../components/container/Slider";
import Link from "next/link";
import { useRouter } from "next/router";
import BreadCrumb from "@/components/container/BreadCrumb";
import Head from "next/head";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Rightbar from "@/components/container/Rightbar";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";

export default function index({
  logo,
  categories,
  imagePath,
  blog_list,
  project_id,
  meta,
  domain,
  about_me,
}) {
  const router = useRouter();
  const { categoryname } = router.query;

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`http://${domain}`} />
        <link rel="publisher" href={`http://${domain}`} />
        <link rel="canonical" href={`http://${domain}`} />
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
      </Head>
      <Navbar
        logo={logo}
        categories={categories}
        imagePath={imagePath}
        blog_list={blog_list}
        project_id={project_id}
      />
      <CategoryBanner
        blog_list={blog_list}
        image={`${imagePath}/${banner?.file_name}`}
        imagePath={imagePath}
        data={categories}
      />
      <Container className="flex flex-col pt-20 gap-12">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12">
          <div className="col-span-2 pb-12">
            <Cardflexrow data={blog_list} imagePath={imagePath} />
          </div>
          <div className="col-span-1">
            <Rightbar
              blog_list={blog_list}
              aboutme={about_me}
              imagePath={imagePath}
              project_id={project_id}
            />
          </div>
        </div>
        <NextCategory
          findcategory={categories}
          data={blog_list}
          imagePath={imagePath}
          project_id={project_id}
        />
      </Container>
      <Footer
        logo={logo}
        categories={categories}
        imagePath={imagePath}
        blog_list={blog_list}
      />
    </div>
  );
}

function Cardflexrow({ data, imagePath }) {
  const router = useRouter();
  const { categories } = router.query;
  const selectedCategory = data?.filter(
    (item) =>
      item.article_category?.replace(/\s+/g, "-").toLowerCase() ===
      categories?.toLowerCase()
  );

  return (
    <>
      <div className="flex items-start border-b-2 mb-7 border-quinary">
        <h1 className="text-sm text-white py-1 bg-quinary px-2 uppercase font-montserrat ">
          {categories}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-12  ">
        {selectedCategory.map((item, index) => (
          <div key={index} className={`group flex flex-col gap-4`}>
            <div className="relative overflow-hidden aspect-[12/8.5]">
              <Link href={`/${sanitizeUrl(item?.title)}`}>
                <Image
                  src={`${imagePath}/${item?.image}`}
                  alt={item.title}
                  width={1800}
                  height={1800}
                  className="w-full h-full object-cover aspect-[12/8.5]"
                />
              </Link>
              <Link
                href={`/category/${item.article_category}`}
                className="text-[10px] px-1 text-white py-[2px] bg-quinary hover:bg-primary transition-all duration-300 font-montserrat absolute bottom-0 left-0"
              >
                {item.article_category}
              </Link>
            </div>
            <Link
              href={`/${sanitizeUrl(item?.title)}`}
              className="text-sm md:text-base md:text-[21px] leading-6 line-clamp-2 group-hover:text-primary transition-all duration-300 font-montserrat"
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
        ))}
      </div>
    </>
  );
}

function NextCategory({ findcategory, data, imagePath }) {
  const router = useRouter();
  const { categories } = router.query;

  // Format current category name to match the URL format
  const currentCategory = categories?.toLowerCase().replace(/-/g, ' ');

  // Find the index of the current category
  const currentIndex = findcategory.findIndex(
    (item) => item.title.toLowerCase() === currentCategory
  );

  // Get next category (looping logic)
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % findcategory.length;
  const nextCategory = findcategory[nextIndex];

  // Filter data for the next category
  const nextCategoryData = data.filter(
    (item) => item.article_category.toLowerCase() === nextCategory?.title.toLowerCase()
  );

  // If no categories are found, return null
  if (!nextCategory) return null;

  return (
    <div className="flex flex-col gap-7 pb-12 ">
      <Link
        href={`/category/${sanitizeUrl(nextCategory.title)}`}
        className="flex items-start border-b-2  border-quaternary"
      >
        <h1 className="text-sm py-1 text-white bg-quaternary px-2 uppercase font-montserrat ">
          {nextCategory.title}
        </h1>
      </Link>
      <Slider blog_list={nextCategoryData} imagePath={imagePath} />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, tag: "logo" });
  const project_id = logo?.data[0]?.project_id || null;

  let layoutPages = await callBackendApi({
    domain,
    tag: "layout",
  });

  const meta = await callBackendApi({ domain, tag: "meta_category" });
  const favicon = await callBackendApi({ domain, tag: "favicon" });
  const imagePath = await getImagePath(project_id, domain);
  const categories = await callBackendApi({ domain, tag: "categories" });
  const banner = await callBackendApi({ domain, tag: "banner" });
  const blog_list = await callBackendApi({ domain, tag: "blog_list" });
  const about_me = await callBackendApi({ domain, query, tag: "about_me" });

  return {
    props: {
      logo: logo?.data?.[0] || null,
      meta: meta?.data[0]?.value || null,
      domain,
      imagePath,
      project_id,
      about_me: about_me?.data[0] || null,
      categories: categories?.data[0]?.value || [],
      favicon: favicon?.data?.[0]?.value || null,
      banner: banner?.data[0] || null,
      blog_list: blog_list?.data[0]?.value || [],
    },
  };
}
