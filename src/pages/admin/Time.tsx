import React, { useEffect, useState } from 'react';
import './time.scss';
import { useDispatch, useSelector } from 'react-redux';
import { timeAction } from '@/stores/slices/time.slice';
import { StoreType } from '@/stores';
import api from '@/services/api';
import { Datepicker } from '@mobiscroll/react';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

export default function Time() {

    const dispatch = useDispatch();

    const [start, setStart] = useState<string>();
    const [end, setEnd] = useState<string>();
    useEffect(() => {
        console.log("start", start)
    }, [start])
    useEffect(() => {
        console.log("end", end)
    }, [end])
    function handleSubmit(e: any) {
        e.preventDefault();
        let data = {
            duration: e.target.duration.value,
            startTime: start,
            endTime: end,
            maxDate: e.target.daysReservation.value,
            stepMinute: e.target.minimumPeriod.value
        }
        console.log("data", data)
        api.timeApi.update(data)
            .then(res => {
                if (res.status == 200) {
                    console.log("res", res);
                }
            })
            .catch(err => {
                console.log("err", err);
            })
    }
    return (
        <div className='admin'>
            <form onSubmit={(e: any) => handleSubmit(e)}>
                {/* <div className='form_group'>
                    <label htmlFor="">Start Time</label><br />
                    <Datepicker
                        controls={['time']}
                        timeFormat="HH:mm"
                        onChange={(e) => {
                            setStart(e.value)
                            console.log(start)
                        }}
                    />
                    <input type="text" name="startTime" />
                </div>
                <div className='form_group'>
                    <label htmlFor="">End Time</label><br />
                    <input type="text" name="endTime" />
                    <Datepicker
                        controls={['time']}
                        timeFormat="HH:mm"
                        onChange={(e) => setEnd(e.value)}
                    />
                </div> */}
                <div className='form_group'>
                    <label htmlFor="">Start Time</label><br />
                    <Datepicker
                        controls={['time']}
                        timeFormat="HH:mm"
                        onChange={(e) => {
                            let date = new Date(e.value)
                            const startTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                            setStart(startTime)
                        }}
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor="">End Time</label><br />
                    <Datepicker
                        controls={['time']}
                        timeFormat="HH:mm"
                        onChange={(e) => {
                            let date = new Date(e.value)
                            const endTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                            setEnd(endTime)
                        }}
                    />
                </div>

                <div className='form_group'>
                    <label htmlFor="">Time Duration</label><br />
                    <input type="text" name="duration" />
                </div>
                <div className='form_group'>
                    <label htmlFor="">Number of days for reservation</label><br />
                    <input type="text" name="daysReservation" />
                </div>
                <div className='form_group'>
                    <label htmlFor="">Minimum booking period</label><br />
                    <input type="text" name="minimumPeriod" />
                </div>
                <button type='submit' className='save_button'>Save</button>
            </form>
        </div>
    )
}
