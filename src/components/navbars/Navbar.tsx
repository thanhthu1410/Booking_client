import "./navbar.scss"

export default function Navbar() {
    return (
        <div className="navbar_container">

            <div className="navbar_container_top">
                <div className="navbar_container_chirld">
                    <h1>navbar top</h1>
                </div>
            </div>
            <div className="navbar_container_bottom">
                <div className="navbar_container_chirld">
                   <div className="navbar_logo">
                        <img src="https://themeholy.com/html/rasm/demo/assets/img/logo-white.svg" alt="" />
                    
                   </div>
                   <div className="navbar_center">
                         <span>HOME</span>
                        <span>SERVICE </span>
                        <span>BOOKING</span>
                        <span>ABOUT</span>
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
