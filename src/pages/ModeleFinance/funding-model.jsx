import { Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ArcElement, Chart as ChartJS, DoughnutController, Legend, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(DoughnutController, ArcElement, Title, Tooltip, Legend);

const FundingModel = () => {
  const [data, setData] = useState([]);
  const [newSource, setNewSource] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    axios.get('http://localhost:8085/fundingmodel')
      .then(res => {
        // Map backend fields to frontend format
        const fetchedData = res.data.map(item => {
          const [source, Budget] = item.model.split('|');
          return {
            id: item.idfunding,
            source,
            Budget
          };
        });
        setData(fetchedData);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const addEntry = () => {
    const model = `${newSource}|${newBudget}`;
    if (isEditing) {
      axios
        .put(`http://localhost:8085/fundingmodel/${editingId}`, { model })
        .then(res => {
          console.log(res);
          setData(data.map(item =>
            item.id === editingId ? {
              id: item.id,
              source: newSource,
              Budget: newBudget
            } : item
          ));
          setIsEditing(false);
          setEditingId(null);
          setNewSource('');
          setNewBudget('');
          navigate('/funding-model');
        })
        .catch(err => console.log(err));
    } else {
      axios
        .post('http://localhost:8085/fundingmodel', { model })
        .then(res => {
          console.log(res);
          setData([...data, {
            id: res.data.data.idfunding,
            source: newSource,
            Budget: newBudget
          }]);
          setNewSource('');
          setNewBudget('');
          navigate('/funding-model');
        })
        .catch(err => console.log(err));
    }
  };

  const deleteEntry = (id) => {
    axios
      .delete(`http://localhost:8085/fundingmodel/${id}`)
      .then(res => {
        console.log(res);
        setData(data.filter(item => item.id !== id));
        navigate('/funding-model');
      })
      .catch(err => console.log(err));
  };

  const editEntry = (id) => {
    const item = data.find(item => item.id === id);
    setNewSource(item.source);
    setNewBudget(item.Budget);
    setIsEditing(true);
    setEditingId(id);
  };

  const chartData = {
    labels: data.map(item => item.source),
    datasets: [
      {
        label: 'Répartition du Modèle de Financement',
        data: data.map(() => Math.floor(Math.random() * 100)), // Placeholder: Random values
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`
        }
      },
      title: {
        display: true,
        text: 'Répartition des Modèles de Financement'
      }
    }
  };

  return (
    <div style={{ padding: '80px' }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Modèles de Financement
      </Typography>

      <div style={{ position: 'relative', width: '500px', margin: '0 auto' }}>
        <Doughnut data={chartData} options={options} />
      </div>

      <TableContainer component={Paper} style={{ marginTop: '250px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Source de Financement</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.source}</TableCell>
                <TableCell>{row.Budget}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editEntry(row.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteEntry(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <TextField
          label="Source de Financement"
          value={newSource}
          onChange={(e) => setNewSource(e.target.value)}
          style={{ width: '300px' }}
        />
        <TextField
          label="Budget"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          style={{ width: '300px' }}
        />
        <Button variant="contained" color="primary" onClick={addEntry}>
          {isEditing ? "Modifier" : "Ajouter"}
        </Button>
      </div>
    </div>
  );
};

export default FundingModel;