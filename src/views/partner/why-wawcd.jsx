import { FeaturesContainer } from "@/components";

const WhyWawcd = ({ data }) => {
  console.log('============>data =========>', data);
  return (
    <div className="my-12 flex flex-col gap-12">
      <FeaturesContainer data={data[0]} />
      <FeaturesContainer data={data[1]} />
    </div>
  );
};

export default WhyWawcd;
