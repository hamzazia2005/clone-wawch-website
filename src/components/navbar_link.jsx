"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useAppContext } from "@/context";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const NavbarLinks = ({ navLinks }) => {
  const { lang } = useAppContext();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(-1);

  const localizeLink = (link) => {
    if (
      !link?.includes("/author") &&
      !link?.includes("/blog") &&
      !link?.includes("/resources")
    ) {
      return link === "/"
        ? `/${lang}`
        : link?.[0] === "/"
        ? lang
          ? `/${lang}${link}`
          : `${lang}${link}`
        : link;
    }
    return link;
  };

  // Active menu index based on pathname 
  useEffect(() => {
    const activeIndex = navLinks?.findIndex((item) => {
      if (item.link) {
        if (item.link === "/" && (pathname === "/" || pathname === `/${params?.lang}`)) {
          return true;
        }
        if (item.link !== "/" && pathname.startsWith(item.link)) {
          return true;
        }
      }

      if (item.links?.some((sub) => {
        if (pathname.startsWith(sub.link)) {
          return true;
        }
        if (sub.links?.some((nested) => pathname.startsWith(nested.link))) {
          return true;
        }
        return false;
      })) {
        return true;
      }
      return false;
    });
    setOpen(activeIndex);
  }, [pathname, params?.lang, navLinks]);

  const scrollToSection = (sectionId, index) => {
    const section = document.getElementById(sectionId);
    const offset = -80;
    if (section) {
      const offsetTop = section.offsetTop + offset;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setOpen(index);
    }
  };

  const handleNavigate = (item, index) => {
    if (
      (pathname === `/${params?.lang}/` || pathname === `/`) &&
      item?.link === "/"
    ) {
      scrollToSection(index.toString(), index);
    } else {
      router.push(item?.link);
      setTimeout(() => {
        scrollToSection(index.toString(), index);
      }, 2000);
    }
    setOpen(index);
  };

  return (
    <div className="flex lg:items-center flex-col lg:flex-row gap-x-8 gap-y-8">
      {navLinks?.map((item, index) => {
        const isActive =
          open === index ||
          (item.link === "/" && (pathname === "/" || pathname === `/${params?.lang}`)) ||
          (item.link && item.link !== "/" && pathname.startsWith(item.link)) ||
          item.links?.some((sub) => {
            if (pathname.startsWith(sub.link)) {
              return true;
            }
            if (sub.links?.some((nested) => pathname.startsWith(nested.link))) {
              return true;
            }
            return false;
          });

        return (
          <div key={index} className="relative group">
              {"links" in item ? (
              <>
                {item.link ? (
                  <Link
                    href={localizeLink(item.link)}
                    className={`cursor-pointer font-medium font-poppins flex items-center gap-1 ${
                      isActive
                        ? "text-secondary font-semibold"
                        : "text-primary hover:text-secondary"
                    }`}
                    onClick={() => handleNavigate(item, index)}
                  >
                    {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </Link>
                ) : (
                  <div
                    className={`cursor-pointer font-medium font-poppins flex items-center gap-1 ${
                      isActive
                        ? "text-secondary font-semibold"
                        : "text-primary hover:text-secondary"
                    }`}
                  >
                    {item.name}
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                )}

                <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-50 min-w-[150px]">
                  {item.links.map((subItem, subIndex) => {
                    const isSubActive = pathname.startsWith(subItem.link) || 
                      subItem.links?.some((nested) => pathname.startsWith(nested.link));
                    
                    if (subItem?.links && subItem?.links?.length > 0) {
                      return (
                        <div key={subIndex} className="relative group/submenu">
                          {subItem.link ? (
                            <Link
                              href={localizeLink(subItem.link)}
                              onClick={() => handleNavigate(subItem, index)}
                              className={`flex items-center justify-between px-4 py-2 text-sm whitespace-nowrap ${
                                isSubActive
                                  ? "text-secondary font-semibold bg-gray-50"
                                  : "text-primary hover:text-secondary hover:bg-gray-100"
                              }`}
                            >
                              {subItem?.name || subItem?.title}
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                          ) : (
                            <div
                              className={`flex items-center justify-between px-4 py-2 text-sm whitespace-nowrap ${
                                isSubActive
                                  ? "text-secondary font-semibold bg-gray-50"
                                  : "text-primary hover:text-secondary hover:bg-gray-100"
                              }`}
                            >
                              {subItem?.name || subItem?.title}
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                          )}
                          <div className="absolute left-full top-0 hidden group-hover/submenu:flex flex-col bg-white shadow-md rounded-md z-50 min-w-[180px] ml-1">
                            {subItem?.links?.map((nestedItem, nestedIndex) => {
                              const isNestedActive = pathname.startsWith(nestedItem.link);
                              return (
                                <Link
                                  key={nestedIndex}
                                  href={localizeLink(nestedItem?.link)}
                                  className={`block px-4 py-2 text-sm whitespace-nowrap ${
                                    isNestedActive
                                      ? "text-secondary font-semibold bg-gray-50"
                                      : "text-primary hover:text-secondary hover:bg-gray-100"
                                  }`}
                                  onClick={() => handleNavigate(nestedItem, index)}
                                >
                                  {nestedItem.title}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <Link
                        key={subIndex}
                        href={localizeLink(subItem.link)}
                        className={`block px-4 py-2 text-sm whitespace-nowrap ${
                          isSubActive
                            ? "text-secondary font-semibold bg-gray-50"
                            : "text-primary hover:text-secondary hover:bg-gray-100"
                        }`}
                        onClick={() => handleNavigate(subItem, index)}
                      >
                        {subItem.title}
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <Link
                href={localizeLink(item.link)}
                className={`${
                  isActive ? "text-secondary font-semibold" : "text-primary"
                } font-medium font-poppins cursor-pointer hover:text-secondary`}
                onClick={() => handleNavigate(item, index)}
              >
                {item?.title}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NavbarLinks;
