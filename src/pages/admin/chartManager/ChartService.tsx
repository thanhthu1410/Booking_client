import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { Appointment } from '@/stores/slices/appointment.slice';
import { Select, Space } from 'antd';
import dayjs from "dayjs";

const ChartService: React.FC = () => {
    const [chartData, setChartData] = useState<Appointment[]>();
    interface ServiceData {
        serviceName: string,
        numberOfAppointments: number
    }
    const [chartDataService, setChartDataService] = useState<ServiceData[]>();
    const [month, setMonth] = useState<string>(dayjs().format("MM"))
    const appointmentStore = useSelector((store: StoreType) => {
        return store.appointmentStore
    })

    const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    function handleChangeMonth(value: string) {
        setMonth(value);
    }

    function formatData(appointments: Appointment[]): { serviceName: string, numberOfAppointments: number }[] {
        let doneAppointments = appointments.filter(appointment => appointment.status === "DONE");

        const selectedMonth = month; // Ví dụ: Chọn tháng 10
        doneAppointments = doneAppointments?.filter((item) => item.date.split('/')[1] === selectedMonth);

        const serviceCounts: { [serviceId: number]: number } = {};

        for (const appointment of doneAppointments) {
            for (const appointmentDetail of appointment.appointmentDetails) {
                const serviceId = appointmentDetail.serviceId;
                if (serviceCounts[serviceId]) {
                    serviceCounts[serviceId]++;
                } else {
                    serviceCounts[serviceId] = 1;
                }
            }
        }

        const formattedData: { serviceName: string, numberOfAppointments: number }[] = [];

        for (const serviceId in serviceCounts) {
            const serviceName = appointments[0]?.appointmentDetails.find(detail => detail.serviceId === Number(serviceId))?.service.name;

            if (serviceName) {
                formattedData.push({
                    serviceName,
                    numberOfAppointments: serviceCounts[Number(serviceId)]
                });
            }
        }

        return formattedData;
    }

    useEffect(() => {
        if (appointmentStore && appointmentStore.data) {
            setChartDataService(formatData(appointmentStore.data))
        }
    }, [appointmentStore, month])


    const chartRef = useRef<HTMLCanvasElement | null>(null);

    const chartInstanceRef = useRef<Chart<"bar", number[] | undefined, string> | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const canvas = chartRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                if (chartInstanceRef.current) {
                    (chartInstanceRef.current as any).destroy();
                }

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: chartDataService?.map(row => row.serviceName),
                        datasets: [
                            {
                                label: 'Acquisitions by service',
                                data: chartDataService?.map(row => row.numberOfAppointments),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }
    }, [chartDataService]);

    return (<>
        <Space wrap>
            <p style={{ marginBottom: "0px" }}>Month</p>
            <Select
                defaultValue={dayjs().format("MM")}
                style={{ width: 150, height: 33, marginLeft: 10 }}
                onChange={(value) => handleChangeMonth(value)}
            >
                {months.map((item) => (
                    <Select.Option key={Math.random() * Date.now()} value={item}>
                        <div>
                            <p style={{ marginBottom: "0px" }}>{item}</p>
                        </div>
                    </Select.Option>
                ))}
            </Select>
        </Space>
        <canvas ref={chartRef} id="acquisitions" width="400" height="400"></canvas></>);
};

export default ChartService;
