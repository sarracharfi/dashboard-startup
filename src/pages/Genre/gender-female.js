import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GenderFemalePage = () => {
  const [data, setData] = useState([
    { id: 1, year: '2020', percentage: 20 },
    { id: 2, year: '2021', percentage: 37 },
    { id: 3, year: '2022', percentage: 46 },
    { id: 4, year: '2023', percentage: 47 },
    { id: 5, year: '2024', percentage: 48 },
  ]);
  
  const [editId, setEditId] = useState(null);
  const [newYear, setNewYear] = useState('');
  const [newPercentage, setNewPercentage] = useState('');

  const handleAdd = () => {
    setData([...data, { id: Date.now(), year: newYear, percentage: parseInt(newPercentage, 10) }]);
    setNewYear('');
    setNewPercentage('');
  };

  const handleEdit = (id) => {
    const item = data.find((item) => item.id === id);
    setNewYear(item.year);
    setNewPercentage(item.percentage);
    setEditId(id);
  };

  const handleUpdate = () => {
    setData(data.map((item) => (item.id === editId ? { ...item, year: newYear, percentage: parseInt(newPercentage, 10) } : item)));
    setEditId(null);
    setNewYear('');
    setNewPercentage('');
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const getChartData = () => ({
    labels: data.map((item) => item.year),
    datasets: [
      {
        label: "Proportion des femmes bénéficiant d'une formation",
        data: data.map((item) => item.percentage),
        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
          borderColor: 'rgba(54, 162, 235, 1)',
        
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Année',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pourcentage',
        },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <Box sx={{ padding: 12}}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
      
      </Typography>

      <Box sx={{ mt: 3, height: '500px' }}>
        <Bar data={getChartData()} options={chartOptions} />
      </Box>

      <Box sx={{ mt: 12}}>
       
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Année</TableCell>
                <TableCell>Pourcentage</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(item.id)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField label="Année" value={newYear} onChange={(e) => setNewYear(e.target.value)} />
          <TextField
            label="Pourcentage"
            type="number"
            value={newPercentage}
            onChange={(e) => setNewPercentage(e.target.value)}
          />
          {editId ? (
            <Button variant="contained" onClick={handleUpdate}>
              Mettre à jour
            </Button>
          ) : (
            <Button variant="contained" onClick={handleAdd}>
              Ajouter
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GenderFemalePage;
