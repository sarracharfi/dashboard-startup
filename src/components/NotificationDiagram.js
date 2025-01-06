import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const NotificationDiagram = () => {
  const data = {
    labels: ['Email', 'SMS', 'Push Notification', 'In-App Message'],
    datasets: [
      {
        label: 'Notifications',
        data: [50, 20, 15, 15],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={styles.chartContainer}>
      <h2 style={styles.chartTitle}>Notification Types</h2>
      <Pie data={data} />
    </div>
  );
};

const styles = {
  chartContainer: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  chartTitle: {
    textAlign: 'center',
    marginBottom: '20px',
  },
};

export default NotificationDiagram;
