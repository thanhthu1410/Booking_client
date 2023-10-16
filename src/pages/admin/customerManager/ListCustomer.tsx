import { useNavigate } from 'react-router-dom'
import './customer.scss'

import { useState } from 'react'

export default function ListCustomer() {
    const navigate = useNavigate()

    return (

        <div>

            <div className='admin_title'>
                <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                <h3>List Customer</h3>
            </div>
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">email</th>
                            <th scope="col">Create At</th>
                            <th scope="col">Update At</th>
                            <th scope="col">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Thu Huong</td>
                            <td>0923422223</td>
                            <td>hhh123@gmail.com</td>
                            <td >13/10</td>
                            <td>13/10</td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                        </tr>



                    </tbody>
                </table>

            </div>
        </div>

    )
}
