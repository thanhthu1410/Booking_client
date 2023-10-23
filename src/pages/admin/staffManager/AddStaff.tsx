
import { useNavigate } from 'react-router-dom';

import './staff.scss'

import { Checkbox, message } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { FormEvent, MutableRefObject, useRef, useState } from 'react';
import api from '@/services/api';
import { staffActions } from '@/stores/slices/staff.slice';

export default function AddStaff() {
    const navigate = useNavigate()

    const [selectedServices, setSelectedServices] = useState<number[]>([]);

    const onChange = (checkedValues: any) => {
        console.log("Checked values:", checkedValues);
        setSelectedServices(checkedValues);
    };
    const serviceStore = useSelector((store: StoreType) => {
        return store.serviceStore
    })


    const dispatch = useDispatch()
    const imgPreviewRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    function addNewStaff(e: FormEvent<HTMLFormElement>) {
        if ((e.target as any).name.value == "") {
            message.warning("Please enter value Name of Staff")
            return
        } else if ((e.target as any).desc.value == "") {
            message.warning("Please enter value Description of Staff")
            return
        } else if ((e.target as any).birthDay.value == "") {
            message.warning("Please enter value birthday of Staff")
            return
        }
        else if ((e.target as any).experience.value == "") {
            message.warning("Please enter value Experience of Staff")
            return
        }
        else if ((e.target as any).phoneNumber.value == "") {
            message.warning("Please enter value Phone Number of Staff")
            return
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
            birthDay: (e.target as any).birthDay.value,
            experience: (e.target as any).experience.value,
            phoneNumber: (e.target as any).phoneNumber.value,
            serviceList: selectedServices
        }


        formData.append("staff", JSON.stringify(data))
        api.staffApi.create(formData)
            .then(res => {
                (document.getElementById("name") as HTMLInputElement
                ).value = "";
                (document.getElementById("desc") as HTMLInputElement
                ).value = "";
                (document.getElementById("birthDay") as HTMLInputElement
                ).value = "";
                (document.getElementById("experience") as HTMLInputElement
                ).value = "";
                (document.getElementById("phoneNumber") as HTMLInputElement
                ).value = "";
                (document.getElementById("imgFile") as HTMLInputElement
                ).value = "";
                (imgPreviewRef.current! as HTMLImageElement).src = "https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$";
                setSelectedServices([]);
                //console.log("res", res)
                dispatch(staffActions.insertStaff(res.data));
                message.success("Add Staff sucsses")
            })
            .catch(err => {
                console.log("err", err);
            })

    }




    return (
        <div>
            <div className='Staff_container'>
                <div className='admin_title'>
                    <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                    <h3>Add Staff</h3>

                </div>
                <form
                    onSubmit={(e) => {
                        console.log("ghhh");
                        e.preventDefault();
                        addNewStaff(e)
                    }}
                    className='add_staff_content'>
                    <div className='add_image'>
                        <img ref={imgPreviewRef} src="https://content.gobsn.com/i/bodyandfit/no-xplode_Image_01?layer0=$PDP$" alt="" style={{ width: "200px", height: "200px", borderRadius: "50%", marginTop: "10px", marginBottom: "10px" }} /> <br />
                        <input id='imgFile' name='imgs' type="file"
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
                        <input type="text" name='name' id='name' /> <br />

                        <label>Birthday: </label>
                        <input type="text" name='birthDay' id='birthDay' /><br />

                        <label>Phone: </label>
                        <input type="text" name='phoneNumber' id='phoneNumber' /><br />

                        <label>Experience: </label>
                        <input type="text" name='experience' id='experience' /><br />

                        <label>Description: </label>
                        <input type="text" name='desc' id='desc' /><br />
                    </div>
                    <div className='staff_service'>
                        <div className='staff_service_text'>
                            <h1>List Service</h1>
                        </div>
                        <div className='list_service'>
                            <Checkbox.Group onChange={onChange} value={selectedServices}>
                                {serviceStore.data?.map((item: any) => (
                                    <div key={item.id}>
                                        <Checkbox value={item.id}>
                                            <label>{item.name}</label>
                                        </Checkbox>
                                        <br />
                                    </div>
                                ))}
                            </Checkbox.Group>
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
