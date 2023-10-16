import { useNavigate } from 'react-router-dom'
import './service.scss'
import EditService from './EditService'
import { useEffect, useState } from 'react'
import api from '@/services/api'

export default function ListService() {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [services, setServices] = useState([])
    useEffect(() => {
        api.serviceApi.findMany()
            .then(res => {
                if (res.status == 200) {
                    console.log('Lista de servicos', res.data.data);
                    setServices(res.data.data)
                }
            })
            .catch(err => {
                console.log("err", err);

            })
    }, [])

    return (

        <div>
            {modal ? (
                <EditService
                    setModal={setModal}
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
                            {/* <th scope="col">User ID</th> */}
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
                        {services.map((item: any, index) => (
                            <tr key={Date.now() * Math.random()}>
                                <th scope="row">{index + 1}</th>
                                <td><img className='img' src={item.avatar} alt="" /></td>
                                {/* <td>000001</td> */}
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.desc}</td>
                                <td>
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td >{item.createAt}</td>
                                <td>{item.updateAt}</td>
                                <td className='action'>
                                    <i className="fa-solid fa-trash"></i>
                                    <i onClick={() => {
                                        setModal(true)
                                    }} className="fa-solid fa-pen"></i>
                                </td>
                            </tr>
                        ))}




                    </tbody>
                </table>

            </div>
        </div>

    )
}
