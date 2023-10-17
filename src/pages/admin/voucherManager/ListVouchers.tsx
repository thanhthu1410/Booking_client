import api from '@/services/api';
import store, { StoreType } from '@/stores';
import { Voucher, voucherAction } from '@/stores/slices/voucher.slice';
import { message } from 'antd';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';

function ListVoucher() {
    const dispatch = useDispatch()
    const voucherStore = useSelector((store: StoreType) => store.voucherStore)
    console.log("voucherStore",voucherStore);
    function deleteVoucher (id: number) {
        console.log("thu nekk");
        
        api.voucherApi.delete(id)
        .then(res => {message.success("Delete Successfull !");
        dispatch(voucherAction.setReLoad())
        })
        .catch(err => console.log("err",err)
        )

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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {voucherStore.data?.map((voucher :Voucher,index: number) =><tr key={Math.random() * Date.now()}>
                        <td>{index + 1}</td>
                        <td>{voucher.code}</td>
                        <td>{voucher.title}</td>
                        <td>{voucher.discountType}</td>
                        <td>{voucher.value}</td>
                        <td>{voucher.status ? "true" : "false"}</td>
                        <td><i onClick={() => deleteVoucher(voucher.id)} className="fa-solid fa-trash-can"></i></td>
                    </tr> )
                   }
                    
              
                  
                </tbody>
            </Table>
        </div>

    );
}

export default ListVoucher;