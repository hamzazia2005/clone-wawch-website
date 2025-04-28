"use client";

const Links = ({ data }) => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const offset = -140;

    if (section) {
      const offsetTop = section.offsetTop + offset;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center mt-10">
      {data?.links?.map((item, index) => (
        <div
          key={index}
          onClick={() => scrollToSection(item?.id)}
          className="flex justify-center"
        >
          <p className="text-black cursor-pointer font-poppins font-semibold w-fit hover:text-secondary">
            {item?.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Links;
