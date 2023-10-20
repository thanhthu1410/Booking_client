import { FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './staff.scss'
import api from '@/services/api'
import { useDispatch } from 'react-redux'
import { serviceActions } from '@/stores/slices/service.slice'
import { Modal } from 'antd'
import EditStaff from './EditStaff'
import { Staff, staffActions } from '@/stores/slices/staff.slice'

export default function ListStaff() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [staffs, setStaffs] = useState([])
    const [isDelete, setIsDelete] = useState(false);
    const [updateData, setUpdateData] = useState([])


    useEffect(() => {
        api.staffApi.findAll()
            .then(res => {
                console.log("listStaff", res.data.data);

                if (res.status === 200) {
                    setStaffs(res.data.data)
                }
            })
            .catch(err => {
                console.log("err", err);

            })
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
                        dispatch(staffActions.reload())
                    })
                    .catch(err => console.log("err", err)
                    )
            }
        })
    };


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
                            <th scope="col">Update At</th>
                            <th scope="col">Create At</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs?.map((staff: any, index) => (
                            <tr key={Date.now() * Math.random()}>
                                <th scope="row">{index + 1}</th>
                                <td><img className='img' src={staff.avatar} alt="" /></td>

                                <td>{staff.name}</td>
                                <td>{staff.birthDay}</td>
                                <td>{staff.phoneNumber}</td>
                                <td>{staff.experience}</td>
                                <td>{staff.desc}</td>
                                <td >{staff.updatedAt}</td>
                                <td>{staff.createdAt}</td>
                                <td>
                                    <label className="switch">
                                        <input type="checkbox" />
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

            </div>
        </div>
    )
}
