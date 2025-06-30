import { FeaturesContainer } from "@/components";

const WhyWawcd = ({ data }) => {
  return (
    <div className="my-12 flex flex-col gap-12">
      <FeaturesContainer data={data[0]?.attributes} />
      <FeaturesContainer data={data[1]?.attributes} />
    </div>
  );
};

export default WhyWawcd;
