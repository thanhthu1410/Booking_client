import { useNavigate } from "react-router";
import "./navbar.scss";
import { useState } from "react";
import { Carousel } from 'antd';

export default function Navbar() {
    const navigate = useNavigate();
    const [banners, setBanners] = useState([
        {
            id: 1,
            title: "Enjoy a relaxing space and professional hair care services."
        },
        {
            id: 2,
            title: "Respect and appreciate your natural beauty, along with ceaseless creativity to achieve the perfect look you desire."
        },
        {
            id: 3,
            title: "With a range of enticing vouchers, use our services now to enjoy."
        }
    ]);
    return (
        <div className="navbar_container">

            <div className="navbar_container_top">
                <div className="navbar_container_chirld">
                <p className='carousel-container_top'>
                <Carousel
                    autoplay
                    autoplaySpeed={2000}
                    effect={"fade"}
                    dots={false}
                    dotPosition={"bottom"}
                >
                    {banners.map((banner, index) => (
                        <div className="items" key={banner.id + index}>
                            <p className='title'>{banner.title}</p>
                        </div>
                    ))}
                </Carousel>
              
            </p>
               
                </div>
            </div>
            <div className="navbar_container_bottom">
                <div className="navbar_container_chirld">
                    <div className="navbar_logo">
                        <img src="https://themeholy.com/html/rasm/demo/assets/img/logo-white2.svg" alt="" />

                    </div>
                    <div className="navbar_center">
                        <span onClick={() => navigate("/")}>HOME</span>
                        <span onClick={() => navigate("/service")}>SERVICE </span>
                        <span onClick={() => navigate("/booking")}>BOOKING</span>
                        <a className="about_title" href="#about">TIPS</a>
                    </div>
                    <div className="navbar_right">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <i className="fa-solid fa-bag-shopping"></i>
                        <i className="fa-solid fa-location-dot"></i>
                    </div>
                </div>
            </div>



        </div>
    )
}
