import { useDispatch, useSelector } from 'react-redux'
import './staff.scss'
import { useRef, useState } from 'react'
import api from '@/services/api';
import { Modal, Spin, message } from 'antd';
import { staffActions } from '@/stores/slices/staff.slice';
import { StoreType } from '@/stores';
import { LoadingOutlined } from '@ant-design/icons';
import Loading from '@/pages/component/Loading';


export default function EditStaff(props: any) {

    const [load, setLoad] = useState(false);
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    const dispatch = useDispatch()
    const [updateData, setUpdateData] = useState(props.staff);
    console.log(" updateData:", updateData)
    const [picture, setPicture] = useState<File | null>(null);
    const [isDelete, setIsDelete] = useState(false);
    const urlPreviewRef = useRef<HTMLImageElement>(null);
    const [isSwitchOn, setIsSwitchOn] = useState(updateData?.status || false);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    console.log("selectedServiceId", selectedServiceId);

    async function updateStaff(eventForm: any) {
        if ((eventForm.target as any).desc.value == "") {
            message.warning("Please enter value Description of Staff")
            return
        }
        else if ((eventForm.target as any).experience.value == "") {
            message.warning("Please enter value Experience of Staff")
            return
        }
        else if ((eventForm.target as any).phoneNumber.value == "") {
            message.warning("Please enter value Phone Number of Staff")
            return
        }
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
        // setLoad(true)
        api.staffApi.update(updateData?.id, formData)
            .then((res) => {
                if (res.status == 200) {
                    message.success("Update Staff Successfull!");
                    props.setModal(false);
                    setUpdateData(updateInfor)
                    setIsSwitchOn(updateInfor.status);
                    dispatch(staffActions.reload());
                    //setLoad(false)
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



    function handleDeleteStaffService(id: any) {
        api.staffApi.deleteStaffService(id)
            .then(res => {
                if (res.status === 200) {
                    message.success("Delete Ok!")
                    setIsDelete(!isDelete)
                    setUpdateData({ ...updateData, staffServices: updateData.staffServices?.filter((services: any) => services.id !== id) })
                    //dispatch(staffActions.reload())
                } else {
                    message.error("Delete fail")
                }
            })
            .catch(err => console.log("err", err)
            )


    }


    const serviceStore = useSelector((store: StoreType) => {
        return store.serviceStore
    })
    // console.log("🚀 serviceStore ~ serviceStore:", serviceStore.data)

    const staffStore = useSelector((store: StoreType) => {
        return store.staffStore
    })
    // console.log("staffStore ~ staffStore:", staffStore.data)




    const handleAddService = (e: any) => {
        e.preventDefault();
        if (!selectedServiceId) {
            message.warning("Please select a service");
            return;
        }
        const serviceData = {
            serviceId: Number(selectedServiceId),
            staffId: Number(updateData?.id),
        };
        api.staffApi.createStaffService(serviceData)
            .then((res) => {
                // console.log("davao");
                console.log(" res:", res)
                if (res.status == 200) {
                    const dataFilterService = serviceStore.data?.filter((service) => Number(service.id) === Number(selectedServiceId))
                    const newDataService = [...updateData?.staffServices]
                    if (dataFilterService && dataFilterService?.length > 0) {
                        newDataService.push({ id: res?.data?.data?.id, service: dataFilterService[0], serviceId: dataFilterService[0]?.id, staffId: updateData?.id })
                        setUpdateData({ ...updateData, staffServices: newDataService })
                        //console.log("newcvf", newDataService);

                    }
                    message.success("Create Service Successful");
                } else {
                    message.error("Create Service fail");
                }
            })
            .catch((err) => console.log("err", err));
    };

    function selectOption(e: any) {
        setSelectedServiceId(e.target.value);
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
                            <img src={updateData?.avatar} ref={urlPreviewRef} alt="" /> <br />
                            <input accept="image/*" type="file" name='imgs'
                                onChange={(event: any) => {
                                    if (event.target.files.length === 0) {
                                        message.error("No image selected yet!")
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

                            <div className='status_container'>
                                <label >Status :</label>
                                <label className="switch">
                                    <input type="checkbox"
                                        checked={isSwitchOn}
                                        onChange={() => setIsSwitchOn(!updateData?.status)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            <label>Experience: </label>
                            <input type="text" name='experience' defaultValue={updateData?.experience} /> <br />

                            <label>Phone: </label>
                            <input type="text" name='phoneNumber' defaultValue={updateData?.phoneNumber} /><br />

                            <label>Description: </label>
                            <input type="text" name='desc' defaultValue={updateData?.desc} /><br />
                            <div className='button'>
                                {
                                    load && <Loading />
                                }
                                <button type="submit" className={`${load && ' active'} btn btn-success btn_submit`}>
                                    Save
                                    <div className='btn_loadingg'>
                                        <Spin indicator={antIcon} />
                                    </div>
                                </button>
                                <button onClick={() => {
                                    props.setModal(false)
                                }} type="button" className="btn btn-secondary">Cancle</button>
                            </div>

                        </div>
                    </div>
                    <div className='add_service_content2'>
                        <div className='add_service_container'>
                            <h2>Staff Service</h2>
                        </div>
                        <div className='add_service'>
                            <div>
                                <select name="serviceId"
                                    id="serviceDropdown"

                                    onChange={(e: any) => {
                                        selectOption(e);
                                    }}
                                    onBlur={(e) => {
                                        // Đảm bảo rằng selectedServiceId được cập nhật khi rời khỏi phần tử select
                                        selectOption(e);
                                    }}
                                >
                                    {/* <option >Chossed All Service... </option> */}
                                    {updateData?.staffServices.length == serviceStore?.data?.length && <option>Chossed All Service... </option>}
                                    {serviceStore?.data?.map((service) => {
                                        const isServiceAdded = updateData?.staffServices?.some((item: any) => item.service.id === service.id);
                                        if (!isServiceAdded) {
                                            return (
                                                <option
                                                    key={service.id} value={service.id} >{service.name}
                                                </option>
                                            );
                                        }
                                        return null;
                                    })}
                                </select>
                            </div>
                            <div>
                                <button onClick={(e: any) => {
                                    e.preventDefault(e)
                                    handleAddService(e)
                                }} type="button" className="btn btn-success">+ Service</button>
                            </div>
                        </div>
                        <div className='add_content_container_service'>
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Avartar</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {updateData?.staffServices?.map((item: any) => {
                                        const serviceInData = serviceStore?.data?.find((service) => service.id === item.service.id);
                                        // Chỉ hiển thị nếu dịch vụ có trong serviceStore?.data?
                                        if (serviceInData) {
                                            return (
                                                <tr key={item.id} >
                                                    <td><img style={{ width: "50px", height: "50px", }} src={item?.service?.avatar} alt="" /></td>
                                                    <td><p>{item.service.name}</p></td>
                                                    <td><i onClick={(e) => {
                                                        setIsDelete(!isDelete);
                                                        e.preventDefault();
                                                        handleDeleteStaffService(item.id);
                                                    }} className="fa-solid fa-trash"></i></td>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}

                                </tbody>
                            </table>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
