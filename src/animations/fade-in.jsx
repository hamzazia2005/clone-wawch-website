"use client";
import { useRef, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const MOBILE_BREAKPOINT = 500;

const FadeIn = ({ children, delay = 0, duration = 1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isMobileRef = useRef(false);

  const checkIsMobile = useCallback(() => {
    isMobileRef.current = window.innerWidth < MOBILE_BREAKPOINT;
  }, []);

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [checkIsMobile]);

  if (isMobileRef.current) {
    return <>{children}</>;
  }

  return (
    <section ref={ref}>
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: isInView ? 1 : 0, translateY: isInView ? 0 : 100 }}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default FadeIn;
