import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  languageCount: { [key: string]: number };
};

export default function LanguagePieChart({ languageCount }: Props) {
  const labels = Object.keys(languageCount);
  const values = Object.values(languageCount);

  const data = {
    labels,
    datasets: [
      {
        label: 'Languages',
        data: values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#AA336A',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return <Pie data={data} options={options} />;
}
