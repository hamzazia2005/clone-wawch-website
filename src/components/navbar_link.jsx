'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useAppContext } from '@/context';
import Link from 'next/link';

const NavbarLinks = ({ navLinks }) => {
  const { lang } = useAppContext();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(
    pathname === `/${params.lang}/` || pathname === '/'
      ? 0
      : pathname.includes('/pricing/' || '/pricing/')
      ? 1
      : pathname.includes('/faqs/' || '/faq/')
      ? 2
      : pathname.includes('/features/')
      ? 3
      : pathname.includes('/blog/')
      ? 4
      : pathname.includes('/contact-us/')
      ? 5
      : -1
  );

  useEffect(() => {
    setOpen(
      pathname === `/${params.lang}/` || pathname === `/`
        ? 0
        : pathname.includes('/pricing/' || '/pricing/')
        ? 1
        : pathname.includes('/faqs/' || '/faq/')
        ? 2
        : pathname.includes('/features/')
        ? 3
        : pathname.includes('/blog/')
        ? 4
        : pathname.includes('/contact-us/')
        ? 5
        : -1
    );
  }, [pathname]);

  const scrollToSection = (sectionId, index) => {
    const section = document.getElementById(sectionId);
    const offset = -80;

    if (section) {
      const offsetTop = section.offsetTop + offset;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setOpen(index);
    }
  };

  const handleNavigate = (item, index) => {
    if (
      (pathname === `/${params.lang}/` || pathname === `/`) &&
      item?.link === '/'
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

  const isPricingLink = (item) => {
    return item?.link?.includes('/pricing') || item?.title?.toLowerCase().includes('pricing');
  };

  return (
    <div className='flex lg:items-center flex-col lg:flex-row gap-x-8 gap-y-8'>
      {navLinks?.map((item, index) => (
        <div key={index} className="relative">
          <Link
            href={
              !item?.link.includes('/author') && !item?.link.includes('/blog')
                ? item?.link === '/'
                  ? `/${lang}`
                  : item?.link[0] === '/'
                  ? `${item?.link}/${lang}`
                  : item?.link
                : item?.link
            }
            className={`${
              open === index ? 'text-secondary font-semibold' : 'text-primary'
            } font-medium font-poppins cursor-pointer hover:text-secondary`}
            onClick={() => handleNavigate(item, index)}
          >
            {item?.title}
          </Link>
          {isPricingLink(item) && (
            <span className="absolute top-0 -right-2 lg:-top-[1.2rem] lg:-right-[1.6rem] bg-secondary text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
              Sale
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavbarLinks;
