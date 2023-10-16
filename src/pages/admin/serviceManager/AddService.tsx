import { useNavigate } from 'react-router-dom'
import './service.scss'
import { useDispatch } from 'react-redux';
import { FormEvent, MutableRefObject, useRef, useState } from 'react';
import api from '@/services/api';
import { serviceActions } from '@/stores/slices/service.slice';
import { Modal } from 'antd';


export default function AddService() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const imgPreviewRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    function addNewService(e: FormEvent<HTMLFormElement>) {
        console.log("da vao")
        e.preventDefault();

        let formData = new FormData();

        if (avatarFile) {
            formData.append("avatar", avatarFile)
        }
        let data = {
            name: (e.target as any).name.value,
            desc: (e.target as any).desc.value,
            price: (e.target as any).price.value,
        }


        formData.append("service", JSON.stringify(data))
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
        <div className='service_container'>
            <div className='admin_title'>
                <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                <h3>Add Service</h3>

            </div>
            <form
                onSubmit={(e) => {
                    console.log("ghhh");

                    addNewService(e)
                }}
                className='add_service_content'>
                <div className='add_image'>
                    <img ref={imgPreviewRef} src="https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$" alt="" style={{ width: "200px", height: "200px", borderRadius: "50%", marginTop: "10px", marginBottom: "10px" }} /> <br />
                    <input name='imgs' type="file"
                        onChange={(e) => {
                            if (e.target.files) {
                                if (e.target.files.length > 0) {
                                    (imgPreviewRef.current! as HTMLImageElement).src = URL.createObjectURL(e.target.files[0]);
                                    setAvatarFile(e.target.files[0])
                                }
                            }
                        }}
                    />
                </div>
                <div className='add_content' >

                    <label>Name: </label>
                    <input type="text" name='name' /> <br />

                    <label>Price: </label>
                    <input type="text" name='price' /><br />

                    <label>Description: </label>
                    <input type="text" name='desc' /><br />
                </div>
                <div className='button_add_service'>
                    <button type="submit" className="btn btn-dark">Add Service</button>
                </div>
            </form>
        </div>
    )
}
