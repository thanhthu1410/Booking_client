import { StoreType } from '@/stores';
import { appointmentActions } from '@/stores/slices/appointment.slice';
import { Button, Result } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';

export default function Thanks() {
    const appointmentStore = useSelector((store: StoreType) => store.appointmentStore)
    const { id } = useParams()
    console.log("id", id);
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/appointments/" + id)
            .then(res => {
                if (appointmentStore) {
                    let appointmentStoreUpdate = appointmentStore.data?.map((appointment) => {
                        if (appointment.id == Number(id)) {
                            return res.data.data
                        } else {
                            return appointment
                        }
                    })
                    console.log("appointmentStore", appointmentStore);
                    let socket: Socket = io("http://localhost:3003")
                    socket.emit("acceptBooking", appointmentStoreUpdate);
                }

            })
            .catch()
    }, [id])
    const navigate = useNavigate();
    return (
        <Result
            status="success"
            title="Place Appointment Successfully!"
            subTitle="Please check your email to confirm Appointment."
            extra={[
                <Button type="primary" key="console" onClick={() => navigate("/")}>
                    Go Home
                </Button>,
                <Button key="buy">Buy Again</Button>,
            ]}
        />

    )
}
