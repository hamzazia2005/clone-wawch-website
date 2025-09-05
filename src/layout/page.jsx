import { getServerSideData } from '@/utils/get_api';
import { Header, Footer } from '.';
import LanguageDetector from '@/components/language-detector';

const Layout = async ({ children, params }) => {
  const languages = ['en', 'fr', 'ar', 'pt'];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : 'en';
  const urls = {
    gcid: `api/google-adds-ids`,
    header: params?.lang ? `api/header/?locale=${paramLanguage}` : 'api/header',
    footer: params?.lang ? `api/footer/?locale=${paramLanguage}` : 'api/footer',
  };

  const header = await getServerSideData(urls.header);
  const footer = await getServerSideData(urls.footer);
  const gcid = await getServerSideData(urls.gcid, true);
  return (
    <div className='min-h-[100vh] flex flex-col justify-between'>
      <LanguageDetector />
      <Header data={header} gcid={gcid?.data} />
      {children}
      <Footer data={footer} />
    </div>
  );
};

export default Layout;
