import { FeaturesContainer } from "@/components";

const TrackEarning = ({ data }) => {
  return (
    <div className="mb-12">
      <FeaturesContainer data={data} isPartner={false} />
    </div>
  );
};

export default TrackEarning;
