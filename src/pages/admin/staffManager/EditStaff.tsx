import { useDispatch } from 'react-redux'
import './staff.scss'
import { useRef, useState } from 'react'
import api from '@/services/api';
import { Modal, message } from 'antd';
import { staffActions } from '@/stores/slices/staff.slice';

export default function EditStaff(props: any) {
    const dispatch = useDispatch()
    const [updateData, setUpdateData] = useState(props.staff);
    console.log("staff:", updateData)
    const [picture, setPicture] = useState<File | null>(null);

    const urlPreviewRef = useRef<HTMLImageElement>(null);

    const [isSwitchOn, setIsSwitchOn] = useState(updateData?.status || false);

    async function updateStaff(eventForm: any) {
        eventForm.preventDefault();
        let updateInfor = {
            experience: eventForm.target.experience.value,
            phoneNumber: eventForm.target.phoneNumber.value,
            desc: eventForm.target.desc.value,
            status: isSwitchOn,
        };
        console.log("updateInfor :", updateInfor)
        let formData = new FormData();
        formData?.append('staff', JSON.stringify(updateInfor));
        formData?.append('avatar', picture!)
        api.staffApi.update(updateData?.id, formData)
            .then((res) => {
                console.log("res", res);
                if (res.data.status === 200) {
                    message.success(res.data.message);
                    props.setModal(false);
                    setUpdateData(updateInfor)
                    setIsSwitchOn(updateInfor.status);
                    dispatch(staffActions.reload());
                } else {
                    props.setModal(false);
                    Modal.error({
                        content: "update error",
                    });
                }
            })
            .catch((err) => {
                console.log("err", err);

            })
    }

    return (
        <div>
            <div className='container_editService'>

                <form onSubmit={(eventForm) => {
                    updateStaff(eventForm);
                }}
                    className='container_content_service'>
                    <div className='add_service_content'>
                        <div className='add_image'>
                            <img src={updateData?.avatar} ref={urlPreviewRef} alt="" style={{ width: "150px", height: "150px", borderRadius: "50%", marginTop: "10px", marginBottom: "10px" }} /> <br />
                            <input accept="image/*" type="file" name='imgs'
                                onChange={(event: any) => {
                                    if (event.target.files.length === 0) {
                                        console.log('Chưa chọn hình!');
                                    } else {
                                        setPicture(event.target.files[0])
                                        let blobUrl = URL.createObjectURL(
                                            event.target.files[0]
                                        );
                                        if (urlPreviewRef.current) {
                                            urlPreviewRef.current.src = blobUrl;
                                        }

                                    }
                                }}
                            />
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

                            <label>Experience: </label>
                            <input type="text" name='experience' defaultValue={updateData?.experience} /> <br />

                            <label>Phone: </label>
                            <input type="text" name='phoneNumber' defaultValue={updateData?.phoneNumber} /><br />

                            <label>Description: </label>
                            <input type="text" name='desc' defaultValue={updateData?.desc} /><br />
                            <div className='button'>
                                <button type="submit" className="btn btn-success">Save</button>
                                <button onClick={() => {
                                    props.setModal(false)
                                }} type="submit" className="btn btn-secondary">Cancle</button>
                            </div>

                        </div>
                    </div>
                    <div className='add_service_content'>
                        <div className='add_image'>
                            <h1>Staff Service</h1>
                        </div>
                        <div className='add_content_container_service' >
                            {updateData?.staffServices?.map((item: any) => (
                                <div key={Date.now() * Math.random()} className='add_content_service'>
                                    <img src={item.service.avatar} alt="" />
                                    <p>{item.service.name}</p>
                                    <i className="fa-solid fa-trash"></i>
                                </div>
                            ))}



                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
