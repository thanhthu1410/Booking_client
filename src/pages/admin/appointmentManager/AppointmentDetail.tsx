import { useState } from 'react';
import { Button, DatePicker, DatePickerProps, Select, Space, TimePicker } from 'antd';
import './appointmentDetail.scss';
import moment from 'moment';
import dayjs from 'dayjs';
import { Appointment } from '@/stores/slices/appointment.slice';

type AppointmentData = {
    appointmentData: Appointment;
    staffId: number | undefined;
    setShowModal: Function;
};

const status = ["PENDING", "ACCEPTED", "REJECTED", "DONE"];

export default function AppointmentDetail(props: AppointmentData) {
    const [appointmentStatus, setAppointmentStatus] = useState<string>(props.appointmentData.status);
    const [time, setTime] = useState(props.appointmentData.time);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        setAppointmentStatus(value);
    };

    function handleChangeStartTime(time: any) {
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

    return (
        <form className='appointmentDetail__container'>
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
                    Time: <TimePicker onChange={(value) => { handleChangeStartTime(value) }} format='HH:mm' defaultValue={dayjs(time, 'HH:mm')} />
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
                        {status.map((item) => (
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
                    <Button type="primary">Save</Button>
                </div>
            </div>
        </form>
    );
}
