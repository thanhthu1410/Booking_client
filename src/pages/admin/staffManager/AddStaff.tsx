
import { useNavigate } from 'react-router-dom';

import './staff.scss'

import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';

export default function AddStaff() {
    const navigate = useNavigate()

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const serviceStore = useSelector((store: StoreType) => {
        return store.serviceStore
    })
    console.log("serviceStore:", serviceStore.data)

    return (
        <div>
            <div className='Staff_container'>
                <div className='admin_title'>
                    <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                    <h3>Add Service</h3>

                </div>
                <form
                    onSubmit={(e) => {
                        console.log("ghhh");

                        // addNewService(e)
                    }}
                    className='add_staff_content'>
                    <div className='add_image'>
                        <img src="https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$" alt="" style={{ width: "200px", height: "200px", borderRadius: "50%", marginTop: "10px", marginBottom: "10px" }} /> <br />
                        <input name='imgs' type="file"

                        />

                    </div>
                    <div className='add_content' >

                        <label>Name: </label>
                        <input type="text" name='name' /> <br />

                        <label>Birthday: </label>
                        <input type="text" name='price' /><br />

                        <label>Phone: </label>
                        <input type="text" name='desc' /><br />

                        <label>Experience: </label>
                        <input type="text" name='price' /><br />

                        <label>Description: </label>
                        <input type="text" name='desc' /><br />
                    </div>
                    <div className='staff_service'>
                        <div className='staff_service_text'>
                            <h1>List Service</h1>
                        </div>
                        <div className='list_service'>

                            {serviceStore.data?.map((item: any) => (
                                <div>
                                    <Checkbox onChange={onChange}>
                                        <label>{item.name}</label>
                                    </Checkbox><br />
                                </div>

                            ))}
                        </div>
                        <div className='button_add_staff'>
                            <button type="submit" className="btn btn-dark">Add Service</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
