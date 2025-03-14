import FullContainer from "./FullContainer";
import Container from "./Container";
import Image from "next/image";
import { sanitizeUrl } from "../../lib/myFun";
import Link from "next/link";
import Logo from "./Logo";
import footer from "../../public/images/footer.jpeg";

export default function Footer({ categories, logo, imagePath, blog_list }) {
  const hoverme = `relative text-md font-semibold transition-all duration-300 
  after:content-[''] after:absolute after:-bottom-[2px] after:left-0 cursor-pointer 
  after:w-0 after:h-[2px] after:bg-white 
  after:transition-all after:duration-300 
  hover:text-primary hover:after:w-full`;

  // Get latest posts for Editor Picks
  const editorPicks = blog_list?.slice(0, 3) || [];

  // Get popular posts
  const popularPosts =
    blog_list?.filter((post) => post.isPopular)?.slice(0, 3) || [];

  function countArticlesByCategory(blog_list) {
    return blog_list.reduce((acc, article) => {
      const category = article.article_category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
  }
  const articleCount = countArticlesByCategory(blog_list);

  return (
    <FullContainer className="bg-[#111111]/90 py-16 relative">
      <Image
        src={footer}
        alt="footer"
        title="Footer"
        className="absolute -z-20 top-0 left-0 w-full h-full object-cover"
      />
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Quick Links - New Section */}
        <div>
          <h2 className="text-white text-xl font-montserrat mb-6 uppercase">
            QUICK LINKS
          </h2>
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-gray-300 text-sm hover:text-primary transition-colors duration-300"
              title="Home"
            >
              Home
            </Link>
            <Link
              href="/about_us"
              className="text-gray-300 text-sm hover:text-primary transition-colors duration-300"
              title="About"
            >
              About
            </Link>
            <Link
              href="/contact_us"
              className="text-gray-300 text-sm hover:text-primary transition-colors duration-300"
              title="Contact"
            >
              Contact
            </Link>
         
          </div>
        </div>

        {/* Editor Picks */}
        <div>
          <h2 className="text-white text-xl font-montserrat mb-6 uppercase">
            EDITOR PICKS
          </h2>
          <div className="flex flex-col gap-6">
            {editorPicks.map((post, index) => (
              <Link 
              href={`/${sanitizeUrl(post?.title)}`} key={index}
              title={post?.title}
              >
                <div className=" gap-4 group grid grid-cols-3">
                  <div className="w-full col-span-1  overflow-hidden aspect-[12/8.5]">
                    <Image
                      src={`${imagePath}/${post?.image}`}
                      alt={post.title}
                      title={post.title}
                      width={400}
                      height={400}
                      className="w-full  h-full object-cover aspect-[12/8.5]"
                    />
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-white text-sm font-montserrat line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post?.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-2">
                      {post?.published_at}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Posts */}
        <div>
          <h2 className="text-white text-xl font-montserrat mb-6 uppercase">
            POPULAR POSTS
          </h2>
          <div className="flex flex-col gap-6">
            {popularPosts.map((post, index) => (
              <Link
               href={`/${sanitizeUrl(post?.title)}`} key={index}
               title={post?.title}
               >
                <div className="grid grid-cols-3 gap-4 group">
                  <div className="w-full col-span-1 overflow-hidden aspect-[12/8.5]">
                    <Image
                      src={`${imagePath}/${post?.image}`}
                      alt={post.title}
                      title={post.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover aspect-[12/8.5]"
                    />
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-white text-sm font-montserrat line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post?.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-2">
                      {post?.published_at}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div>
          <h2 className="text-white text-xl font-montserrat mb-6 uppercase">
            POPULAR CATEGORY
          </h2>
          <div className="flex flex-col gap-3">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/category/${sanitizeUrl(category?.title)}`}
                className="flex items-center justify-between group"
                title={category?.title}
              >
                <span className="text-gray-300 text-sm group-hover:text-primary transition-colors duration-300">
                  {category?.title}
                </span>
                <span className="text-gray-400 text-xs">
                  {articleCount[category?.title] || 0}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
