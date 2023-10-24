
import store, { StoreType } from '@/stores';
import { Voucher } from '@/stores/slices/voucher.slice';
import api from '@/services/api';
import { Modal, message } from 'antd';
import { voucherAction } from '@/stores/slices/voucher.slice';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import EditVoucher from './EditVoucher';
import "./listvoucher.scss"
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


function ListVoucher() {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false)
    const [maxItemPage, setMaxItemPage] = useState(5);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const [vouchers, setVouchers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [vocherState, setVoucherState] = useState<Voucher>();
    const [searchData, setSearchData] = useState([])
    const [searchStatus, setSearchStatus] = useState(false)
    const voucherStore = useSelector((store: StoreType) => store.voucherStore);
    const navigate = useNavigate();
    function currencyFormat(num: number) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
    useEffect(() => {
        setIsLoading(true);
        api.voucherApi.findAllPagination(maxItemPage, skipItem)
            .then(res => {
                if (res.status == 200) {
                    // console.log("res.data", res.data)
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setVouchers(res.data.data)
                }
            })
            .catch(err => {

            })
            .finally(() => {
                setIsLoading(false); // Kết thúc loading
            });
    }, [])

    function changePage(pageItemObj: any) {
        api.voucherApi.findAllPagination(maxItemPage, pageItemObj.skip)
            .then(res => {
                if (res.status == 200) {
                    console.log("res.data", res.data)
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setVouchers(res.data.data)
                }
            })
    }
    function deleteVoucher(voucher: Voucher) {
        
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
                        if(res.status == 200){
                            console.log("res",res);
                        
                            message.success("Delete Voucher Successfull !");
                            
                            const listVoucher = vouchers;
                            console.log("voucher",vouchers);
                            console.log("listVoucherAfterDelete",listVoucher);
                            
                            
                            const newListVoucher = listVoucher.filter((item: Voucher) => 
                                item.id !== voucher.id
                            )
                            console.log("newListVoucher",newListVoucher);
                            
                            setVouchers(newListVoucher)
                            // dispatch(voucherAction.setReLoad());
                        }
                       
                    })
                    .catch(err => console.log("err", err)
                    )
            }
        })
    }
    let timeOut: any;
    function searchVoucher(searchString: any) {
        clearTimeout(timeOut);
        if (searchString.target.value == "") {
            setSearchData([])
            return;
        };
        timeOut = setTimeout(async () => {
            //  call api
            setSearchStatus(true)
            try {
                if (searchStatus) {
                    return
                }
                let result = await api.voucherApi.search(searchString.target.value);
                if (result.status == 200) {
                    // sau 1.5s set lai data & tat loading
                    console.log("res", result);

                    setTimeout(() => {
                        setSearchStatus(false);
                        setSearchData(result.data.data);
                        console.log("searchdata", searchData);

                    }, 1500)

                } else {
                    // failed
                    setSearchStatus(false);
                }
            } catch (err) {
            }
        }, 600)


    }
    return (
        <div className='listVoucher_container'>
            <div className='admin_title'>
                <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                <h3>List Vouchers</h3>
            </div>

            <div className='voucher_search_container'>
                <input type="text" placeholder='Enter Voucher Code... ' onChange={(e: any) => searchVoucher(e)} />
                <i className="fa-solid search_icon fa-magnifying-glass"></i>
            </div>
            {searchStatus ?  <div className="d-flex justify-content-center loading-wrapper">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> : <Table striped>
               
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
                   {
                       searchData?.length  > 0 ?
                           searchData.map((voucher: Voucher, index: number) => <tr key={Math.random() * Date.now()}>
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
                                   <i className="fa-solid fa-trash" onClick={() => deleteVoucher(voucher)}></i>
                                   <i onClick={() => {
                                       setModal(true)
                                       setVoucherState(voucher)
                                   }} className="fa-solid fa-pen">

                                   </i>
                               </td>
                           </tr>)
                           : vouchers.map((voucher: Voucher, index: number) => <tr key={Math.random() * Date.now()}>
                               <td>{index + 1}</td>
                               <td>{voucher.code}</td>
                               <td>{voucher.title}</td>
                               <td>{voucher.discountType}</td>
                               <td>{voucher.discountType == "percent" ? `${voucher.value}%` : currencyFormat(voucher.value)}</td>

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
                                   <i className="fa-solid fa-trash" onClick={() => deleteVoucher(voucher)}></i>
                                   <i onClick={() => {
                                       setModal(true)
                                       setVoucherState(voucher)
                                   }} className="fa-solid fa-pen">

                                   </i>
                               </td>
                           </tr>)



                   }
                   {modal ? <EditVoucher setModal={setModal} voucher={vocherState} vouchers={vouchers} setVouchers={setVouchers}></EditVoucher> : <></>}
               </tbody>
           </Table>}
            
            <nav aria-label="Page navigation example page_box">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {
                        maxPage.map(item => {
                            return (
                                <li key={Math.random() * Date.now()} className="page-item"><a className="page-link" href="#" onClick={() => changePage(item)}>{item.number}</a></li>
                            )
                        })
                    }
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

    );
}

export default ListVoucher;