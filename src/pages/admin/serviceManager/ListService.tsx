import { useNavigate } from 'react-router-dom'
import './service.scss'
import EditService from './EditService'
import { useEffect, useState } from 'react'
import api from '@/services/api'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, message } from 'antd'
import { Service, serviceActions } from '@/stores/slices/service.slice'
import { StoreType } from '@/stores'


export default function ListService() {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [services, setServices] = useState([])
    // console.log("services:", services)
    const [updateData, setUpdateData] = useState([])
    const [isDelete, setIsDelete] = useState(false);
    const [selectedPage, setSelectedPage] = useState(null);
    const [maxItemPage, setMaxItemPage] = useState(5);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const dispatch = useDispatch();
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchData, setSearchData] = useState<Service[]>([]);;

    //const [loading, setLoading] = useState(false);
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
                let result = await api.serviceApi.searchService(e.target.value);
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
    const serviceStore = useSelector((store: StoreType) => {
        return store.serviceStore
    })
    useEffect(() => {
        api.serviceApi.findMany(maxItemPage, skipItem)
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
                    setServices(res.data.data)
                }
            })
            .catch(err => {
                console.log("err", err);

            })
    }, [])
    function changePage(pageItemObj: any) {
        api.serviceApi.findMany(maxItemPage, pageItemObj.skip)
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
                    setServices(res.data.data)
                    setSelectedPage(pageItemObj.number);
                }
            })
    }


    const handleDelete = (id: any) => {
        Modal.confirm({
            title: "Do you want delete this Service !",
            content: "",
            onOk: () => {
                api.serviceApi.delete(id)
                    .then(res => {
                        message.success("Delete Service Successfull !");
                        const listServiceAfterDel = services;

                        if (searchData.length > 0) {
                            const listServiceSearch = [...searchData]
                            const filterService = listServiceAfterDel.filter((item: Service) => item.id !== id)
                            setServices(filterService);
                            const filterServiceSearch = listServiceSearch.filter((item: Service) => item.id !== id);
                            setSearchData(filterServiceSearch);
                        } else {
                            const filterService = listServiceAfterDel.filter((item: Service) => item.id !== id)
                            setServices(filterService);
                        }

                    })
                    .catch(err => console.log("err", err)
                    )
            }
        })
    };






    return (

        <div className='listservices_container'>
            {modal ? (
                <EditService setModal={setModal} item={updateData} services={services} setServices={setServices} searchData={searchData} setSearchData={setSearchData}></EditService>
            ) : (
                <></>
            )}
            <div className='admin_title'>
                <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                <h3>List Service</h3>
            </div>

            <div className='voucher_search_container'>
                <input type="text" placeholder='Enter Service...' onChange={(e) => {
                    e.preventDefault()
                    search(e);
                }} />
                <i className="fa-solid search_icon fa-magnifying-glass"></i>
            </div>

            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr><th scope="col">#</th>
                            <th scope="col">Avartar</th>
                            {/* <th scope="col">User ID</th> */}
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            {/* <th scope="col">Create At</th>
                            <th scope="col">Update At</th> */}
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {searchData.length > 0 ? (
                            searchData?.map((item: any, index) => (
                                <tr key={Date.now() * Math.random()}>
                                    <td scope="row" className='render_service_item'>{index + 1}</td>
                                    <td className='render_service_item'><img className='img' src={item.avatar} alt="" /></td>
                                    {/* <td>000001</td> */}
                                    <td className='render_service_item' >{item.name}</td>
                                    <td className='render_service_item' >${item.price}</td>
                                    <td className='render_service_item desc'>{item.desc}</td>
                                    <td className='render_service_item'>
                                        <label className="switch">
                                            <input type="checkbox" defaultChecked={item.status} disabled/>
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
                                            setIsDelete(!isDelete)
                                            handleDelete(item.id)
                                        }} type="button" className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <>
                                {services?.map((item: any, index) => (
                                    <tr key={Date.now() * Math.random()}>
                                        <td className='render_service_item' scope="row">{index + 1}</td><td className='render_service_item'><img className='img' src={item.avatar} alt="" /></td>
                                        {/* <td>000001</td> */}
                                        <td className='render_service_item'>{item.name}</td>
                                        <td className='render_service_item'>${item.price}</td>
                                        <td className='render_service_item desc'>{item.desc}</td>
                                        <td className='render_service_item'>
                                            <label className="switch">
                                                <input type="checkbox" defaultChecked={item.status} disabled/>
                                                <span className="slider round"></span>
                                            </label>
                                        </td>
                                        {/* <td >{item.createAt}</td>
                                        <td>{item.updateAt}</td> */}
                                        <td className='action '>
                                            <button onClick={() => {
                                                setModal(true)
                                                setUpdateData(item)
                                            }} type="button" className="btn btn-success">Edit</button>
                                            <button onClick={(e: any) => {
                                                e.preventDefault()
                                                setIsDelete(!isDelete)
                                                handleDelete(item.id)
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
                                    <li key={Math.random() * Date.now()} className="page-item"><a className="page-link" href="#" onClick={() => changePage(item)}>{item.number}</a></li>)
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