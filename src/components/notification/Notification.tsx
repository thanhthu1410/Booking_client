import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Badge, Button, Drawer, Space } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import "./notification.scss";
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';

const Notification: React.FC = () => {
    const [open, setOpen] = useState(false);
    const appointmentStore = useSelector((store: StoreType) => {
        return store.appointmentStore
    })

    useEffect(() => {
        console.log("appointmentStore", appointmentStore)
    }, [appointmentStore])

    const showDrawer = () => {
        setOpen(!open);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <button onClick={showDrawer} className='notification__button'>
                <Space size="middle">
                    <Badge count={appointmentStore.notifications.length}>
                        {/* <BellOutlined style={{ fontSize: "1.5rem" }} /> */}
                        <i className="fa-regular fa-bell" style={{ color: "#f4f5f6", fontSize: "1.5rem" }}></i>
                    </Badge>
                </Space>
            </button>
            {open &&
                <div className='modal__container'>
                    {appointmentStore.notifications?.map((message) => (
                        <div className='modal__message' key={Math.random() * Date.now()}>
                            <Alert message={message.message} type="info" showIcon />
                            <span className='modal__message__time'>2 minutes ago</span>
                        </div>
                    ))}
                </div>}
        </>
    );
};

export default Notification;