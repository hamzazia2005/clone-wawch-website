'use client';
import { GetStarted, Detail } from '@/views/faq';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const FaqCall = ({ getStarted, faqs, faq }) => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  if (!faq) {
    if (typeof window !== 'undefined') {
      router.push('/404');
    }
    return <div></div>;
  }
  return (
    <div>
      <GetStarted
        data={getStarted}
        faqs={faqs}
        search={search}
        setSearch={setSearch}
      />
      <Detail data={faq} faqs={faqs} related={getStarted} />
    </div>
  );
};

export default FaqCall;
