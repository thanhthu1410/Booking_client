import { useEffect, useState } from 'react';
import { Button, DatePicker, DatePickerProps, Select, Space, TimePicker } from 'antd';
import './appointmentDetail.scss';
import dayjs from 'dayjs';
import { Appointment, appointmentActions } from '@/stores/slices/appointment.slice';
import api from '@/services/api';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';

type AppointmentData = {
    appointmentData: Appointment;
    staffId: number | undefined;
    setShowModal: Function;
};

const status = ["PENDING", "ACCEPTED", "REJECTED", "DONE"];

export default function AppointmentDetail(props: AppointmentData) {
    const [appointmentStatus, setAppointmentStatus] = useState<string>(props.appointmentData.status);
    const [time, setTime] = useState(props.appointmentData.time);

    const appointmentStore = useSelector((store: StoreType) => {
        return store.appointmentStore
    })

    useEffect(() => {
        console.log("appointmentStore", appointmentStore)
    }, [appointmentStore])

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        setAppointmentStatus(value);
    };

    function handleChangeTime(time: any) {
        if (time) {
            const formattedTime = time.format('HH:mm');
            setTime(formattedTime)
        }
    }

    const [datePicked, setDatePicked] = useState<any>(dayjs(props.appointmentData.date).format('DD/MM/YYYY'));

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (date) {
            setDatePicked(date.format('DD/MM/YYYY'));
        }
    };

    const dispatch = useDispatch();

    function handleUpdateAppointment(e: React.FormEvent) {
        e.preventDefault();
        let data = {
            status: appointmentStatus,
            time
        }
        console.log("data", data);
        api.appointmentApi.update(props.appointmentData.id, data)
            .then(res => {
                if (res.status == 200) {
                    console.log("res", res.data.data)
                    if (appointmentStore) {
                        let updatedAppointmentStore = appointmentStore.data?.map((appointment) => {
                            if (appointment.id == res.data.data.id) {
                                return res.data.data
                            } else {
                                return appointment;
                            }
                        })
                        dispatch(appointmentActions.setData(updatedAppointmentStore));
                        props.setShowModal(false);
                    }
                }
            })
            .catch(err => {
                console.log("err", err);
            })
    }

    return (
        <form className='appointmentDetail__container' onSubmit={(e) => {
            handleUpdateAppointment(e)
        }}>
            <div className='appointmentDetail__content'>
                <div className='appointmentDetail__header'>
                    <button onClick={() => props.setShowModal(false)}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div>
                    <p>Customer Name: {props.appointmentData.customer.fullName}</p>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    Date: <DatePicker onChange={onChange} defaultValue={dayjs(props.appointmentData.date, "DD/MM/YYYY")} format="DD/MM/YYYY" />
                </div>
                <Space>
                    Time: <TimePicker onChange={(value) => { handleChangeTime(value) }} format='HH:mm' defaultValue={dayjs(time, 'HH:mm')} />
                </Space>
                <div>
                    {props.appointmentData.appointmentDetails
                        .filter(service => service.staffId === props.staffId)
                        .map((item) => (
                            <div key={Math.random() * Date.now()}>
                                <p key={item.service.name}>{item.service.name}: ${item.service.price}</p>
                                <p>{item.service.desc} minute</p>
                            </div>

                        ))}
                </div>
                <Space wrap>
                    <Select
                        defaultValue="Status"
                        style={{ width: 150, height: 40 }}
                        onChange={(value) => handleChange(value)}
                        value={appointmentStatus}
                    >
                        {appointmentStatus != "DONE" && status.map((item) => (
                            <Select.Option key={Math.random() * Date.now()} value={item}>
                                <div>
                                    <p style={{ marginBottom: "0px" }}>{item}</p>
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                </Space>
                <div className='appointmentDetail__footer'>
                    <Button className='close__button' type="primary" onClick={() => props.setShowModal(false)}>Close</Button>
                    {appointmentStatus != "DONE" ? <button type='submit' className='save__button'>Save</button> : <button type='button' className='save__button done'>Save</button>}
                </div>
            </div>
        </form>
    );
}
