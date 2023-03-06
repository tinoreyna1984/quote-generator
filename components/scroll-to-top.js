import { scrollToTop } from '../helpers/scroll-to-top-event';
import Link from 'next/link'
import { useState, useEffect } from "react";

export default function ScrollToTop() {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button type='button' id="scroll-to-top" onClick={scrollToTop}
          className="fixed bottom-5 right-5 inline-block rounded-full w-10 h-10 p-2 m-0
          bg-slate-700
          text-white
          transition-all duration-600 ease-in-out
          hover:transition-all hover:duration-600 hover:ease-in-out hover:bg-slate-600
          focus:transition-all focus:duration-600 focus:ease-in-out focus:bg-slate-600
          focus:outline-none focus:ring-0 active:bg-slate-800">
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
      )}
    </>
  );
}
