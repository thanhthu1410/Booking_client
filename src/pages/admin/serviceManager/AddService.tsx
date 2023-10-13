import { useNavigate } from 'react-router-dom'
import './listService.scss'

export default function AddService() {
    const navigate = useNavigate()
    return (
        <div className='service_container'>
            <div className='admin_title'>
                <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                <h3>Add Service</h3>

            </div>
            <div className='add_service_content'>
                <div className='add_image'>
                    <img src="https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$" alt="" style={{ width: "200px", height: "200px", borderRadius: "50%", marginTop: "10px", marginBottom: "10px" }} /> <br />
                    <input type="file" />
                </div>
                <div className='add_content' >

                    <label>Name: </label>
                    <input type="text" /> <br />

                    <label>Price: </label>
                    <input type="text" /><br />

                    <label>Description: </label>
                    <input type="text" /><br />

                </div>
            </div>
        </div>
    )
}
