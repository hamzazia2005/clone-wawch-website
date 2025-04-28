import { SeeAll, GetStarted, Whatsapp } from "@/icons";

const IconButton = ({ isStarted, text, isWhatsapp, isWrap }) => {
  return (
    <button
      className={`font-medium py-3 px-6 rounded-[8px] font-poppins h-fit scale-1 hover:scale-[1.025] transition-all duration-300 ${
        isWrap ? "text-nowrap" : ""
      } ${
        isStarted
          ? !isWhatsapp
            ? "text-white bg-secondary hover:bg-primary"
            : "text-white bg-primary hover:bg-secondary"
          : "text-primary bg-white bg-opacity-60 hover:bg-secondary hover:text-white"
      }`}
    >
      <span className="flex items-center gap-2">
        {isStarted && !isWhatsapp && (
          <span>
            <GetStarted />
          </span>
        )}
        {isStarted && isWhatsapp && (
          <span>
            <Whatsapp />
          </span>
        )}
        <span>{text}</span>
        {!isStarted && (
          <span>
            <SeeAll />
          </span>
        )}
      </span>
    </button>
  );
};

export default IconButton;
