import { useEffect, useState } from 'react';
import './time.scss';
import { useDispatch, useSelector } from 'react-redux';
import api from '@/services/api';
import { Space, TimePicker } from 'antd';
import { Modal, message } from 'antd';
import { StoreType } from '@/stores';
import { timeAction } from '@/stores/slices/time.slice';
import dayjs from 'dayjs';

export default function Time() {

    const dispatch = useDispatch();

    const timeStore = useSelector((store: StoreType) => {
        return store.timeStore
    });

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
            stepMinute: Number(e.target.minimumPeriod.value),
            reminderTime: Number(e.target.reminderTime.value)
        }
        api.timeApi.update(data)
            .then(res => {
                if (res.status == 200) {
                    setLoading(false);
                    Modal.success({
                        title: "Thông báo",
                        content: "Cập nhật thời gian thành công!"
                    });
                    dispatch(timeAction.setData(res.data.data))
                    console.log("res", res);
                }
            })
            .catch(err => {
                setLoading(false);
                message.warning("Cập nhật thời gian thất bại")
            })
    }

    function handleChangeStartTime(time: any) {
        if (time) {
            const formattedTime = time.format('HH:mm');
            setStart(formattedTime)
        }
    }

    function handleChangeEndTime(time: any) {
        if (time) {
            const formattedTime = time.format('HH:mm');
            setEnd(formattedTime)
        }
    }
    return (
        <>
            {timeStore.data && (
                <div className='admin'>
                    <form onSubmit={(e: any) => handleSubmit(e)}>
                        <div className='form_group'>
                            <label htmlFor="">Start Time</label><br />
                            <Space>
                                <TimePicker onChange={(value) => { handleChangeStartTime(value) }} format='HH:mm' defaultValue={dayjs(timeStore.data?.startTime, 'HH:mm')} />
                            </Space>
                        </div>
                        <div className='form_group'>
                            <label htmlFor="">End Time</label><br />
                            <Space>
                                <TimePicker onChange={(value) => { handleChangeEndTime(value) }} format='HH:mm' defaultValue={dayjs(timeStore.data?.endTime, 'HH:mm')} />
                            </Space>
                        </div>

                        <div className='form_group'>
                            <label htmlFor="">Khoảng cách 1 khung giờ (phút)</label><br />
                            <input type="text" name="duration" defaultValue={timeStore.data?.stepMinute} />
                        </div>
                        <div className='form_group'>
                            <label htmlFor="">Số ngày cho đặt trước</label><br />
                            <input type="text" name="daysReservation" defaultValue={timeStore.data?.maxDate} />
                        </div>
                        <div className='form_group'>
                            <label htmlFor="">Thời gian đặt trước tối thiểu (phút)</label><br />
                            <input type="text" name="minimumPeriod" defaultValue={timeStore.data?.duration} />
                        </div>
                        <div className='form_group'>
                            <label htmlFor="">Nhắc lịch trước giờ hẹn (phút)</label><br />
                            <input type="text" name="reminderTime" defaultValue={timeStore.data?.duration} />
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
