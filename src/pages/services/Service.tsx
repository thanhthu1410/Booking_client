import { useSelector } from "react-redux"
import "./service.scss"
import { StoreType } from "@/stores"
import { useNavigate } from "react-router-dom";


export default function Service() {
  const serviceStore = useSelector((store : StoreType) => store.serviceStore);
  console.log("serviceStore",serviceStore);
  const navigate = useNavigate()
  function currencyFormat(num: number) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
  return (
    <div className="service_container">
        <div className="service_banner">
          <img src="https://lella.qodeinteractive.com/wp-content/uploads/2019/08/p2-title-img-1.jpg" alt="" />
          <div className="service_banner_content">
            <h1>My Service</h1>
            <p>Promising Excellence in Everything We Do. Come and try!</p>
          </div>
        </div>
        <div className="service_content">
          {serviceStore.data?.map((service: any) => ( 
                 <div className="service_item">
                 <img src={service?.avatar} alt="" />
                 <div className="service_item_detail">
                     <h3>{service.name}</h3>
                     <p><i className="fa-solid fa-heart"></i> {service.desc}</p>
                     <div className="price_item">
                     <p >Service Price:</p>
                     <p className="price_number"> {currencyFormat(service.price)}</p>
                     </div>           
                     <button className="btn-21" onClick={() => navigate("/booking")}><span>BOOK  NOW <i className="fa-solid fa-arrow-right"></i></span></button>
                 </div>
           </div>
          
          ))}
      
         
        </div>
    </div>
  )
}
