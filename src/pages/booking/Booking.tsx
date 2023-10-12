import React from 'react';
import Calendar from '@/components/calendar/Calendar';
import "./booking.scss";

export default function Booking() {
    return (
        <div className='booking_container'>
            <div className='booking_calendar'>
                <Calendar />
            </div>
        </div>
    )
}
