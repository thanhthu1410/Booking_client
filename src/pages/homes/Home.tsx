import { Outlet } from "react-router-dom";
import Footer from "../../components/footers/Footer";
import Navbar from "../../components/navbars/Navbar";
import PhoneIcon from "@/components/phoneIcon/PhoneIcon";
import { useEffect } from "react";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      const button = document.querySelector('.back-to-top');
      if (button) {
        if (window.scrollY > 200) {
          button.classList.add('show');
        } else {
          button.classList.remove('show');
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="contentDiv" id="content">
      <Navbar />
      <Outlet />
      <button className="back-to-top" type="button" onClick={scrollToTop}></button>
      <Footer />
    </div>
  );
}
