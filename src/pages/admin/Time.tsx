import { useEffect, useState } from 'react';
import './time.scss';
import { useDispatch, useSelector } from 'react-redux';
import api from '@/services/api';
import { Datepicker } from '@mobiscroll/react';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Modal, message } from 'antd';
import { StoreType } from '@/stores';

export default function Time() {

    const dispatch = useDispatch();

    const timeStore = useSelector((store: StoreType) => {
        return store.timeStore
    });

    useEffect(() => {
        console.log("timeStore", timeStore)
    }, [timeStore])

    const [loading, setLoading] = useState(false);

    const [start, setStart] = useState(timeStore.data?.startTime);
    const [end, setEnd] = useState(timeStore.data?.endTime);

    function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        let data = {
            duration: Number(e.target.duration.value),
            startTime: start,
            endTime: end,
            maxDate: Number(e.target.daysReservation.value),
            stepMinute: Number(e.target.minimumPeriod.value)
        }
        api.timeApi.update(data)
            .then(res => {
                if (res.status == 200) {
                    setLoading(false);
                    Modal.success({
                        title: "Thông báo",
                        content: "Cập nhật thời gian thành công!"
                    })
                    console.log("res", res);
                }
            })
            .catch(err => {
                setLoading(false);
                message.warning("Cập nhật thời gian thất bại")
            })
    }
    return (
        <>
            {timeStore.data && (
                <div className='admin'>
                    <form onSubmit={(e: any) => handleSubmit(e)}>
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
                                defaultSelection={timeStore.data?.startTime}
                                value={start}
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
                                defaultSelection={timeStore.data?.endTime}
                                value={end}
                            />
                        </div>

                        <div className='form_group'>
                            <label htmlFor="">Time Duration</label><br />
                            <input type="text" name="duration" defaultValue={timeStore.data?.stepMinute} />
                        </div>
                        <div className='form_group'>
                            <label htmlFor="">Number of days for reservation</label><br />
                            <input type="text" name="daysReservation" defaultValue={timeStore.data?.maxDate} />
                        </div>
                        <div className='form_group'>
                            <label htmlFor="">Minimum booking period</label><br />
                            <input type="text" name="minimumPeriod" defaultValue={timeStore.data?.duration} />
                        </div>
                        <button type='submit' className='save_button'>
                            {loading ? <span className='loading-spinner'></span> : "Save"}
                        </button>
                    </form>
                </div>
            )}
        </>

    )
}
