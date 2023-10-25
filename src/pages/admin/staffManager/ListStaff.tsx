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
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchData, setSearchData] = useState<string>('');
    const staffStore = useSelector((store: StoreType) => {
        return store.staffStore
    })
    let timeOut: any;
    function search(value: string) {
        timeOut = setTimeout(async () => {
            setSearchStatus(true)
            try {
                if (searchStatus) {
                    return
                }
                let result = await api.staffApi.searchStaff(value);
                if (result.status == 200) {
                    // sau 1.5s set lai data & tat loading
                    setTimeout(() => {
                        setSearchStatus(false);
                        dispatch(staffActions.setDataStaff(result.data.data));
                    }, 1500)

                }
                else {
                    setSearchStatus(false);
                }
            } catch (err) {
                console.log("err:", err)
            }
        }, 500)

    }
    useEffect(() => {
        search(searchData)
    }, [searchData])

    useEffect(() => {
        return () => {
            search('')
        };
    }, [])

    const handleDelete = (id: any) => {
        Modal.confirm({
            title: "Do you want delete this Staff !",
            content: "",
            onOk: () => {
                api.staffApi.delete(id)
                    .then(res => {
                        console.log("delete", isDelete);
                        setIsDelete(!isDelete)
                        // setSearchData(id)
                        search(searchData)
                        // dispatch(staffActions.reload())
                    })
                    .catch(err => console.log("err", err)
                    )
            }
        })
    };


    return (
        <div className='staff_container'>
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
                    setSearchData(e.target.value)
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
                        {staffStore?.data?.map((staff: any, index) => (
                            <tr key={Date.now() * Math.random()}>
                                <th className='render_service_item' scope="row">{index + 1}</th>
                                <td className='render_service_item'><img className='img' src={staff.avatar} alt="" /></td>
                                <td className='render_service_item'>{staff.name}</td>
                                <td className='render_service_item'>{staff.birthDay}</td>
                                <td className='render_service_item'>{staff.phoneNumber}</td>
                                <td className='render_service_item'>{staff.experience}</td>
                                <td className='render_service_item desc'>{staff.desc}</td>
                                <td className='render_service_item'>
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
                    </tbody>
                </table>
                {searchStatus ? (<div className="d-flex justify-content-center loading-wrapper">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>) : <></>}
            </div>
        </div>
    )
}
