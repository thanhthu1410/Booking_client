import { FormEvent, MutableRefObject, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './staff.scss'
import api from '@/services/api'
import { useDispatch } from 'react-redux'
import { serviceActions } from '@/stores/slices/service.slice'
import { Modal } from 'antd'
import EditStaff from './EditStaff'

export default function ListStaff() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const imgPreviewRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    function addNewService(e: FormEvent<HTMLFormElement>) {
        console.log("da vao")
        e.preventDefault();

        let formData = new FormData();
        formData.append("avatar", avatarFile!)
        // formData.append("avatar", newProductAvatar.avatar);
        formData.append("service", JSON.stringify({
            name: (e.target as any).name.value,
            desc: (e.target as any).des.value,
            price: (e.target as any).type.value,
        }))
        api.serviceApi.create(formData)
            .then(res => {
                console.log("res", res)
                dispatch(serviceActions.insertService(res.data));
                Modal.success({
                    content: "Add Service sucsses"

                });
            })
            .catch(err => {
                console.log("err", err);
            })

    }
    return (
        <div>
            {modal ? (
                <EditStaff
                    setModal={setModal}
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
                        <tr>
                            <th scope="row">1</th>
                            <td><img className='img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0yYQs0NgFttmjeD9ZEBnB18iy1iKLN3bE5Q&usqp=CAU" alt="" /></td>

                            <td>Json</td>
                            <td>1/1/1990</td>
                            <td>09232323</td>
                            <td>8 Year</td>
                            <td>Kinh nghiệm dày dặn, thân thiện</td>
                            <td >13/10</td>
                            <td>13/10</td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td className='action'>
                                <button onClick={() => {
                                    setModal(true)
                                }} type="button" className="btn btn-success">Edit</button>
                                <button type="button" className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}
