import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Thanks() {
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
