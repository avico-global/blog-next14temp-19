import React from "react";
import Container from "../components/common/Container";
import Navbar from "../components/common/Navbar";
import FullContainer from "../components/common/FullContainer";
import Footer from "../components/common/Footer";
import Head from "next/head";
import GoogleTagManager from "@/lib/GoogleTagManager";

import {
  callBackendApi,
  getDomain,
  getImagePath,
} from "@/lib/myFun";

export default function ContactUs({
  logo,
  categories,
  imagePath,
  blog_list,
  project_id,
  meta,
  domain,
  favicon,
}) {
  return (
    <FullContainer className="bg-secondarydark">
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}`} />
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
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>
      <Navbar
        logo={logo}
        categories={categories}
        imagePath={imagePath}
        blog_list={blog_list}
        project_id={project_id}
      />

      <Container className="flex flex-col gap-10 text-black py-24 max-w-[1200px]">
        <div className="flex items-start border-b-2 border-quinary">
          <h1 className="text-sm text-white py-1 bg-quinary px-2 uppercase font-montserrat ">
            Contact Us
          </h1>
        </div>
        <div className="flex">
          <div className="w-full md:w-full  p-11 border border-gray-300">
            <form className="flex flex-col gap-8 ">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="First Name"
                    className="w-full py-3 px-5 border border-gray-300  bg-secondarydark text-black focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    className="w-full py-3 px-5 border border-gray-300  bg-secondarydark text-black focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full py-3 px-5 border border-gray-300  bg-secondarydark text-black focus:outline-none"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  className="w-full py-3 px-5 border border-gray-300  bg-secondarydark text-black focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-secondarydark border border-gray-300  text-gray-500 px-9 py-3 hover:bg-primary hover:text-white transition-all duration-300 w-fit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Container>
      <Footer
        logo={logo}
        categories={categories}
        imagePath={imagePath}
        blog_list={blog_list}
      />
    </FullContainer>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, tag: "logo" });
  const project_id = logo?.data[0]?.project_id || null;

  let layoutPages = await callBackendApi({
    domain,
    tag: "layout",
  });

  const meta = await callBackendApi({ domain, tag: "meta_contact" });
  const favicon = await callBackendApi({ domain, tag: "favicon" });
  const imagePath = await getImagePath(project_id, domain);
  const categories = await callBackendApi({ domain, tag: "categories" });
  const banner = await callBackendApi({ domain, tag: "banner" });
  const blog_list = await callBackendApi({ domain, tag: "blog_list" });

  return {
    props: {
      logo: logo?.data?.[0] || null,
      meta: meta?.data[0]?.value || null,
      domain,
      project_id,
      imagePath,
      categories: categories?.data[0]?.value || [],
      favicon: favicon?.data?.[0]?.value || null,
      banner: banner?.data[0] || null,
      blog_list: blog_list?.data[0]?.value || [],
      meta: meta?.data[0]?.value || null,
      domain,
      favicon,
    },
  };
}
