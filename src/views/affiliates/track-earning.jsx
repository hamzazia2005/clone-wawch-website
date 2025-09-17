import { FeaturesContainer } from "@/components";

const TrackEarning = ({ data }) => {
  return (
    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" className="mb-12">
      <FeaturesContainer data={data} isPartner={false} />
    </div>
  );
};

export default TrackEarning;
