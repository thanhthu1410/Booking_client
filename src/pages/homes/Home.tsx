import { Outlet } from "react-router-dom";
import Footer from "../../components/footers/Footer";
import Navbar from "../../components/navbars/Navbar";

export default function Home() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
