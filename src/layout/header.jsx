'use client';

//import { Suspense } from 'react';
import Image from 'next/image';
import { NavbarLinks, NavButtons, LangSelect } from '@/components';
import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MobileNav from './mobile_nav';
import { useAppContext } from '@/context';
import { postGclid } from '@/utils/post_gclid';

const Header = ({ data, gcid }) => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useAppContext();

  useEffect(() => {
    const gclid = searchParams.get('gclid');
    if (gclid) {
      const gclidExists = gcid?.some((item) => item.gclid === gclid);
      localStorage.setItem('gclid', gclid);
      localStorage.setItem('gclidForWhatsapp', gclid);
      if (!gclidExists) {
        postGclid('api/google-adds-ids', gclid);
      }
    }
  }, [searchParams, gcid]);

  const fetchData = async () => {
    localStorage.setItem('lang', '');
    const languages = ['en', 'fr', 'ar', 'pt'];
    if (params.lang && !languages.includes(params.lang)) {
      router.push('/404');
    }
    localStorage.setItem(
      'lang',
      languages?.includes(params?.lang) ? params?.lang : ''
    );
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex justify-center items-center w-full fixed top-0 z-50 bg-white'>
      <div className='max-w-[1440px] w-full flex justify-between items-center gap-4 px-5 sm:px-12 py-6'>
        <Link href={`/${lang}`} className='flex items-center gap-2'>
          <Image
            src={data?.logo?.logo || '/assets/placeholder.png'}
            //priority={true}
            width={32}
            height={32}
            alt='logo'
          />
          <p className='text-primary text-xl font-bold font-texyre'>
            {data?.logo?.name}
          </p>
        </Link>
        <div className='hidden lg:block'>
          <NavbarLinks navLinks={data?.navbar_links} />
        </div>
        <div className='hidden lg:flex items-center gap-4'>
          <NavButtons getStarted={data?.get_started_btn} />
          <LangSelect />
        </div>
        <div className='lg:hidden'>
          <MobileNav
            navLinks={data?.navbar_links}
            getStarted={data?.get_started_btn}
          />
        </div>
      </div>
    </div>
  );
};
export default Header;

// Wrapping the main component with Suspense
// export default function HeaderWithSuspense(props) {
//   return (
//     <Suspense>
//       <Header {...props} />
//     </Suspense>
//   );
// }
