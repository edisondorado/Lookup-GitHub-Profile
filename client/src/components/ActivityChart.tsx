import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ContributionDay {
    date: string;
    contributionCount: number;
}

interface Week {
    contributionDays: ContributionDay[];
}

interface ActivityChartProps {
    totalContributions: number;
    weeks: Week[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ weeks }) => {
    const contributionDays: ContributionDay[] = (weeks || []).flatMap((week) => week.contributionDays);

    const data = {
        labels: contributionDays.map((day) => day.date),
        datasets: [
            {
                label: 'Contributions',
                data: contributionDays.map((day) => day.contributionCount),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
                fill: true,
                pointRadius: 2,
                pointHoverRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'GitHub Contributions Over Time',
                font: {
                    size: 18,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `Contributions: ${context.parsed.y}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
                ticks: {
                    maxRotation: 90,
                    minRotation: 45,
                    autoSkip: true,
                    maxTicksLimit: 14,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Contributions',
                },
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default ActivityChart;
