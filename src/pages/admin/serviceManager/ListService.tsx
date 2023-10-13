import { useNavigate } from 'react-router-dom'
import './listService.scss'
import EditService from './EditService'
import { useState } from 'react'

export default function ListService() {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    return (

        <div>
            {modal ? (
                <EditService
                ></EditService>
            ) : (
                <></>
            )}
            <div className='admin_title'>
                <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                <h3>List Service</h3>
            </div>
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Avartar</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col">Create At</th>
                            <th scope="col">Update At</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td><img className='img' src="https://skinkraft.com/cdn/shop/articles/Evidence-Based_db1b4e63-9d14-40c6-baad-32c51be1073b_1024x400.jpg?v=1625565535" alt="" /></td>
                            <td>000001</td>
                            <td>Cut hair</td>
                            <td>$100</td>
                            <td>nhanh chong, tien loi, dep</td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td >13/10</td>
                            <td>13/10</td>
                            <td className='action'>
                                <i className="fa-solid fa-trash"></i>
                                <i onClick={() => {
                                    console.log("hhh");
                                    setModal(true)
                                }} className="fa-solid fa-pen"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>

    )
}
