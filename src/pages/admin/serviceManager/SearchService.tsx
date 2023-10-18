import React from 'react'
import './service.scss'
export default function SearchService() {
    return (
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
                {/* <tbody>
                    {services?.map((item: any, index) => (
                        <tr key={Date.now() * Math.random()}>
                            <th scope="row">{index + 1}</th>
                            <td><img className='img' src={item.avatar} alt="" /></td>
                           
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>{item.desc}</td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked={item.status} />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td >{item.createAt}</td>
                            <td>{item.updateAt}</td>
                            <td className='action'>
                                <button onClick={() => {
                                    // setModal(true)
                                    // setUpdateData(item)
                                }} type="button" className="btn btn-success">Edit</button>
                                <button onClick={(e: any) => {
                                    // e.preventDefault()
                                    // setIsDelete(!isDelete)
                                    // handleDelete(item.id)
                                }} type="button" className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody> */}
            </table>
            <nav aria-label="Page navigation example page_box  ">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {/* {
                        maxPage.map(item => {
                            return (
                                <li key={Math.random() * Date.now()} className="page-item"><a className="page-link" href="#" onClick={() => changePage(item)}>{item.number}</a></li>
                            )
                        })
                    } */}
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
