import { useSelector } from 'react-redux';
import './listAppointment.scss';
import { StoreType } from '@/stores';
import { useEffect, useState } from 'react';
import AppointmentDetail from './AppointmentDetail';
import CalendarAntd from '@/components/calendarAntd/CalendarAntd';
import { DatePicker, DatePickerProps, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { Appointment } from '@/stores/slices/appointment.slice';

interface TimePickerProps {
    startTime: string | undefined;
    endTime: string | undefined;
    minTime: number | undefined;
    timeBooking: string | undefined;
    setTimeBooking: any;
    stepMinute: number
}

export default function ListAppointment() {
    const timeStore = useSelector((store: StoreType) => {
        return store.timeStore
    })

    const appointmentStore = useSelector((store: StoreType) => {
        return store.appointmentStore
    })

    const staffStore = useSelector((store: StoreType) => {
        return store.staffStore
    })

    const stepMinute = timeStore.data?.stepMinute || 0;

    const generateTimes = (start: string, end: string) => {
        const times = [];
        const [startHour, startMinute] = start.split(':').map(Number);

        // Đặt endHour và endMinute từ tham số end
        const [endHour, endMinute] = end.split(':').map(Number);

        let hour = startHour;
        let minute = startMinute;

        while (hour < endHour || (hour === endHour && minute <= endMinute)) {
            times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
            if (stepMinute) {
                minute += stepMinute;
            }
            if (minute >= 60) {
                hour += Math.floor(minute / 60);
                minute = minute % 60;
            }
        }

        return times;
    };

    const times = timeStore.data?.startTime && timeStore.data?.endTime ? generateTimes(timeStore.data?.startTime, timeStore.data?.endTime) : [];

    const [appointmentData, setAppointmentDetail] = useState<Appointment>();

    const [datePicked, setDatePicked] = useState<any>(dayjs().format('DD/MM/YYYY'));

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (date) {
            setDatePicked(date.format('DD/MM/YYYY'));
        }
    };

    const [dateRange, setDateRange] = useState();

    const [staffId, setStaffId] = useState<number | undefined>();

    const [showModal, setShowModal] = useState(false);

    const status = ["ALL", "PENDING", "ACCEPTED", "REJECTED", "DONE"];

    const [appointmentStatus, setAppointmentStatus] = useState<string>("ALL");

    const handleChange = (value: string) => {
        setAppointmentStatus(value);
    };

    return (
        <div className='List_appointment_container'>
            <h2>List Appointments</h2>
            <DatePicker onChange={onChange} value={dateRange} defaultValue={dayjs()} format="DD/MM/YYYY" />
            <Space wrap>
                <Select
                    defaultValue="Status"
                    style={{ width: 150, height: 33, marginLeft: 10 }}
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
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {staffStore.data?.map((staff) => (
                            <th key={Math.random() * Date.now()}>{staff.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {times.map((time) => (
                        <tr key={time}>
                            <td style={{ width: "100px" }}>{time}</td>
                            {staffStore.data?.map((staff) => (
                                <td key={Math.random() * Date.now()} className='appointment'>
                                    {appointmentStore.data?.filter(appointment =>
                                        appointment.date == datePicked &&
                                        appointment.time === time &&
                                        appointment.appointmentDetails.some(detail => detail.staffId === staff.id) &&
                                        (appointmentStatus === "ALL" && appointment.status != "REJECTED" || appointment.status === appointmentStatus)
                                    )
                                        .map(appointment => {
                                            return (
                                                <div key={appointment.id} className={`appointment__detail ${appointment.status == "ACCEPTED" ? "accepted" : appointment.status == "REJECTED" ? "rejected" : appointment.status == "DONE" ? "done" : ""}`} onClick={() => {
                                                    setAppointmentDetail(appointment);
                                                    setStaffId(staff.id);
                                                    setShowModal(true);
                                                }}>
                                                    <p className='customer__name'>Customer: {appointment.customer.fullName}</p>
                                                    <p>Status: {appointment.status}</p>
                                                    {appointment.appointmentDetails.filter(service => service.staffId == staff.id).
                                                        map((item) => (
                                                            <p key={Math.random() * Date.now()}>Service: {item.service.name}</p>
                                                        ))}
                                                    <p>Total: ${appointment.total}</p>
                                                </div>
                                            )
                                        })}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {appointmentData && showModal && <AppointmentDetail appointmentData={appointmentData} staffId={staffId} setShowModal={setShowModal} />}
        </div>
    )
}
