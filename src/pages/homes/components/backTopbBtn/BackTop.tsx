import React, { useState, useEffect } from 'react';
import "./backtop.scss"
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="contentDiv" id="content">
      {isVisible && (
        <button className="back-to-top" type="button" onClick={scrollToTop}></button>
      )}
    </div>
  );
}

export default ScrollToTopButton;