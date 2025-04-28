"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const PopUp = ({
  children,
  check = false,
  delay = 0,
  duration = 1.5,
  isBounce = false,
  check2 = false,
}) => {
  const ref = useRef(null);
  const isMobileRef = useRef(false);

  const transition = isBounce
    ? {
        type: "spring",
        bounce: 0.4,
        delay: delay,
        ease: "easeInOut",
        duration: duration,
      }
    : {
        duration: duration,
        ease: "easeInOut",
        delay: delay,
      };

  useEffect(() => {
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 500;
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobileRef.current) {
    return <div>{children}</div>;
  }

  return (
    <section
      ref={ref}
      className={`${check ? "min-h-full" : ""} ${
        check2 ? "scale-1 hover:scale-[1.025] transition-all" : ""
      }`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ height: "100%" }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={transition}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default PopUp;
