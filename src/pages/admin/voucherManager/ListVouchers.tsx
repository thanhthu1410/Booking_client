
import store, { StoreType } from '@/stores';
import { Voucher } from '@/stores/slices/voucher.slice';
import api from '@/services/api';
import { Modal, message } from 'antd';
import { voucherAction } from '@/stores/slices/voucher.slice';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import EditVoucher from './EditVoucher';
import "./listvoucher.scss"
import moment from 'moment';


function ListVoucher() {  
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false)
    const [vocherState, setVoucherState] = useState<Voucher>();
    const voucherStore = useSelector((store: StoreType) => store.voucherStore); 
    
    function deleteVoucher(voucher:Voucher) {
        const newData = {
            ...voucher,
            IsDelete: true
        }
        Modal.confirm({
            title: "Do you want delete this Voucher !",
            content: "",
            onOk: () => {
                api.voucherApi.update(newData)
                    .then(res => {
                       message.success("Delete Voucher Successfull !");
                        dispatch(voucherAction.setReLoad());
                    })
                    .catch(err => console.log("err", err)
                    )
            }
        })
    }
    return (
        <div className='listVoucher_container'>
            <Table striped>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Discount Type</th>
                        <th>Value</th>
                        <th>Status</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='content_listvoucher'>
                    {voucherStore.data?.map((voucher: Voucher, index: number) => <tr key={Math.random() * Date.now()}>
                        <td>{index + 1}</td>
                        <td>{voucher.code}</td>
                        <td>{voucher.title}</td>
                        <td>{voucher.discountType}</td>
                        <td>{voucher.value}</td>
                       
                        <td>{voucher.status ?

                            <label className="switch">
                                <input type="checkbox" name='active' checked />
                                <span className="slider round"></span>
                            </label>

                            :
                            <label className="switch">
                                <input type="checkbox" name='active' />
                                <span className="slider round"></span>
                            </label>
                        }</td>
                         <td>{moment(new Date(Number(voucher.startAt))).format('DD/MM/YYYY')}</td>
                        <td>{moment(new Date(Number(voucher.endAt))).format('DD/MM/YYYY')}</td>
                        <td className='action'>
                            <i className="fa-solid fa-trash" onClick={()=> deleteVoucher(voucher)}></i>
                            <i onClick={() => {
                                setModal(true)
                                setVoucherState(voucher)
                            }} className="fa-solid fa-pen">

                            </i>
                        </td>
                    </tr>)
                    }
                    {modal ? <EditVoucher setModal={setModal} voucher={vocherState}></EditVoucher> : <></>}
                </tbody>
            </Table>
        </div>

    );
}

export default ListVoucher;