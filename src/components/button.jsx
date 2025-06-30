"use client";

const Button = ({
  isPrimary,
  text,
  background,
  isborder,
  isDisable,
  isWrap,
}) => {
  return (
    <button
      type="submit"
      disabled={isDisable}
      className={`w-full sm:transition-all sm:duration-300 py-3 rounded-[8px] px-4 sm:scale-1 sm:hover:scale-[1.025]  ${
        isPrimary
          ? `text-primary font-semibold font-poppins sm:hover:bg-primary sm:hover:text-white ${
              isborder ? "border" : ""
            }`
          : `text-white font-medium font-poppins ${
              background
                ? "bg-secondary sm:hover:bg-primary"
                : "bg-primary sm:hover:bg-secondary"
            }`
      } ${isWrap ? "text-wrap" : "text-nowrap"}`}
    >
      {isDisable ? (
        <div className="flex justify-center min-w-[120px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
