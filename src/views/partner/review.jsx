import { Testimonial } from "@/components";

const Review = ({ data }) => {
  return (
    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
      <Testimonial data={data} />
    </div>
  );
};

export default Review;
