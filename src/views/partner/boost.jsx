import { BoostMap } from "@/components";

const Boost = ({ data, isPartner }) => {
  return (
    <div>
      <BoostMap data={data} isPartner={isPartner} />
    </div>
  );
};

export default Boost;
