import "./stylist.scss"
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
export default function StylistSlider() {
  return (
    <section className="stylist">

    <div className="container">
    <div className="our_service_top">
                <p>Expert Team</p>
                <img src="https://themeholy.com/html/rasm/demo/assets/img/theme-img/title_shape_3.svg" alt="" />
                <h2>Our Experience Specialists</h2>

              </div>
        <div className="row" style={{ margin: "10px" }}>
            <Carousel className="categories__slider owl-carousel"
                autoPlay={true}
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={1500}
                centerMode={false}

                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 4,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
               
                
                <div className='sale_carou'>
                    <div className='sale_carou_chirl' >
                 
                        <img className="image" src="https://themeholy.com/html/rasm/demo/assets/img/team/team_2_1.jpg" alt="" />
                        <div className='sale_carou_title'>    
                            <button className="btn-98">Name Stylist</button>      
                        </div>
                    </div>
                </div>
                <div className='sale_carou'>
                    <div className='sale_carou_chirl' >
                 
                        <img className="image" src="https://themeholy.com/html/rasm/demo/assets/img/team/team_2_2.jpg" alt="" />
                        <div className='sale_carou_title'>
                        <button className="btn-98">Name Stylist</button>      
                        </div>
                    </div>
                </div>
                <div className='sale_carou'>
                    <div className='sale_carou_chirl' >
                   
                        <img className="image" src="https://themeholy.com/html/rasm/demo/assets/img/team/team_2_3.jpg" alt="" />
                        <div className='sale_carou_title'>
                        <button className="btn-98">Name Stylist</button>      
                        </div>
                    </div>
                </div>
                <div className='sale_carou'>
                    <div className='sale_carou_chirl' >
               
                        <img className="image" src="https://themeholy.com/html/rasm/demo/assets/img/team/team_2_4.jpg" alt="" />
                        <div className='sale_carou_title'>
                        <button className="btn-98">Name Stylist</button>      
                        </div>
                    </div>
                </div>
            

            </Carousel>
        </div>
    </div>
</section>
  )
}
