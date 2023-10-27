import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { Appointment } from '@/stores/slices/appointment.slice';
import { Select, Space } from 'antd';
import dayjs from "dayjs";

const AcquisitionsChart: React.FC = () => {
    const [chartData, setChartData] = useState<Appointment[]>();
    const [month, setMonth] = useState<string>(dayjs().format("MM"))
    const appointmentStore = useSelector((store: StoreType) => {
        return store.appointmentStore
    })

    const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    function handleChangeMonth(value: string) {
        setMonth(value);
    }

    useEffect(() => {
        if (appointmentStore) {
            let data = appointmentStore.data?.filter((appointment) => appointment.status === "DONE");
            if (data) {
                data = data.reduce((accumulator: any, current) => {
                    const existingItem = accumulator?.find((item: any) => item.date === current.date);
                    if (existingItem) {
                        existingItem.total += current.total;
                    } else {
                        accumulator.push({ date: current.date, total: current.total });
                    }
                    return accumulator;
                }, []);
            }
            // Lọc theo tháng
            const selectedMonth = month; // Ví dụ: Chọn tháng 10
            data = data?.filter((item) => item.date.split('/')[1] === selectedMonth);
            setChartData(data);
            console.log("data", data);
        }
    }, [appointmentStore, month]);

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
                        labels: chartData?.map(row => row.date),
                        datasets: [
                            {
                                label: 'Acquisitions by date',
                                data: chartData?.map(row => row.total),
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
    }, [chartData]);

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

export default AcquisitionsChart;
