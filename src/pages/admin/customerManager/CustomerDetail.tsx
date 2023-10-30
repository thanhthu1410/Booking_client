
import { useState } from 'react'
import './customer.scss'
import { Appointment, AppointmentDetail, Customer } from '@/stores/slices/customer.slice'

interface Props {
    setModal: any
    customerDetail: Customer | undefined
    setCustomerDetail: any
}
export default function CustomerDetail(props: Props) {
    function currencyFormat(num: number) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


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
                                    {item?.voucher?.discountType === "percent" ? (
                                        <p>Discount: {item?.voucher?.value}%</p>
                                    ) : (item?.voucher?.discountType) === "cash" ? (
                                        <p>Voucher: {currencyFormat(item?.voucher?.value)}</p>
                                    ) : null}
                                    {/* {(item?.voucher?.discountType) == "percent" ? (<p>Discount: {item?.voucher?.value}%</p>) : (<p>Voucher: ${item?.voucher?.value}</p>)} */}
                                    <p>Total: {currencyFormat(item.total)}</p>
                                </div>
                            </div>
                            {item?.appointmentDetails?.map((infor: AppointmentDetail) => (
                                <div key={Date.now() * Math.random()} className='customer_appointmentDetails'>
                                    <p>Service Name: <span>{infor?.service?.name}</span></p>
                                    <p>Price: <span>{currencyFormat(infor?.service?.price)}</span></p>
                                    <p>Staff Name: <span>{infor?.staff?.name}</span></p>
                                </div>
                            ))}

                        </div>
                    ))}
                </div>
                <div className='Cancle_button'>
                    <button onClick={() => {
                        props.setModal(false)
                    }} type="button" className="btn btn-secondary btnClose">Close</button>
                </div>
            </div>
        </div>


    )
}
