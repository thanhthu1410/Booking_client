import "./banner.scss"

export default function Banner() {

  return (
    <div className='banner_container'>
      <div className='banner_container_chirld'>
        <div className="banner_chirld_left">
          <img className="img1" src="https://themeholy.com/html/rasm/demo/assets/img/normal/about_3_1.jpg" alt="" />
          <img className="img2" src="https://themeholy.com/html/rasm/demo/assets/img/normal/about_3_2.jpg" alt="" />
        </div>
        <div className="banner_chirld_right">
          <p className="banner_detail_title">
            About us <img src="https://themeholy.com/html/rasm/demo/assets/img/theme-img/title_right.svg" alt="" />
          </p>
          <h2>
            Welcome to Our Hair Salon We Will Change Your Look!
          </h2>
          <p className="banner_detail_content">We are committed to using high-quality hair care products to ensure that your hair receives the best possible treatment. From shampoos and conditioners to styling products.</p>
        </div>

      </div>
      <img className="leas" src="https://themeholy.com/html/rasm/demo/assets/img/shape/leaves_11.png" alt="" />
      <img className="leas-green" src="https://themeholy.com/html/rasm/demo/assets/img/shape/leaves_7.png" alt="" />
      <div className="our_service_container">
          <div className="our_service_container_chirld">
              <div className="our_service_top">
                <p>Our Services</p>
                <img src="https://themeholy.com/html/rasm/demo/assets/img/theme-img/title_shape_3.svg" alt="" />
                <h2>Our Premium Hair Care Services</h2>

              </div>

              <div  className="our_service_bottom">
                  <div className="service_item">
                      <img src="https://themeholy.com/html/rasm/demo/assets/img/icon/service_3_1.svg" alt="" />
                      <p className="title">Hair Cut</p>
                      <p className="content">A versatile and classic haircut that can be worn in different lengths and styles, suitable for various face shapes</p>
                  </div>
                  <div className="service_item">
                      <img src="https://themeholy.com/html/rasm/demo/assets/img/icon/service_3_2.svg" alt="" />
                      <p className="title">Hair Cut</p>
                      <p className="content">A versatile and classic haircut that can be worn in different lengths and styles, suitable for various face shapes</p>
                  </div>
                  <div className="service_item">
                      <img src="https://themeholy.com/html/rasm/demo/assets/img/icon/service_3_3.svg" alt="" />
                      <p className="title">Hair Cut</p>
                      <p className="content">A versatile and classic haircut that can be worn in different lengths and styles, suitable for various face shapes</p>
                  </div>
                  <div className="service_item">
                      <img src="https://themeholy.com/html/rasm/demo/assets/img/icon/service_3_4.svg" alt="" />
                      <p className="title">Hair Cut</p>
                      <p className="content">A versatile and classic haircut that can be worn in different lengths and styles, suitable for various face shapes</p>
                  </div>
                  <div className="service_item">
                      <img src="https://themeholy.com/html/rasm/demo/assets/img/icon/service_3_5.svg" alt="" />
                      <p className="title">Hair Cut</p>
                      <p className="content">A versatile and classic haircut that can be worn in different lengths and styles, suitable for various face shapes</p>
                  </div>
                  <div className="service_item">
                      <img src="https://themeholy.com/html/rasm/demo/assets/img/icon/service_3_6.svg" alt="" />
                      <p className="title">Hair Cut</p>
                      <p className="content">A versatile and classic haircut that can be worn in different lengths and styles, suitable for various face shapes</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}


