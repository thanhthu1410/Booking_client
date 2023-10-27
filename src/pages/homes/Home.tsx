import { Outlet } from "react-router-dom";
import Footer from "../../components/footers/Footer";
import Navbar from "../../components/navbars/Navbar";
import PhoneIcon from "@/components/phoneIcon/PhoneIcon";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <PhoneIcon />
    </div>
  )
}
