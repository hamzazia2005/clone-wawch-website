'use client';
import { useRouter } from 'next/navigation';
import { BlocksRender, FaqQuestion } from '@/components';
import { useParams } from 'next/navigation';

const Detail = ({ data, faqs, related }) => {
  const router = useRouter();
  const params = useParams();
  if (!data) {
    if (typeof window !== 'undefined') {
      router.push('/404');
    }
    return <div></div>;
  }
  return (
    <div className='my-24 flex justify-center mx-4'>
      {data && (
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" className='max-w-[700px] w-full'>
          {/* <FadeIn> */}
            <h2 className='font-semibold text-4xl text-black font-poppins my-4'>
              {data?.question}
            </h2>
          {/* </FadeIn> */}
          <BlocksRender data={data?.answer} />
          {/* <FadeIn> */}
            {data?.video_iframe && (
              <div className='video-class'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.video_iframe,
                  }}
                ></div>
              </div>
            )}
          {/* </FadeIn> */}
          <div className='my-12 py-12 border-y-2 border-gray-500 text-[#7D7B7B]'>
            <BlocksRender data={related?.paragraph} />
          </div>
          {/* <FadeIn> */}
            <h3 className='font-semibold text-3xl text-black font-poppins my-4'>
              {related?.related_title}
            </h3>
          {/* </FadeIn> */}
          {faqs
            ?.filter((item) => item?.slug !== params.slug)
            ?.slice(0, 5)
            ?.map((item, index) => (
              <div key={index}>
                {/* <PopUp duration={1}> */}
                  <FaqQuestion item={item} flag={true} />
                {/* </PopUp> */}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Detail;
