

import React, { useEffect } from 'react';
import './admin.scss'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Notification from '@/components/notification/Notification';
import { Modal } from 'antd';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const sidebar = document.querySelector(".sidebar");
        const submenuItems = document.querySelectorAll(".submenu_item");
        const sidebarOpen = document.querySelector("#sidebarOpen");
        const sidebarClose = document.querySelector(".collapse_sidebar");
        const sidebarExpand = document.querySelector(".expand_sidebar");

        const handleSidebarOpen = () => sidebar?.classList.toggle("close");

        const handleSidebarClose = () => {
            sidebar?.classList.add("close", "hoverable");
        };

        const handleSidebarExpand = () => {
            sidebar?.classList.remove("close", "hoverable");
        };

        const handleMouseEnter = () => {
            if (sidebar?.classList.contains("hoverable")) {
                sidebar?.classList.remove("close");
            }
        };

        const handleMouseLeave = () => {
            if (sidebar?.classList.contains("hoverable")) {
                sidebar.classList.add("close");
            }
        };

        const handleSubmenuItem = (index: number) => () => {
            submenuItems.forEach((item2, index2) => {
                if (index !== index2) {
                    item2.classList.remove("show_submenu");
                }

            });
        };

        sidebarOpen?.addEventListener("click", handleSidebarOpen);
        sidebarClose?.addEventListener("click", handleSidebarClose);
        sidebarExpand?.addEventListener("click", handleSidebarExpand);

        sidebar?.addEventListener("mouseenter", handleMouseEnter);
        sidebar?.addEventListener("mouseleave", handleMouseLeave);

        // submenuItems.forEach((item, index) => {
        //     item.addEventListener("click", handleSubmenuItem(index));
        // });
        submenuItems.forEach((item, index) => {
            item.addEventListener("click", () => {
                item.classList.toggle("show_submenu");
                submenuItems.forEach((item2, index2) => {
                    if (index !== index2) {
                        item2.classList.remove("show_submenu");
                    }
                });
            });
        });

        if (window.innerWidth < 768) {
            sidebar?.classList.add("close");
        } else {
            sidebar?.classList.remove("close");
        }

        return () => {
            sidebarOpen?.removeEventListener("click", handleSidebarOpen);
            sidebarClose?.removeEventListener("click", handleSidebarClose);
            sidebarExpand?.removeEventListener("click", handleSidebarExpand);
            sidebar?.removeEventListener("mouseenter", handleMouseEnter);
            sidebar?.removeEventListener("mouseleave", handleMouseLeave);
            submenuItems.forEach((item, index) => {
                item.removeEventListener("click", handleSubmenuItem(index));
            });
        };
    }, []);

    return (


        <div className='admin_container'>
            <nav className="navbar">
                <div className="logo_item">
                    <i className="bx bx-menu" id="sidebarOpen" />
                    <img onClick={() => navigate("/")} style={{cursor:"pointer"}} src="https://firebasestorage.googleapis.com/v0/b/bookingsalon-fa833.appspot.com/o/homepageImg%2Flogo-white.svg?alt=media&token=56a09dd9-7817-464e-99c4-feb3a28f33ff&_gl=1*1ufdsen*_ga*MTg1ODg5NjEyOS4xNjg4MDg4OTU3*_ga_CW55HF8NVT*MTY5NzE3MDU0Mi41OS4xLjE2OTcxNzE0MDguMjUuMC4w" alt="" />
                </div>
                <div className='navbar_content'>
                    <div>
                        <i onClick={() => {
                            Modal.confirm({
                                content: ("Are you sure want to logout?"),
                                onOk: () => {
                                    localStorage.removeItem("refresh_token");
                                    localStorage.removeItem("access_token");
                                    window.location.href = '/'
                                },
                            })
                        }} className="fa-solid fa-right-from-bracket"></i>
                    </div>
                    <div>
                        <Notification />
                    </div>

                </div>
            </nav>
            <div className='body_container' >
                <div className="sidebar">
                    <div className="menu_content">
                        <ul className="menu_items">
                            <li className="item">
                                <a className="nav_link submenu_item">
                                    <span className="navlink_icon">
                                        <i className="fa-brands fa-servicestack"></i>
                                    </span>
                                    <span className="navlink">Service Manager</span>
                                    <i className="bx bx-chevron-right arrow-left" />
                                </a>
                                <ul className="menu_items submenu">
                                    <Link to="service" className="nav_link sublink">
                                        List Service
                                    </Link>
                                    <Link to="addService" className="nav_link sublink">
                                        Add Service
                                    </Link>
                                </ul>
                            </li>

                            <li className="item">
                                <a className="nav_link submenu_item">
                                    <span className="navlink_icon">
                                        <i className="fa-solid fa-clipboard-user"></i>
                                    </span>
                                    <span className="navlink">Staff Manager</span>
                                    <i className="bx bx-chevron-right arrow-left" />
                                </a>
                                <ul className="menu_items submenu">
                                    <Link to="listStaff" className="nav_link sublink">
                                        List Staff
                                    </Link>
                                    <Link to="addStaff" className="nav_link sublink">
                                        Add Staff
                                    </Link>
                                </ul>
                            </li>

                            <li className="item">
                                <a className="nav_link submenu_item">
                                    <span className="navlink_icon">
                                        <i className="fa-solid fa-calendar-check"></i>
                                    </span>
                                    <span className="navlink">Appointment  Manager</span>
                                    <i className="bx bx-chevron-right arrow-left" />
                                </a>
                                <ul className="menu_items submenu">
                                    <Link to="appointment" className="nav_link sublink">
                                        List Appointment
                                    </Link>
                                </ul>
                            </li>

                            <li className="item">
                                <a className="nav_link submenu_item">
                                    <span className="navlink_icon">
                                        <i className="fa-solid fa-users"></i>
                                    </span>
                                    <span className="navlink">Customer Manager</span>
                                    <i className="bx bx-chevron-right arrow-left" />
                                </a>
                                <ul className="menu_items submenu">
                                    <Link to="listCustomer" className="nav_link sublink">
                                        List Customer
                                    </Link>
                                </ul>
                            </li>

                            <li className="item">
                                <a className="nav_link submenu_item">
                                    <span className="navlink_icon">
                                        <i className="fa-solid fa-money-bill"></i>
                                    </span>
                                    <span className="navlink">Voucher Manager</span>
                                    <i className="bx bx-chevron-right arrow-left" />
                                </a>
                                <ul className="menu_items submenu">
                                    <Link to="voucher" className="nav_link sublink">
                                        Add Voucher
                                    </Link>
                                    <Link to="listvoucher" className="nav_link sublink">
                                        List Voucher
                                    </Link>
                                </ul>
                            </li>
                            <li className="item">
                                <a className="nav_link submenu_item">
                                    <span className="navlink_icon">
                                        <i className="fa-solid fa-chart-simple"></i>
                                    </span>
                                    <span className="navlink">Chart Manager</span>
                                    <i className="bx bx-chevron-right arrow-left" />
                                </a>
                                <ul className="menu_items submenu">
                                    <Link to="chart-avenue" className="nav_link sublink">
                                        Chart Avenue
                                    </Link>
                                    <Link to="chart-service" className="nav_link sublink">
                                        Chart Service
                                    </Link>
                                </ul>
                            </li>

                            <li className="item">
                                <a className="nav_link submenu_item">
                                    <span className="navlink_icon">
                                        <i className="fa-solid fa-flag"></i>
                                    </span>
                                    <span className="navlink">Report</span>
                                    <i className="bx bx-chevron-right arrow-left" />
                                </a>
                            </li>

                            <li className="item" onClick={() => navigate("/admin/setting")}>
                                <a className="nav_link submenu_item">
                                    <span className="navlink_icon setting">
                                        <span className="material-symbols-outlined">
                                            settings
                                        </span>
                                    </span>
                                    <span className="navlink">
                                        Setting
                                    </span>
                                    <i className="bx bx-chevron-right arrow-left" />
                                </a>
                            </li>

                        </ul>
                        <div className="bottom_content">
                            <div className="bottom expand_sidebar">
                                <span> Expand</span>
                                <i className="bx bx-log-in" />
                            </div>
                            <div className="bottom collapse_sidebar">
                                <span> Collapse</span>
                                <i className="bx bx-log-out" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='admin_content'>
                    <Outlet />
                </div>
            </div>
        </div>

    );
};

export default Sidebar;
