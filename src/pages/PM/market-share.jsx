import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const MarketShare = () => {
  const [data, setData] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [editValue, setEditValue] = useState('');
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    axios.get('http://localhost:8085/partmarche')
      .then(res => {
        // Map backend fields to frontend format
        const fetchedData = res.data.map(item => ({
          id: item.idpartmarche,
          label: item.annee.toString(), // Treat year as label
          value: item.pourcentage
        }));
        setData(fetchedData);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const handleAdd = () => {
    axios
      .post('http://localhost:8085/partmarche', {
        annee: parseInt(newLabel),
        pourcentage: parseFloat(newValue)
      })
      .then(res => {
        console.log(res);
        setData([...data, {
          id: res.data.data.idpartmarche,
          label: res.data.data.annee.toString(),
          value: res.data.data.pourcentage
        }]);
        setNewLabel('');
        setNewValue('');
        navigate('/market-share');
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (id) => {
    const item = data.find(item => item.id === id);
    setEditId(id);
    setEditLabel(item.label);
    setEditValue(item.value);
  };

  const handleSaveEdit = () => {
    axios
      .put(`http://localhost:8085/partmarche/${editId}`, {
        annee: parseInt(editLabel),
        pourcentage: parseFloat(editValue)
      })
      .then(res => {
        console.log(res);
        setData(data.map(item =>
          item.id === editId ? {
            id: item.id,
            label: res.data.data.annee.toString(),
            value: res.data.data.pourcentage
          } : item
        ));
        setEditId(null);
        setEditLabel('');
        setEditValue('');
        navigate('/market-share');
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8085/partmarche/${id}`)
      .then(res => {
        console.log(res);
        setData(data.filter(item => item.id !== id));
        navigate('/market-share');
      })
      .catch(err => console.log(err));
  };

  const getChartData = () => {
    return {
      labels: data.map(item => item.label),
      datasets: [
        {
          label: 'Part de Marché',
          data: data.map(item => item.value),
          borderColor: 'rgba(128, 0, 128, 1)', // Purple border
          backgroundColor: 'rgba(128, 0, 128, 0.2)', // Light purple background
          borderWidth: 2,
          tension: 0.1,
        },
      ],
    };
  };

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
      title: {
        display: true,
        text: 'Parts de Marché par Année'
      }
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
          text: 'Pourcentage (%)',
        },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <Box sx={{ padding: 8 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Parts de Marché
      </Typography>

      <Box sx={{ mt: 12, height: '500px' }}>
        <Line data={getChartData()} options={chartOptions} />
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Ajouter ou Modifier des Données
        </Typography>
        <TextField
          label="Année"
          value={editId !== null ? editLabel : newLabel}
          onChange={(e) => (editId !== null ? setEditLabel(e.target.value) : setNewLabel(e.target.value))}
          type="number"
          sx={{ mr: 2 }}
        />
        <TextField
          label="Pourcentage"
          type="number"
          value={editId !== null ? editValue : newValue}
          onChange={(e) => (editId !== null ? setEditValue(e.target.value) : setNewValue(e.target.value))}
          sx={{ mr: 2 }}
        />
        {editId !== null ? (
          <Button variant="contained" color="primary" onClick={handleSaveEdit}>
            Enregistrer
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Ajouter
          </Button>
        )}
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Liste des Données
        </Typography>
        <List>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText primary={`${item.label}: ${item.value}%`} />
                <IconButton onClick={() => handleEdit(item.id)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)} color="secondary">
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