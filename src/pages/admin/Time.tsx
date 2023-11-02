import { useEffect, useState } from 'react';
import './time.scss';
import { useDispatch, useSelector } from 'react-redux';
import api from '@/services/api';
import { InputNumber, Space, TimePicker } from 'antd';
import { Modal, message } from 'antd';
import { StoreType } from '@/stores';
import { timeAction } from '@/stores/slices/time.slice';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function Time() {

    const dispatch = useDispatch();

    const timeStore = useSelector((store: StoreType) => {
        return store.timeStore
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
            stepMinute: Number(e.target.stepMinute.value),
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
          <div className='admin_title'>
                <h3 onClick={() => navigate("/admin/service")} className='title_1'>Admin / </h3>
                <h3>Setting Time</h3>
            </div>
            {timeStore.data && (
                <div className='admin'>
                    <form onSubmit={(e: any) => handleSubmit(e)}>
                        <div className='time__form'>
                            <div className='form_group'>
                                <label htmlFor="">Giờ bắt đầu</label><br />
                                <Space>
                                    <TimePicker onChange={(value) => { handleChangeStartTime(value) }} format='HH:mm' defaultValue={dayjs(timeStore.data?.startTime, 'HH:mm')} style={{ width: "220px" }} />
                                </Space>
                            </div>
                            <div className='form_group'>
                                <label htmlFor="">Giờ kết thúc</label><br />
                                <Space>
                                    <TimePicker onChange={(value) => { handleChangeEndTime(value) }} format='HH:mm' defaultValue={dayjs(timeStore.data?.endTime, 'HH:mm')} style={{ width: "220px" }} />
                                </Space>
                            </div>

                            <div className='form_group'>
                                <label htmlFor="">Khoảng cách 1 khung giờ (phút)</label><br />
                                <InputNumber defaultValue={timeStore.data?.stepMinute} name="stepMinute" style={{ width: "80%" }} />
                            </div>
                            <div className='form_group'>
                                <label htmlFor="">Số ngày cho đặt trước</label><br />
                                <InputNumber defaultValue={timeStore.data?.maxDate} name="daysReservation" style={{ width: "80%" }} />
                            </div>
                            <div className='form_group'>
                                <label htmlFor="">Thời gian đặt trước tối thiểu (phút)</label><br />
                                <InputNumber defaultValue={timeStore.data?.duration} name="duration" style={{ width: "80%" }} />
                            </div>
                            <div className='form_group'>
                                <label htmlFor="">Nhắc lịch trước giờ hẹn (phút)</label><br />
                                <InputNumber defaultValue={timeStore.data?.reminderTime} name="reminderTime" style={{ width: "80%" }} />
                            </div>
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
