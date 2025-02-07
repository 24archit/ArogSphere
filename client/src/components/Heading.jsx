import { useEffect, useRef } from "react";
import "../../assets/styles/Heading.css";  

const Heading = ({ text }) => {
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
        }
      },
      { threshold: 0.5 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return <h1 ref={headingRef} className="fade-in">{text}</h1>;
};

export default Heading;
