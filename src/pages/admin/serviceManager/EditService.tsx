import React from 'react'
import './editService.scss'
export default function EditService() {
    return (
        <div className='container_edit'>
            <div className='container_content'>
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

                        <label>Name: </label>
                        <input type="text" /> <br />

                        <label>Price: </label>
                        <input type="text" /><br />

                        <label>Description: </label>
                        <input type="text" /><br />

                        <div className='button'>
                            <button type="button" className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-secondary">Cancle</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
