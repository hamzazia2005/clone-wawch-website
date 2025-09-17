import { PageStarter } from "@/components";

const GetStarted = ({ data }) => {
  return (
    <div className="flex justify-center mt-24 py-20 bg-uninstall_banner bg-center bg-cover">
      <PageStarter data={data} />
    </div>
  );
};

export default GetStarted;
