import React, { useState, useEffect, useRef } from "react";
import Container from "./Container";
import FullContainer from "./FullContainer";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { sanitizeUrl } from "../../lib/myFun";
import Logo from "./Logo";
import { useRouter } from "next/router";
import CategorySlider from "../container/CategorySlider";
import Image from "next/image";
import MobileNavbarimage from "../../public/images/mobile-bg.jpg";
export default function Navbar({
  logo,
  categories,
  imagePath,
  blog_list,
  project_id,
}) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    const handleScroll = () => {
      // Only handle scroll for screens larger than mobile
      if (window.innerWidth >= 768) {
        // 768px is Tailwind's 'md' breakpoint
        const currentScrollPos = window.scrollY;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchToggle = () => {
    setOpenSearch((prev) => !prev);
    if (!openSearch) {
      setSearchQuery("");
    }
  };

  const filteredBlogs = blog_list?.filter((item) =>
    item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const hoverme = `relative text-md font-semibold transition-all duration-300 
  after:content-[''] after:absolute after:-bottom-[2px] after:left-1/2 after:-translate-x-1/2 cursor-pointer 
  after:w-0 after:h-[3px] after:bg-primary 
  after:transition-all after:duration-300 h-full text-center 
  hover:after:left-0 hover:after:translate-x-0`;

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <FullContainer
        className={`border-b border-gray-200 fixed top-0 left-0 right-0 bg-black md:bg-white z-40
          md:transition-transform md:duration-700 h-14
          ${visible ? "translate-y-0" : "md:-translate-y-full"}`}
      >
        <Container className="h-full relative max-w-6xl lg:px-8">
          <div className="flex flex-row h-full justify-between items-center">
            <div className="flex  flex-row font-montserrat font-semibold text-md h-full items-center">
              <Link
                href="/"
                className="text-xl hidden md:block  md:text-2xl text-black font-bold font-montserrat uppercase pr-4"
              >
                coney
                {/* <Logo logo={logo} imagePath={imagePath} /> */}
              </Link>
              <button
                onClick={toggleSidebar}
                className=" md:hidden   text-black transition-colors"
              >
                <Menu className="w-8 h-8 md:w-5 md:h-5 text-white md:text-black " />
              </button>
              <div
                className={`h-full hidden md:flex  px-3  items-center justify-center ${
                  pathname === "/" ? "after:w-full" : "hover:after:w-full"
                } ${hoverme}`}
              >
                <Link className={``} href="/">
                  Home
                </Link>
              </div>

              <div
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="h-full hidden md:flex"
              >
                <div
                  className={`h-full px-3 flex items-center relative ${
                    pathname === "/category"
                      ? "after:w-full "
                      : " hover:after:w-full"
                  } ${hoverme}`}
                >
                  <div>Category</div>
                </div>

                {isDropdownOpen && (
                  <Container className="max-w-7xl lg:px-8 fixed top-[56px] left-0 !px-[0px] right-0 bg-white border-red-900 z-30 shadow-lg">
                    <Dropdown
                      categories={categories}
                      blog_list={blog_list}
                      imagePath={imagePath}
                    />
                  </Container>
                )}
              </div>

              <div
                className={`h-full px-3 hidden md:flex items-center justify-center ${
                  pathname === "/about_us"
                    ? "after:w-full "
                    : "hover:after:w-full"
                } ${hoverme}`}
              >
                <Link href="/about_us">About</Link>
              </div>
              <div
                className={`h-full px-3 hidden md:flex items-center justify-center ${
                  pathname === "/contact_us"
                    ? "after:w-full "
                    : "hover:after:w-full"
                } ${hoverme}`}
              >
                <Link className={` hidden md:block`} href="/contact_us">
                  Contact
                </Link>
              </div>
            </div>

            <div className="text-3xl !w-fit md:hidden md:text-2xl text-white font-bold font-montserrat uppercase">
              {/* <Logo logo={logo} imagePath={imagePath} /> */}coney
            </div>

            <div className="flex flex-row gap-4">
              <div
                ref={searchRef}
                className={`relative transition-all duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="absolute right-0 top-[44px] bg-white shadow-lg">
                  <div className="flex items-center px-6 py-8 border-b border- border-gray-100">
                    <div className="flex items-center px-2 pt-3 border-b border-gray-300 gap-2">
                      <input
                        value={searchQuery}
                        onChange={handleSearchChange}
                        type="text"
                        placeholder="|"
                        className="w-[400px] text-base outline-none"
                      />
                      <div
                        onClick={toggleSearch}
                        className="text-sm cursor-pointer font-montserrat"
                      >
                        Search{" "}
                      </div>
                    </div>
                  </div>
                  {searchQuery && (
                    <div className="py-2 max-h-[400px] overflow-y-auto">
                      {filteredBlogs?.map((item, index) => (
                        <Link
                          title={item.title || "SearchQuery"}
                          key={index}
                          href={
                            project_id
                              ? `/{item.key}?${project_id}kkk`
                              : `/${sanitizeUrl(item?.title)}`
                          }
                        >
                          <div className="px-6 py-2 hover:bg-gray-50 transition-colors">
                            {item.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={isMobileView ? toggleMobileSearch : toggleSearch}
                className="p-[6px] text-black hover:opacity-70 transition-opacity"
              >
                <Search className="w-8 h-8 md:w-5 md:h-5 text-white md:text-black" />
              </button>
            </div>
          </div>
        </Container>
      </FullContainer>

      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-50 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black/90 z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full relative">
          <div className="absolute top-0  -z-10  w-full h-full object-cover items-center">
            <Image
              src={MobileNavbarimage}
              alt="logo"
              height={1800}
              width={1800}
              className="object-cover object-center  h-screen"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white font-montserrat">
                Menu
              </h2>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <h3 className="text-sm text-white uppercase">Navigation</h3>
                <nav className="flex flex-col text-gray-400 gap-3">
                  <Link
                    href="/"
                    className={`${hoverme} w-fit`}
                    onClick={toggleSidebar}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about_us"
                    className={`${hoverme} w-fit`}
                    onClick={toggleSidebar}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact_us"
                    className={`${hoverme} w-fit`}
                    onClick={toggleSidebar}
                  >
                    Contact
                  </Link>
                </nav>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm text-white uppercase">Categories</h3>
                <nav className="flex flex-col gap-3">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/category/${sanitizeUrl(category?.title)}`}
                      className={`${hoverme} text-gray-400 w-fit`}
                      onClick={toggleSidebar}
                    >
                      {category?.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-50 md:hidden ${
          isMobileSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileSearch}
      />

      {/* Mobile Search Sidebar */}
      <div
        className={`fixed  top-0 right-0 h-full w-full bg-black/50 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundImage: `url(${MobileNavbarimage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
      
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white font-montserrat">
              Search
            </h2>
            <button
              onClick={toggleMobileSearch}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex items-center border-b px-4 py-2  bg-white border-gray-300">
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              type="text"
              placeholder="Search..."
              className="w-full py-2 outline-none text-base mb-3 border-b border-gray-300 font-montserrat"
            />
            <Search className="w-5 h-5 text-gray-400" />
          </div>

          {searchQuery && (
            <div className=" bg-white px-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {filteredBlogs?.map((item, index) => (
                <Link
                  key={index}
                  href={`/${sanitizeUrl(item?.title)}`}
                  onClick={toggleMobileSearch}
                >
                  <div className="py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <h3 className="text-black font-montserrat line-clamp-2">
                      {item?.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {item?.published_at}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Dropdown({ categories, blog_list, imagePath }) {
  const hoverme = `relative text-md font-semibold transition-all duration-300 
    after:content-[''] after:absolute after:-bottom-[2px] after:left-1/2 after:-translate-x-1/2 cursor-pointer 
    after:w-0 after:h-[3px] after:bg-primary pb-2 
    after:transition-all after:duration-300 
    hover:after:w-full hover:after:left-0 hover:after:translate-x-0`;

  return (
    <div className="flex pl-8 pr-4 py-5 flex-row gap-5 border">
      <div className="space-y-4  border-r border-gray-200 pr-4">
        {categories.map((category, index) => (
          <div key={index} className={`${hoverme} w-fit`}>
            <Link
              className="block w-fit"
              href={`/category/${sanitizeUrl(category?.title)}`}
            >
              {category?.title}
            </Link>
          </div>
        ))}
      </div>
      <div className=" ">
        <CategorySlider blog_list={blog_list} imagePath={imagePath} />
      </div>
    </div>
  );
}

function MobileNavbar() {
  return (
    <div>
      <h1>MobileNavbar</h1>
    </div>
  );
}
