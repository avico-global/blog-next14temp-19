import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Navbar from "@/components/common/Navbar";
import Banner from "@/components/container/Banner";
import Image from "next/image";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import Link from "next/link";
import GoogleTagManager from "@/lib/GoogleTagManager";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
// import Popular from "@/components/container/Popular";
import MustRead from "@/components/container/MustRead";
import Popular from "@/components/container/Home/Popular";
import LatestBlog from "@/components/container/Home/LatestBlog";
import ShowoneCategory from "@/components/container/Home/ShowoneCategory";
import TrendingNow from "@/components/container/Home/TrendingNow";
import Rightbar from "@/components/container/Rightbar";
export default function Home({
  logo,
  meta,
  domain,
  imagePath,
  favicon,
  categories,
  banner,
  project_id,
  blog_list,
  about_me,
}) {

 

 const firstcategorydata = blog_list?.filter(
  (item) => item?.article_category === categories[0]?.title
 );

 const latestBlogs = blog_list.slice(-7, blog_list.length - 1);


  return (
    <div>
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
          href={`${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${imagePath}/${favicon}`}
        />
      </Head>
      <FullContainer className="">
        <Navbar
          logo={logo}
          categories={categories}
          imagePath={imagePath}
          blog_list={blog_list}
          project_id={project_id}
        />

        <MustRead data={blog_list} imagePath={imagePath} />

        <Container className="grid grid-cols-1 md:grid-cols-3 md:gap-12 pb-12 ">
          <div className="col-span-2 flex flex-col gap-12">
            <Popular data={blog_list} imagePath={imagePath} />
            <LatestBlog data={latestBlogs} imagePath={imagePath} />
            <ShowoneCategory data={firstcategorydata}  imagePath={imagePath} />
            <TrendingNow data={blog_list} imagePath={imagePath} />
          </div>
          <div className="sm:col-span-1">
          
           <Rightbar  blog_list={blog_list} imagePath={imagePath} project_id={project_id} aboutme={about_me}/>
          </div>
        </Container>
        <Footer
          logo={logo}
          categories={categories}
          imagePath={imagePath}
          blog_list={blog_list}
        />
      </FullContainer>
    </div>
  );
}



export async function getServerSideProps({ req,query }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, tag: "logo" });
  const project_id = logo?.data?.[0]?.project_id || null;

  let layoutPages = await callBackendApi({
    domain,
    tag: "layout",
  });

  const meta = await callBackendApi({ domain, tag: "meta_home" });
  const favicon = await callBackendApi({ domain, tag: "favicon" });
  const imagePath = await getImagePath(project_id, domain);
  const categories = await callBackendApi({ domain, tag: "categories" });
  const banner = await callBackendApi({ domain, tag: "banner" });
  const blog_list = await callBackendApi({ domain, tag: "blog_list" });
  const about_me = await callBackendApi({ domain, query, tag: "about_me" });
  return {
    props: {
      logo: logo?.data?.[0] || null,
      project_id,
      meta: meta?.data?.[0]?.value || null,
      about_me: about_me?.data?.[0] || null,
      domain,
      imagePath,
      categories: categories?.data?.[0]?.value || [],
      favicon: favicon?.data?.[0]?.value || null,
      banner: banner?.data?.[0] || null,
      blog_list: blog_list?.data?.[0]?.value || [],
    },
  };
}
