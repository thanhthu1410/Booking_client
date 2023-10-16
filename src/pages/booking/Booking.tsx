import React, { useState } from 'react';
import Calendar from '@/components/calendar/Calendar';
import "./booking.scss";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Booking() {
    const [active, setActive] = useState(false);
    const [staffServiceActive, setStaffServiceActive] = useState(false);
    const [showServiceSelection, setShowServiceSelection] = useState(true);
    const [showTimeBook,setShowTimeBook] = useState(false)
    const[showInforForm,setShowInforForm] = useState(false)
    const[showPaymentForm,setShowPaymentForm] = useState(false)

    function handleChoose() {
        setActive(!active);
       
    }

    function handleChooseStaff() {
        setStaffServiceActive(!staffServiceActive);
    }

    function handleContinue() {
        setShowServiceSelection(false);
        setShowTimeBook(true)
    }
    function handleCoutinue2(){
        setShowInforForm(true);
        setShowTimeBook(false);
        
    }
    function handleCoutinue3(){
        setShowInforForm(false);
        setShowPaymentForm(true)
    }
    return (
        <div className='booking_container'>
            <div className='booking_left'>
                <div className='booking_left_step'>
                    <p>Service Selection</p>
                </div>
                <div className='booking_left_step'>
                    <p>Date & Time</p>
                </div>
                <div className='booking_left_step'>
                    <p>Your Information</p>
                </div>
                <div className='booking_left_step'>
                    <p>Payments</p>
                </div>
            </div>
            <form className='booking_right'>
                {showServiceSelection && (
                    <div className='booking_right_service'>
                        <div className='booking_right_service_detail'>
                            <div className='booking_right_service_detail_choose'>
                                <img className='service_image' src="https://i.pinimg.com/564x/f5/68/21/f56821476ddef26201fa55fb4ed76384.jpg" alt="" />
                                <h5>Cut hair</h5>
                                <p>$50</p>
                                <div className={`service_choose_button ${active ? 'active' : ''}`} onClick={() => handleChoose()}>Choose</div>
                            </div>

                            <div className='staff_list'>
                                <div className={`staff_list_item ${staffServiceActive ? 'show' : ''}`} onClick={() => handleChooseStaff()}>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                                <div className='staff_list_item'>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                                <div className='staff_list_item'>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='booking_right_service_detail'>
                            <div className='booking_right_service_detail_choose'>
                                <img className='service_image' src="https://i.pinimg.com/564x/f5/68/21/f56821476ddef26201fa55fb4ed76384.jpg" alt="" />
                                <h5>Cut hair</h5>
                                <p>$50</p>
                                <div className={`service_choose_button ${active ? 'active' : ''}`} onClick={() => handleChoose()}>Choose</div>
                            </div>

                            <div className='staff_list'>
                                <div className={`staff_list_item ${staffServiceActive ? 'show' : ''}`} onClick={() => handleChooseStaff()}>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                                <div className={`staff_list_item ${staffServiceActive ? 'show' : ''}`} onClick={() => handleChooseStaff()}>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                                <div className='staff_list_item'>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                                <div className='staff_list_item'>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='booking_right_service_detail'>
                            <div className='booking_right_service_detail_choose'>
                                <img className='service_image' src="https://i.pinimg.com/564x/f5/68/21/f56821476ddef26201fa55fb4ed76384.jpg" alt="" />
                                <h5>Cut hair</h5>
                                <p>$50</p>
                                <div className={`service_choose_button ${active ? 'active' : ''}`} onClick={() => handleChoose()}>Choose</div>
                            </div>

                            <div className='staff_list'>
                                <div className={`staff_list_item ${staffServiceActive ? 'show' : ''}`} onClick={() => handleChooseStaff()}>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                                <div className={`staff_list_item ${staffServiceActive ? 'show' : ''}`} onClick={() => handleChooseStaff()}>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                                <div className='staff_list_item'>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                                <div className='staff_list_item'>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='booking_right_service_detail'>
                            <div className='booking_right_service_detail_choose'>
                                <img className='service_image' src="https://i.pinimg.com/564x/f5/68/21/f56821476ddef26201fa55fb4ed76384.jpg" alt="" />
                                <h5>Cut hair</h5>
                                <p>$50</p>
                                <div className={`service_choose_button ${active ? 'active' : ''}`} onClick={() => handleChoose()}>Choose</div>
                            </div>

                            <div className='staff_list'>
                                <div className={`staff_list_item ${staffServiceActive ? 'show' : ''}`} onClick={() => handleChooseStaff()}>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                                <div className={`staff_list_item ${staffServiceActive ? 'show' : ''}`} onClick={() => handleChooseStaff()}>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                                <div className='staff_list_item'>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                                <div className='staff_list_item'>
                                    <img className='staff_avatar' src="https://png.pngtree.com/png-clipart/20210925/ourmid/pngtree-barber-pop-art-meiman-style-white-hair-png-image_3955551.png" alt="" />
                                    <div className='staff_information'>
                                        <h5 className='staff_name'>Staff 1</h5>
                                        <p className='staff_exp'>10 years</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='booking_right_service_button'>
                            <button className='continue_button' type='button' onClick={() => handleContinue()}>Continue</button>
                        </div>
                    </div>
                )}
                

                {showTimeBook && (
                    <div className='booking_calendar'>
                        <Calendar />
                        <div className='booking_right_service_button'>
                            <button className='continue_button' type='button' onClick={() => handleCoutinue2()}>Continue</button>
                        </div>
                    </div>
                )}
                {
                    showInforForm ? <div className='infor_container'>
                        <h4>Your Information : </h4>
                        <div>
                            <label htmlFor="">Full Name :</label> <br/>
                            <input type="text" placeholder='Alex Join' /><br/>
                            <label htmlFor="">Email :</label><br/>
                            <input type="email" placeholder='alexjoin@gmail.com' /><br/>
                            <label htmlFor="">Phone Number :</label><br/>
                            <input type="text" placeholder='+0123456789' /><br/>
                            
                            <button className='continue_button' type='button' onClick={() => handleCoutinue3()}>Continue</button>
                        
                        </div>
                    </div> : <div></div>
                }

                {
                    showPaymentForm ? <div className='payment_container'>
                            <h4>Check Out</h4>
                            <div>
                                <p className='sumamry'>Sumary :</p>
                                <div className='payment_detai'>
                                    <span> Hair Cut {`( $20 )`} x 2 slot</span>
                                    <span> $40</span>
                                </div>
                                <span className='subtotal'>Subtotal:  {` $20 `}  </span>
                                <div className='voucher_container'>
                                    <label htmlFor="">Enter Voucher :</label> <br/>
                                    <input type="text" placeholder='aB3%d' />
                                    <button className="btn-80"><span>Add</span></button>
                                </div>
                               
                                    <p className='total_amount'>Total Amount : {`$${20}`}</p>
                                    <button className='checkout'>CHECK OUT</button>
                            
                            </div>
                    </div> : <div></div>
                }
            </form>
        </div>
    )
}
