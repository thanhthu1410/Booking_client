import React from 'react'
import Banner from './banners/Banner'
import MyCarousel from './Carousels/Carousel'
import StylistSlider from './stylistSliders/StylistSlider'
import BookingTable from '../../bookings/Booking'
import About from './about/About'
import ScrollToTopButton from './backTopbBtn/BackTop'

export default function Layout() {
  return (
    <div>
      <MyCarousel />
      <Banner />
      <StylistSlider />
      <About/>
     
    </div>
  )
}
