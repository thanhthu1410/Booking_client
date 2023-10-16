
import React, { useEffect, useState } from 'react';
import { Eventcalendar } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.scss';
import { Datepicker } from "@mobiscroll/react";;
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import './calendar.scss';

const Calendar: React.FC = () => {
    const currentTime = Date.now();
    const currentDate = new Date(currentTime);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookedDates, setBookedDates] = useState<Date[]>([]);

    const timeStore = useSelector((store: StoreType) => {
        return store.timeStore
    })

    useEffect(() => {
        console.log("timeStore", timeStore)
    }, [timeStore])


    const [stepMinute, setStepMinute] = useState(15)

    const handleBookAppointment = () => {
        if (selectedDate) {
            // Check if the selected date is already booked
            if (!bookedDates.some(date => date.getTime() === selectedDate.getTime())) {
                // Here you can save the selected date to your backend or do any other necessary processing
                console.log('Lịch đã đặt:', selectedDate);
                // Add the booked date to the list of booked dates
                setBookedDates([...bookedDates, selectedDate]);
            } else {
                alert('Thời gian đã được đặt, vui lòng chọn thời gian khác.');
            }
        }
    }

    const invalidDates = bookedDates.map(date => {
        const startDate = new Date(date);
        const endDate = new Date(date);

        const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}T${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`;

        const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}T${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;

        return { start: formattedStartDate, end: formattedEndDate };
    });


    // console.log("invalidDates", invalidDates)

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + (timeStore.data as any)?.maxDate);

    return (
        <div>
            <Datepicker
                controls={['calendar', 'timegrid']}
                touchUi={true}
                themeVariant='light'
                display='inline'
                // stepMinute={20}
                stepMinute={(timeStore.data as any)?.stepMinute}
                minTime={(timeStore.data as any)?.startTime}
                maxTime={(timeStore.data as any)?.endTime}
                min={new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay() + 15, currentDate.getHours(), currentDate.getMinutes() + (timeStore.data as any)?.duration)}
                // max={new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDay() + 8)}
                max={maxDate}
                onChange={(event) => setSelectedDate(event.value)}
                invalid={invalidDates}
            />
            <button className='booktime' onClick={handleBookAppointment}>Book</button>
        </div>
    );
}

export default Calendar;
