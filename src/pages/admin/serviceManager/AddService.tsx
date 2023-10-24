import { useNavigate } from 'react-router-dom'
import './service.scss'
import { useDispatch } from 'react-redux';
import { FormEvent, MutableRefObject, useRef, useState } from 'react';
import api from '@/services/api';
import { serviceActions } from '@/stores/slices/service.slice';
import { Modal, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Loading from '@/pages/component/Loading';

export default function AddService() {

    const [load, setLoad] = useState(false);
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const imgPreviewRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const isNumber = (value: string) => /^\d+$/.test(value);
    function addNewService(e: FormEvent<HTMLFormElement>) {
        if ((e.target as any).name.value == "") {
            message.warning("Please enter  Name of Service")
            return
        } else if ((e.target as any).desc.value == "") {
            message.warning("Please enter value Description of Service")
            return
        } else if ((e.target as any).price.value == "") {
            message.warning("Please enter value price of Service")
            return
        } else if ((imgPreviewRef.current! as HTMLImageElement).src == "") {
            message.warning("No image selected yet!")
            return
        }
        const priceValue = (e.target as any).price.value;
        if (!priceValue || !isNumber(priceValue)) {
            message.warning("Please enter a valid numeric price for the service");
            return;
        }
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
        setLoad(true)
        api.serviceApi.create(formData)
            .then(res => {
                (document.getElementById("name") as HTMLInputElement
                ).value = "";
                (document.getElementById("desc") as HTMLInputElement
                ).value = "";
                (document.getElementById("price") as HTMLInputElement
                ).value = "";
                (document.getElementById("imgFile") as HTMLInputElement
                ).value = "";
                (imgPreviewRef.current! as HTMLImageElement).src = "https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$";
                dispatch(serviceActions.insertService(res.data));
                message.success("Add Service sucsses")
                setLoad(false)
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
                    e.preventDefault();
                    addNewService(e)
                }}
                className='add_service_content'>
                <div className='add_image'>
                    <img id='img' ref={imgPreviewRef} src="https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$" alt="" style={{ width: "200px", height: "200px", borderRadius: "50%", marginTop: "10px", marginBottom: "10px" }} /> <br />
                    <input id='imgFile' name='imgs' type="file"
                        onChange={(e) => {
                            if (e.target.files) {
                                if (e.target.files.length > 0) {
                                    (imgPreviewRef.current! as HTMLImageElement).src = URL.createObjectURL(e.target.files[0]);
                                    setAvatarFile(e.target.files[0])
                                } else {
                                    message.error("No image selected yet!");
                                }
                            }
                        }}
                    />
                </div>
                <div className='add_content' >

                    <label>Name: </label>
                    <input type="text" name='name' id='name' /> <br />

                    <label>Price: </label>
                    <input type="text" name='price' id='price' /><br />

                    <label>Description: </label>
                    <input type="text" name='desc' id='desc' /><br />
                </div>
                <div className='button_add_service'>
                    {
                        load && <Loading />
                    }
                    <button type="submit" className={`${load && ' active'} btn btn-dark btn_submit`}>
                        Add Service
                        <div className='btn_loading'>
                            <Spin indicator={antIcon} />
                        </div>
                    </button>
                </div>
            </form>
        </div>
    )
}
