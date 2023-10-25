
import { useRef, useState } from 'react'
import './editService.scss'
import { Modal, message } from 'antd';
import api from '@/services/api';
import { serviceActions } from '@/stores/slices/service.slice';
import { useDispatch } from 'react-redux';
import Service from '@/pages/services/Service';



export default function EditService(props: any) {
    const dispatch = useDispatch()
    const [updateData, setUpdateData] = useState(props.item);
    const [picture, setPicture] = useState<File | null>(null);
    const [modal, setModal] = useState(false)
    const [isSwitchOn, setIsSwitchOn] = useState(updateData?.status || false);
    // const [isSwitchOn, setIsSwitchOn] = useState(Boolean(updateData.status));
    const urlPreviewRef = useRef<HTMLImageElement>(null);
    //console.log("urlPreviewRef:", urlPreviewRef)

    
    async function updateService(eventForm: any) {
        eventForm.preventDefault();
        console.log("thu nekk");

        if ((eventForm.target as any).name.value == "") {
            message.warning("Please enter  Name of Service")
            return
        } else if ((eventForm.target as any).desc.value == "") {
            message.warning("Please enter value Description of Service")
            return
        } else if ((eventForm.target as any).price.value == "") {
            message.warning("Please enter value price of Service")
            return
        }

        let updateInfor = {
            ...updateData,
            name: eventForm.target.name.value,
            desc: eventForm.target.desc.value,
            price: Number(eventForm.target.price.value),
            status: isSwitchOn,
        };

        let formData = new FormData();
        formData?.append('services', JSON.stringify(updateInfor));
        formData.append("avatar", picture!)
        api.serviceApi
            .update(updateData?.id, formData)
            .then((res) => {
                if (res.status == 200) {
                    console.log("DAVAO");
                    console.log("res", res.data);


                    message.success(res.data.message);
                    props.setModal(false);
                    const updateListService = props.services.map((service: any) => {
                        if (service.id === updateData.id) {
                            return {
                                ...service,
                                name: updateInfor.name,
                                desc: updateInfor.desc,
                                price: updateInfor.price,
                                avatar: res.data.data.avatar,
                                status: updateInfor.status,
                            }
                        } else {
                            return service
                        }
                    })
                    props.setServices(updateListService);
                    // setIsSwitchOn(updateInfor.status);
                    // dispatch(serviceActions.reload());
                } else {
                    props.setModal(false);
                    Modal.error({
                        content: "update error",
                    });

                }

            })

            .catch((err) => {
                console.log('err', err);
            });
    }
    return (
        <div className='container_edit'>
            <div className='container_content'>
                <form onSubmit={(eventForm) => {
                    updateService(eventForm);
                }}
                    className='add_service_content'>
                    <div className='add_image'>
                        <img src={updateData?.avatar} ref={urlPreviewRef} alt="" style={{ width: "150px", height: "150px", borderRadius: "50%", marginTop: "10px", marginBottom: "10px" }} /> <br />
                        <input accept="image/*" name="imgs" type="file" onChange={(event: any) => {
                            if (event.target.files.length === 0) {
                                message.error("No image selected yet!")
                            } else {
                                setPicture(event.target.files[0])
                                let blobUrl = URL.createObjectURL(
                                    event.target.files[0]
                                );
                                if (urlPreviewRef.current) {
                                    urlPreviewRef.current.src = blobUrl;
                                }

                            }
                        }} />
                    </div>
                    <div className='add_content' >

                        <label >Status</label>
                        <label className="switch">
                            <input type="checkbox"
                                checked={isSwitchOn}
                                onChange={() => setIsSwitchOn(!updateData?.status)}
                            />
                            <span className="slider round"></span>
                        </label>


                        <label>Name: </label>
                        <input type="text" name='name' defaultValue={updateData?.name} /> <br />

                        <label>Price: </label>
                        <input type="text" name='price' defaultValue={updateData?.price} /><br />

                        <label>Description: </label>
                        <input type="text" name='desc' defaultValue={updateData?.desc} /><br />

                        <div className='button'>
                            <button type="submit" className="btn btn-success" >Save</button>
                            <button onClick={() => {
                                props.setModal(false)
                            }} type="button" className="btn btn-secondary">Cancle</button>
                        </div>


                    </div>
                </form>
            </div>
        </div>
    )
}
