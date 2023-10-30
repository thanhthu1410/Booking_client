import { useNavigate } from 'react-router-dom'
import './listCustomer.scss'
import { useEffect, useState } from 'react'
import api from '@/services/api';
import { Customer } from '@/stores/slices/customer.slice';
import CustomerDetail from './CustomerDetail';
import moment from 'moment';
export default function ListCustomer() {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [listCustomer, setListCustomer] = useState<Customer[]>([])
    const [selectedPage, setSelectedPage] = useState(null);
    const [maxItemPage, setMaxItemPage] = useState(5);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchData, setSearchData] = useState<Customer[]>([]);
    const [customerDetail, setCustomerDetail] = useState<Customer>()
    let timeOut: any;
    function search(e: any) {
        clearTimeout(timeOut);
        if (e.target.value == "") {
            setSearchData([])
            return;
        };
        timeOut = setTimeout(async () => {
            setSearchStatus(true)
            try {
                if (searchStatus) {
                    return
                }
                let result = await api.customerApi.searchCustomer(e.target.value);
                if (result.status == 200) {
                    // sau 1.5s set lai data & tat loading
                    setTimeout(() => {
                        setSearchStatus(false);
                        setSearchData(result.data.data);
                    }, 1500)
                    // console.log("setSeardata", searchData);
                }
                else {
                    setSearchStatus(false);
                }
            } catch (err) {
                console.log("err:", err)
                console.log("loi call api search");

            }
        }, 500)

    }


    useEffect(() => {
        api.customerApi.findMany(maxItemPage, skipItem)
            .then(res => {
                if (res.status == 200) {
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setListCustomer(res.data.data)
                }
            })
            .catch(err => {
                console.log("err", err);

            })
    }, [])

    function changePage(pageItemObj: any) {
        api.customerApi.findMany(maxItemPage, pageItemObj.skip)
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
                    setListCustomer(res.data.data)
                    setSelectedPage(pageItemObj.number);
                }
            })
    }





    return (

        <div className='customer_container'>
            {modal ? (
                <CustomerDetail
                    setModal={setModal} setCustomerDetail={setCustomerDetail} customerDetail={customerDetail}
                ></CustomerDetail>
            ) : (
                <></>
            )}
            <div className='admin_title'>
                <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                <h3>List Customer</h3>
            </div>
            <div className='voucher_search_container'>
                <input type="text" placeholder='Enter Email of Customer...' onChange={(e) => {
                    e.preventDefault()
                    search(e)
                }} />
                <i className="fa-solid search_icon fa-magnifying-glass"></i>
            </div>

            <div className='customer_container_content'>
                <table className="table">
                    <thead className="thead-dark" >
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Create At</th>
                        
                            <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {searchData.length > 0 ? (
                            searchData?.map((item: any, index) => (
                                <tr key={Date.now() * Math.random()}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item?.fullName}</td>
                                    <td>{item?.phoneNumber}</td>
                                    <td>{item?.email}</td>
                                    <td >{moment(new Date(Number(item?.createdAt))).format('DD/MM/YYYY')}</td>
                                    <td className='action'>
                                        <button onClick={() => {
                                            setModal(true)
                                            setCustomerDetail(item)
                                        }} type="button" className="btn btn-success">Detail</button>
                                    </td>
                                </tr>
                            ))

                        ) : (
                            <>
                                {listCustomer?.map((customer: any, index) => (
                                    <tr key={Date.now() * Math.random()}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{customer?.fullName}</td>
                                        <td>{customer?.phoneNumber}</td>
                                        <td>{customer?.email}</td>
                                        <td >{moment(new Date(Number(customer?.createdAt))).format('DD/MM/YYYY')}</td>
                                
                                        <td className='action'>
                                            <button onClick={() => {
                                                setModal(true)
                                                setCustomerDetail(customer)
                                            }} type="button" className="btn btn-success">Detail</button>
                                        </td>
                                    </tr>
                                ))}
                            </>

                        )}

                    </tbody>
                </table>
                {searchStatus ? (<div className="d-flex justify-content-center loading-wrapper">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>) : <></>}
                <nav aria-label="Page navigation example page_box  ">
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
        </div>

    )
}
