const Input = ({
  id,
  name,
  label,
  placeholder,
  isRequired = true,
  onChange,
  errors,
  touched,
}) => {
  return (
    <div className="w-full">
      <h3 className="text-primary text-[12px] font-poppins font-medium mb-2 mt-4">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </h3>
      <input
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="contact-input w-full py-3 pl-4 border border-[#D0D5DD] rounded-md focus:outline-none text-[#667085] placeholder-[#667085]"
      />
      {errors && touched ? (
        <div className="text-red-500 text-xs ml-2">{errors}</div>
      ) : null}
    </div>
  );
};

export default Input;
