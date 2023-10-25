import { FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './staff.scss'
import api from '@/services/api'
import { useDispatch, useSelector } from 'react-redux'
import { serviceActions } from '@/stores/slices/service.slice'
import { Modal } from 'antd'
import EditStaff from './EditStaff'
import { Staff, staffActions } from '@/stores/slices/staff.slice'
import { StoreType } from '@/stores'

export default function ListStaff() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [isDelete, setIsDelete] = useState(false);
    const [updateData, setUpdateData] = useState([])

    const [selectedPage, setSelectedPage] = useState(null);
    const [maxItemPage, setMaxItemPage] = useState(2);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchData, setSearchData] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(false);

    let timeOut: any;
    function search(e: any) {

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
                let result = await api.staffApi.searchStaff(e.target.value);
                if (result.status == 200) {
                    // sau 1.5s set lai data & tat loading
                    setTimeout(() => {
                        setSearchStatus(false);
                        setSearchData(result.data.data);
                    }, 1500)
                    console.log("setSeardata", searchData);
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


    // useEffect(() => {
    //     api.staffApi.findAll(maxItemPage, skipItem)
    //         .then(res => {
    //             if (res.status == 200) {
    //                 let maxPageArr: any[] = [];
    //                 for (let i = 0; i < res.data.maxPage; i++) {
    //                     maxPageArr.push({
    //                         number: Number(i) + 1,
    //                         skip: res.data.data.length * Number(i)
    //                     })
    //                 }
    //                 setMaxPage(maxPageArr);
    //                 setSkipItem(res.data.data.length)
    //                 //setServices(res.data.data)
    //                 dispatch(serviceActions.reload());
    //             }
    //         })
    //         .catch(err => {
    //             console.log("err", err);

    //         })
    // }, [])


    // function changePage(pageItemObj: any) {
    //     api.staffApi.findAll(maxItemPage, pageItemObj.skip)
    //         .then(res => {
    //             if (res.status == 200) {
    //                 console.log("res.data", res.data)
    //                 let maxPageArr: any[] = [];
    //                 for (let i = 0; i < res.data.maxPage; i++) {
    //                     maxPageArr.push({
    //                         number: Number(i) + 1,
    //                         skip: res.data.data.length * Number(i)
    //                     })
    //                 }
    //                 setMaxPage(maxPageArr);
    //                 setSkipItem(res.data.data.length)
    //                 //setServices(res.data.data)
    //                 setSelectedPage(pageItemObj.number);
    //                 dispatch(serviceActions.reload());

    //             }
    //         })
    // }

    const handleDelete = (id: any) => {
        Modal.confirm({
            title: "Do you want delete this Staff !",
            content: "",
            onOk: () => {
                api.staffApi.delete(id)
                    .then(res => {
                        console.log("delete", isDelete);
                        setIsDelete(!isDelete)
                        dispatch(staffActions.reload())
                    })
                    .catch(err => console.log("err", err)
                    )
            }
        })
    };



    const staffStore = useSelector((store: StoreType) => {
        return store.staffStore
    })
    //console.log("staffStore:", staffStore?.data)

    useEffect(() => {
        if (staffStore && staffStore.data !== null) {
            console.log('staffStore:', staffStore.data);
        }
    }, [staffStore?.data])

    return (
        <div>
            {modal ? (
                <EditStaff
                    setModal={setModal} staff={updateData}
                ></EditStaff>
            ) : (
                <></>
            )}
            <div className='admin_title'>
                <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                <h3>List Staff</h3>
            </div>
            <div className='voucher_search_container'>
                <input type="text" placeholder='Enter Staff...' onChange={(e) => {
                    e.preventDefault()
                    search(e);
                }} />
                <i className="fa-solid search_icon fa-magnifying-glass"></i>
            </div>
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Avartar</th>
                            <th scope="col">Name</th>
                            <th scope="col">Birthday</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Experience</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchData.length > 0 ? (
                            searchData?.map((item: any, index) => (
                                <tr key={Date.now() * Math.random()}>
                                    <th scope="row">{index + 1}</th>
                                    <td><img className='img' src={item.avatar} alt="" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.birthDay}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.experience}</td>
                                    <td>{item.desc}</td>
                                    {/* <td >{item.updatedAt}</td>
                                    <td>{item.createdAt}</td> */}
                                    <td>
                                        <label className="switch">
                                            <input type="checkbox" defaultChecked={item.status} />
                                            <span className="slider round"></span>
                                        </label>
                                    </td>
                                    <td className='action'>
                                        <button onClick={() => {
                                            setModal(true)
                                            setUpdateData(item)
                                        }} type="button" className="btn btn-success">Edit</button>
                                        <button onClick={(e: any) => {
                                            e.preventDefault()
                                            handleDelete(item.id)
                                        }} type="button" className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <>
                                {staffStore?.data?.map((staff: any, index) => (
                                    <tr key={Date.now() * Math.random()}>
                                        <th scope="row">{index + 1}</th>
                                        <td><img className='img' src={staff.avatar} alt="" /></td>

                                        <td>{staff.name}</td>
                                        <td>{staff.birthDay}</td>
                                        <td>{staff.phoneNumber}</td>
                                        <td>{staff.experience}</td>
                                        <td>{staff.desc}</td>
                                        {/* <td >{staff.updatedAt}</td>
                                        <td>{staff.createdAt}</td> */}
                                        <td>
                                            <label className="switch">
                                                <input type="checkbox" defaultChecked={staff.status} />
                                                <span className="slider round"></span>
                                            </label>
                                        </td>
                                        <td className='action'>
                                            <button onClick={() => {
                                                setModal(true)
                                                setUpdateData(staff)
                                            }} type="button" className="btn btn-success">Edit</button>
                                            <button onClick={(e: any) => {
                                                e.preventDefault()
                                                handleDelete(staff.id)
                                            }} type="button" className="btn btn-danger">Delete</button>
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
                {/* <nav aria-label="Page navigation example page_box  ">
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
                </nav> */}
            </div>
        </div>
    )
}
