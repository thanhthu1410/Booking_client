
import { useState } from 'react'
import './editVoucher.scss'
import { message } from 'antd';
import api from '@/services/api';
import { useDispatch } from 'react-redux';
import { Voucher, voucherAction } from '@/stores/slices/voucher.slice';

interface Props {
    setModal: any
    voucher: any
    vouchers: Voucher[]
    setVouchers: any
    setSearchData: any
    searchData: Voucher[]
}
export default function EditVoucher(props: Props) {
    const dispatch = useDispatch()
    console.log("props.voucher", props.voucher);
    const [activeStatus, setActiveStatus] = useState(Boolean(props.voucher.status))
    function handleUpdateVoucher(e: any) {
        e.preventDefault();
        const updateData = {
            code: e.target.code.value,
            title: e.target.title.value,
            discountType: e.target.discountType.value,
            value: Number(e.target.value.value),
            status: activeStatus
        }
        if (updateData.code == "") {
            message.warning("Please enter code of Voucher !")
            return
        } else if (updateData.title == "") {
            message.warning("Please enter Title of Voucher !")
            return
        } else if (updateData.discountType == "") {
            message.warning("Please choose discountType of Voucher !")
            return
        } else if (e.target.value.value == "") {
            message.warning("Please enter Value of Voucher !")
            return
        } else if (updateData.discountType == "percent") {
            if (updateData.value > 100) {
                message.warning(" Discount Type Percent Value  over 100%")
                return
            }
        }

        console.log("updateData", updateData);
        const formatData = {
            ...props.voucher,
            code: updateData.code,
            title: updateData.title,
            discountType: updateData.discountType,
            value: updateData.value,
            status: updateData.status
        }
        console.log("formatData", formatData);
        api.voucherApi.update(formatData)
            .then(res => {
                if (res.status == 200) {
                    message.success("Update Voucher Successfull !");
                    if(props.searchData.length > 0) {
                        const listVoucherSearchAfterEdit = props.searchData.map((item: Voucher) => {
                            if(item.id === props.voucher.id){
                                return {
                                    ...item, code: updateData.code,
                                    title: updateData.title,
                                    discountType: updateData.discountType,
                                    value: updateData.value,
                                    status: updateData.status
                                };
                                // return item 
                            } else {
                                return item;
                            }
                        })
                        console.log("lisvoucherAfter",listVoucherSearchAfterEdit);
                        props.setSearchData(listVoucherSearchAfterEdit);
                        props.setModal(false);
                        const listVoucherAfterEdit = props.vouchers.map((item: Voucher) => {
                            if(item.id === props.voucher.id){
                                return {
                                    ...item, code: updateData.code,
                                    title: updateData.title,
                                    discountType: updateData.discountType,
                                    value: updateData.value,
                                    status: updateData.status
                                };
                                // return item 
                            } else {
                                return item;
                            }
                        })
                        console.log("lisvoucherAfter",listVoucherAfterEdit);
                        props.setVouchers(listVoucherAfterEdit);
                        props.setModal(false);
                    }else{
                        const listVoucherAfterEdit = props.vouchers.map((item: Voucher) => {
                            if(item.id === props.voucher.id){
                                return {
                                    ...item, code: updateData.code,
                                    title: updateData.title,
                                    discountType: updateData.discountType,
                                    value: updateData.value,
                                    status: updateData.status
                                };
                                // return item 
                            } else {
                                return item;
                            }
                        })
                        console.log("lisvoucherAfter",listVoucherAfterEdit);
                        props.setVouchers(listVoucherAfterEdit);
                        props.setModal(false);
                    }
                  
                }
            })
            .catch(err => console.log("err", err))


    }

    return (
        <div className='container_edit_voucher'>
            <div className='container_edit_chirld'>
                <div className='add_service_content'>
                    <form className='edit_voucher' onSubmit={(e: any) => handleUpdateVoucher(e)}>

                        <label>Voucher Code : </label>
                        <input type="text" defaultValue={props.voucher?.code} name='code' /> <br />

                        <label>Title of voucher : </label>
                        <input type="text" defaultValue={props.voucher?.title} name='title' /><br />

                        <label>Discount Type : </label>
                        {/* <input type="text" defaultValue={props.voucher?.discountType} name='discountType'/><br /> */}
                        <select name="discountType" id="">
                            <option defaultValue={props.voucher?.discountType}>{props.voucher?.discountType == "cash" ? "cash" : "percent"}</option>
                            <option value={props.voucher?.discountType == "cash" ? "percent" : "cash"}>{props.voucher?.discountType == "cash" ? "percent" : "cash"}</option>
                        </select>
                        <label>Value Discount : </label>
                        <input type="text" defaultValue={props.voucher?.value} name='value' /><br />

                        <p>Active :  {props.voucher?.status ? <label className="switch">
                            <input type="checkbox" name='active' onChange={() => setActiveStatus(!props.voucher?.status)
                            } defaultChecked defaultValue={props.voucher?.status} />
                            <span className="slider round"></span>
                        </label> : <label className="switch">
                            <input type="checkbox" name='active' onInput={() => setActiveStatus(!props.voucher?.status)} defaultValue={props.voucher?.status} />
                            <span className="slider round"></span>
                        </label>}</p>
                        <div className='button_container'>
                            <button type="submit" className="btn btn-success">Save</button>
                            <button onClick={() => {
                                props.setModal(false)
                            }} type="button" className="btn btn-secondary">Cancle</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
