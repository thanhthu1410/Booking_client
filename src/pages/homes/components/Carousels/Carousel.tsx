import React, { useEffect, useState } from 'react';
import ScrollReveal from 'scrollreveal';
import { Carousel } from 'antd';
import "./carousel.scss";
import { useNavigate } from 'react-router';

export default function MyCarousel() {
const navigate = useNavigate()
  useEffect(() => {
    const slideUp = {
      distance: '200%',
      reset: true,
      duration: 3000,
    };
    const sr = ScrollReveal();
    sr.reveal('.title-h2', slideUp);
  });
  useEffect(() => {
    const slideUp = {
      // distance: '180%',
      reset: true,
      duration: 5000,
    };
    const sr = ScrollReveal();
    sr.reveal('.btn-101', slideUp);
  });
  useEffect(() => {
    const slideUp = {
      distance: '160%',
      // origin: 'bottom',
      // opacity: 1,
      reset: true,
      duration: 4000,
    };
    const sr = ScrollReveal();
    sr.reveal('.title-h5', slideUp);
  });
  const [banners, setBanners] = useState([
    {
      id: 1,
      url: "https://themeholy.com/html/rasm/demo/assets/img/hero/hero_bg_3_2.jpg",
      title: "haircut with a subtle shape",
      title2: "Styling and Heat Protection",
      title3: "This style features shaved or closely cropped",

    },
    {
      id: 2,
      url: "https://themeholy.com/html/rasm/demo/assets/img/hero/hero_bg_3_1.jpg",
      title: "timeless classic hair styles",
      title2: "Seasonal Hair Care",
      title3: "Similar to the messy bun but positioned",
    },
    {
      id: 3,
      url: "https://themeholy.com/html/rasm/demo/assets/img/hero/hero_bg_3_3.jpg",
      title: "the best hairstyles for women in the world",
      title2: "Trust in Our Expert Hair Care",
      title3: "Change Your Look With Our Talented Stylists",
    },
  ]);

  return (
    <div>
      <Carousel
        autoplay
        autoplaySpeed={3000}
        effect="fade"
        dots={true}
        dotPosition="bottom"
        waitForAnimate={true}
        data-ani-delay="0.3s"
        style={{ animationDelay: "0.3s" }}
      >
        {banners.map(banner => (
          <div className="items" key={banner.id} >
            <img style={{ width: "100%", height: "750px" }} className="items-img" src={banner.url} alt={`Banner ${banner.id}`} />
            <div className='items_title'>
              <p className="title-p"><img src="https://themeholy.com/html/rasm/demo/assets/img/theme-img/title_left2.svg" alt="" />{banner.title2}</p>
              <h2 className="title-h2" >{banner.title}</h2>
              <h5 className="title-h5">{banner.title3}</h5>
              <button className="btn-101" onClick={() => navigate("/booking")}>
                BOOKING NOW
                <svg>
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur result="coloredBlur" stdDeviation={5} />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <rect />
                </svg>
              </button>

            </div>
          </div>
        ))}
      </Carousel>

    </div>
  );
}

