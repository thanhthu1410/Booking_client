
import { useState } from 'react'
import './customer.scss'
import { Appointment, AppointmentDetail, Customer } from '@/stores/slices/customer.slice'

interface Props {
    setModal: any
    customerDetail: Customer | undefined
    setCustomerDetail: any
}
export default function CustomerDetail(props: Props) {

    console.log("props.customerDetail", props.customerDetail);


    return (

        <div className='customer_detail_container'>
            <div className='customer_detail_container_content'>
                <div className='customer_container_content'>
                    {props.customerDetail?.appointments?.map((item: Appointment, index: any) => (
                        <div key={Date.now() * Math.random()}>
                            <div className='customer_appointments'>
                                <h3>{index + 1}.</h3>
                                <div className='customer_appointments_item'>
                                    <p>Date: {item.date}</p>
                                    <p>Time: {item.time}</p>
                                    <p>Total: {item.total}</p>
                                </div>
                            </div>
                            {item?.appointmentDetails?.map((infor: AppointmentDetail) => (
                                <div key={Date.now() * Math.random()} className='customer_appointmentDetails'>
                                    <p>Service Name: <span>{infor?.service?.name}</span></p>
                                    <p>Price: <span>{infor?.service?.price}</span></p>
                                    <p>Staff Name: <span>{infor?.staff?.name}</span></p>
                                </div>
                            ))}

                        </div>
                    ))}
                </div>
                <div className='Cancle_button'>
                    <button onClick={() => {
                        props.setModal(false)
                    }} type="button" className="btn btn-secondary">Cancle</button>
                </div>
            </div>
        </div>


    )
}
