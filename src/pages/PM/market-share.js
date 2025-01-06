import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const initialData = [
  { label: 'Contribution au PIB', value: 7.5 },
  { label: 'Préparation à l\'IA', value: 2 },
  { label: 'Emplois TIC', value: 113000 },
  { label: 'Entreprises canadiennes', value: 27 },
  { label: 'Entreprises étrangères', value: 12 },
  { label: 'Pénétration de la data mobile', value: 75.2 },
];

const MarketShare = () => {
  const [data, setData] = useState(initialData);
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    setData([...data, { label: newLabel, value: parseFloat(newValue) }]);
    setNewLabel('');
    setNewValue('');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditLabel(data[index].label);
    setEditValue(data[index].value);
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item, index) =>
      index === editIndex ? { label: editLabel, value: parseFloat(editValue) } : item
    );
    setData(updatedData);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const getChartData = () => {
    return {
      labels: data.map(item => item.label),
      datasets: [
        {
          label: 'Indicateur',
          data: data.map(item => item.value),
          borderColor: 'rgba(128, 0, 128, 1)',  // Couleur du bord du graphique (violet foncé)
          backgroundColor: 'rgba(128, 0, 128, 0.2)',  // Couleur de fond du graphique (violet clair)
          borderWidth: 2,
          tension: 0.1,
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
          text: 'Indicateur'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Valeur'
        },
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    }
  };

  return (
    <Box sx={{ padding: 8}}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        
      </Typography>

      <Box sx={{ mt: 12, height: '500px' }}>
        <Line data={getChartData()} options={chartOptions} />
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Ajouter ou Modifier des Données
        </Typography>
        <TextField
          label="Label"
          value={editIndex !== null ? editLabel : newLabel}
          onChange={(e) => (editIndex !== null ? setEditLabel(e.target.value) : setNewLabel(e.target.value))}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Valeur"
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
                <ListItemText primary={`${item.label}: ${item.value}%`} />
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

export default MarketShare;
