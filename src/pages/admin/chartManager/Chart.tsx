import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const AcquisitionsChart: React.FC = () => {
    useEffect(() => {
        const data = [
            { year: 2010, count: 10 },
            { year: 2011, count: 20 },
            { year: 2012, count: 15 },
            { year: 2013, count: 25 },
            { year: 2014, count: 22 },
            { year: 2015, count: 30 },
            { year: 2016, count: 28 },
        ];

        const ctx = (document.getElementById('acquisitions') as HTMLCanvasElement).getContext('2d');

        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(row => row.year.toString()),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: data.map(row => row.count),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Add appropriate colors
                            borderColor: 'rgba(75, 192, 192, 1)', // Add appropriate colors
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
    }, []);

    return <canvas id="acquisitions" width="400" height="400"></canvas>;
};

export default AcquisitionsChart;
