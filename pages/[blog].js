import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Banner from "@/components/container/Banner";
import Slider from "../components/container/Slider";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import Container from "@/components/common/Container";
import BreadCrumb from "@/components/container/BreadCrumb";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import MarkdownIt from "markdown-it";
import Rightbar from "@/components/container/Rightbar";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
import Head from "next/head";
import GoogleTagManager from "@/lib/GoogleTagManager";

export default function blog({
  categories,
  logo,
  imagePath,
  banner,
  blog_list,
  my_blog,
  meta,
  isValidBlog,
  project_id,
  categoryExists,
  about_me,
  domain,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(
    my_blog?.value?.articleContent?.replaceAll(
      `https://api.sitebuilderz.com/images/project_images/${project_id}/`,
      imagePath
    ) || ""
  );

  const relatedarticle = blog_list.filter(
    (item) => item.article_category === my_blog?.value?.article_category
  );
  const relatedfiltered = relatedarticle.filter(
    (item) => item.title !== my_blog?.value?.title
  );

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>{my_blog?.value?.meta_title}</title>
        <meta name="description" content={my_blog?.value?.meta_description} />
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
        project_id={project_id}
        blog_list={blog_list}
        imagePath="imagePath"
      />
      <div className="pt-16">
        <SingleBlog
          content={content}
          blog_list={blog_list}
          imagePath={imagePath}
          categories={categories}
          my_blog={my_blog}
          project_id={project_id}
          about_me={about_me}
        />
      </div>
      <Container className="pb-12">
        <div className="flex items-start border-b-2 mb-7 border-tertiary">
          <h1 className="text-sm text-white py-1 bg-tertiary px-2 uppercase font-montserrat ">
            Related Articles
          </h1>
        </div>
        <Slider blog_list={relatedfiltered} imagePath={imagePath} />
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

function SingleBlog({
  blog_list,
  imagePath,
  categories,
  my_blog,
  content,
  project_id,
  about_me,
}) {
 
  return (
    <Container className="py-6">
      <div className="relative grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-0 justify-between max-w-[1100px] mx-auto">
        <div className="col-span-2 flex flex-col gap-6">
          <div className="text-xl md:text-2xl font-montserrat font-bold">
            {my_blog?.value?.title}
          </div>
          <div className="text-sm md:text-lg text-gray-800 font-montserrat italic">
            {my_blog?.value?.tagline}
          </div>
          <Image
            src={`${imagePath}/${my_blog?.file_name}`}
            width={1500}
            height={1500}
            alt="banner"
            priority
            className=""
          />
          <h1 className="prose lg:prose-base font-montserrat ">
            {" "}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </h1>
        </div>
        <div className="col-span-1 relative">
          <Rightbar
            aboutme={about_me}
            project_id={project_id}
            blog_list={blog_list}
            imagePath={imagePath}
          />
        </div>
      </div>
    </Container>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { blog } = query;

  const categories = await callBackendApi({ domain, tag: "categories" });
  const blog_list = await callBackendApi({ domain, tag: "blog_list" });

  const isValidBlog = blog_list?.data[0]?.value?.find(
    (item) => sanitizeUrl(item.title) === sanitizeUrl(blog)
  );

  if (!isValidBlog) {
    return {
      notFound: true,
    };
  }

  const my_blog = await callBackendApi({ domain, tag: isValidBlog?.key });
  const meta = await callBackendApi({ domain, tag: "meta_blog" });
  const tag_list = await callBackendApi({ domain, tag: "tag_list" });
  const logo = await callBackendApi({ domain, tag: "logo" });
  const favicon = await callBackendApi({ domain, tag: "favicon" });
  const about_me = await callBackendApi({ domain, tag: "about_me" });
  const contact_details = await callBackendApi({
    domain,
    tag: "contact_details",
  });
  const layout = await callBackendApi({ domain, tag: "layout" });
  const nav_type = await callBackendApi({ domain, tag: "nav_type" });
  const blog_type = await callBackendApi({ domain, tag: "blog_type" });
  const footer_type = await callBackendApi({ domain, tag: "footer_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      meta: meta?.data[0]?.value || null,
      my_blog: my_blog?.data[0] || {},
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      categories: categories?.data[0]?.value || [],
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
      blog_type: blog_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
      project_id,
    },
  };
}
