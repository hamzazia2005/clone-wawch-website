const Category = ({text, color}) => {
  return (
    <div
      className={`text-white bg-${color} text-xs font-medium w-fit px-2 py-1 rounded-md`}
    >
      {text}
    </div>
  );
};

export default Category;
