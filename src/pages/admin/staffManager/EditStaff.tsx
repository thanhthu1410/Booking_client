import './staff.scss'

export default function EditStaff(props: any) {
    return (
        <div>
            <div className='container_editService'>
                <div className='container_content_service'>
                    <div className='add_service_content'>
                        <div className='add_image'>
                            <img src="https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$" alt="" style={{ width: "150px", height: "150px", borderRadius: "50%", marginTop: "10px", marginBottom: "10px" }} /> <br />
                            <input type="file" />
                        </div>
                        <div className='add_content' >

                            <label >Status</label>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>

                            <label>Experience: </label>
                            <input type="text" /> <br />

                            <label>Phone: </label>
                            <input type="text" /><br />

                            <label>Description: </label>
                            <input type="text" /><br />
                            <div className='button'>
                                <button type="button" className="btn btn-success">Save</button>
                                <button onClick={() => {
                                    props.setModal(false)
                                }} type="button" className="btn btn-secondary">Cancle</button>
                            </div>

                        </div>
                    </div>
                    <div className='add_service_content'>
                        <div className='add_image'>
                            <h1>Staff Service</h1>
                        </div>
                        <div className='add_content_container_service' >

                            <div className='add_content_service'>
                                <img src="https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$" alt="" />
                                <p>Service</p>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                            <div className='add_content_service'>
                                <img src="https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$" alt="" />
                                <p>Service</p>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                            <div className='add_content_service'>
                                <img src="https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$" alt="" />
                                <p>Service</p>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                            <div className='add_content_service'>
                                <img src="https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$" alt="" />
                                <p>Service</p>
                                <i className="fa-solid fa-trash"></i>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
