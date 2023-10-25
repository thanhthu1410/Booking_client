import { useDispatch, useSelector } from 'react-redux';
import './timePicker.scss';
import { StoreType } from '@/stores';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { timeAction } from '@/stores/slices/time.slice';
import { message } from 'antd';
import { Appointment } from '@/stores/slices/appointment.slice';

interface TimePickerProps {
    startTime: string | undefined;
    endTime: string | undefined;
    minTime: number | undefined;
    timeBooking: string | undefined;
    setTimeBooking: any;
    stepMinute: number | undefined
}

export default function TimePicker({ startTime, endTime, minTime, timeBooking, setTimeBooking, stepMinute }: TimePickerProps) {
    const appointmentStore = useSelector((store: StoreType) => store.appointmentStore)

    const [activeTime, setActiveTime] = useState<string | null>(null);

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

    const times = startTime && endTime ? generateTimes(startTime, endTime) : [];

    const currentDateTime = moment(new Date()).add(minTime, 'minutes').format('HH:mm');

    return (
        <div className='timePicker_container'>
            {times.map((time, index) => {

                let isSelectable = false
                if (time > currentDateTime) {
                    isSelectable = true
                }
                appointmentStore.data?.map((appointment: Appointment) => {
                    if (appointment.time == time && appointment.status == "ACCEPTED") {
                        isSelectable = false;
                    }
                })

                return (
                    <div
                        key={index}
                        className={`timePicker_time ${time === activeTime ? "activeTime" : ""} ${isSelectable ? "selectable" : "notSelectable"}`}
                        onClick={() => {

                            if (moment(new Date()).add(minTime, 'minutes').format('HH:mm') > time) {
                                isSelectable = false;
                                message.warning(`Đặt bàn tối thiểu trước ${minTime} minutes`)
                            }
                            if (isSelectable) {
                                setActiveTime(time === activeTime ? null : time);
                                setTimeBooking(time === activeTime ? null : time)
                            }
                        }}
                    >
                        {time}
                    </div>
                );
            })}
        </div>
    );
}





