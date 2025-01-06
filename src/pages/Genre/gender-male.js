import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

// Enregistrement des éléments nécessaires pour le graphique
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const initialData = [
  { year: '2020', value: 28 },
  { year: '2021', value: 46 },
  { year: '2022', value: 47 },
  { year: '2023', value: 48 },
  { year: '2024', value: 49 }
];

const GenderMalePage = () => {
  const [data, setData] = useState(initialData);
  const [newYear, setNewYear] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editYear, setEditYear] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    setData([...data, { year: newYear, value: parseInt(newValue) }]);
    setNewYear('');
    setNewValue('');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditYear(data[index].year);
    setEditValue(data[index].value);
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item, index) =>
      index === editIndex ? { year: editYear, value: parseInt(editValue) } : item
    );
    setData(updatedData);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const getChartData = () => {
    return {
      labels: data.map(item => item.year),
      datasets: [
        {
          label: "Proportion des hommes bénéficiant d'une formation",
          data: data.map(item => item.value),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }
      ]
    };
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Année'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pourcentage'
        },
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    }
  };

  return (
    <Box sx={{ padding: 14 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
       
      </Typography>
      
      <Box sx={{ mt: 6, height: '500px' }}>
        <Bar data={getChartData()} options={chartOptions} />
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Ajouter ou Modifier des Données
        </Typography>
        <TextField
          label="Année"
          value={editIndex !== null ? editYear : newYear}
          onChange={(e) => (editIndex !== null ? setEditYear(e.target.value) : setNewYear(e.target.value))}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Proportion"
          type="number"
          value={editIndex !== null ? editValue : newValue}
          onChange={(e) => (editIndex !== null ? setEditValue(e.target.value) : setNewValue(e.target.value))}
          sx={{ mr: 2 }}
        />
        {editIndex !== null ? (
          <Button variant="contained" color="primary" onClick={handleSaveEdit}>Enregistrer</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAdd}>Ajouter</Button>
        )}
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Liste des Données
        </Typography>
        <List>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={`${item.year}: ${item.value}%`} />
                <IconButton onClick={() => handleEdit(index)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default GenderMalePage;
