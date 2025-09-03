"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useAppContext } from "@/context";
import Link from "next/link";

const NavbarLinks = ({ navLinks }) => {
  const { lang } = useAppContext();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    setOpen(
      pathname === `/${params?.lang}/` || pathname === `/`
        ? 0
        : pathname.includes("/pricing/")
        ? 1
        : pathname.includes("/faqs/")
        ? 2
        : pathname.includes("/features/")
        ? 3
        : pathname.includes("/blog/")
        ? 4
        : pathname.includes("/contact-us/")
        ? 5
        : -1
    );
  }, [pathname, params?.lang]);

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
      {navLinks?.map((item, index) => (
        <div key={index} className="relative group">
          {"links" in item ? (
            <>
              <div className="cursor-pointer text-primary font-medium font-poppins hover:text-secondary flex items-center gap-1">
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
              <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-50 min-w-[150px]">
                {item.links.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={
                      !subItem?.link?.includes("/blog") &&
                      !subItem?.link?.includes("/author")
                        ? subItem?.link === "/"
                          ? `/${lang}`
                          : subItem?.link?.[0] === "/"
                          ? lang?`/${lang}${subItem?.link}`:`${lang}${subItem?.link}`
                          : subItem?.link
                        : subItem?.link
                    }
                    className="block px-4 py-2 text-sm text-primary hover:text-secondary hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => handleNavigate(subItem, index)}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <Link
              href={
                !item?.link?.includes("/author") &&
                !item?.link?.includes("/blog") &&
                !item?.link?.includes("/partner") &&
                !item?.link?.includes("/affiliates")
                  ? item?.link === "/"
                    ? `/${lang}`
                    : item?.link?.[0] === "/"
                    ? lang?`/${lang}${item?.link}`:`${lang}${item?.link}`
                    : item?.link
                  : item?.link
              }
              className={`${
                open === index ? "text-secondary font-semibold" : "text-primary"
              } font-medium font-poppins cursor-pointer hover:text-secondary`}
              onClick={() => handleNavigate(item, index)}
            >
              {item?.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavbarLinks;
