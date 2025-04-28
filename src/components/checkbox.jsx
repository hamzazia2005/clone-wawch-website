import { Check } from "@/icons";

const Checkbox = ({ item }) => {
  return (
    <div className="flex gap-2 items-center p-3 bg-white rounded-md w-fit">
      <div>
        <Check color={item?.color} />
      </div>
      <div>
        <h4 className="text-[#1D1D21] text-lg font-plus font-semibold">
          {item?.title}
        </h4>
        <p className="font-poppins text-third font-medium text-xs">{item?.desc}</p>
      </div>
    </div>
  );
};

export default Checkbox;
