import { Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { ArcElement, Chart as ChartJS, DoughnutController, Legend, Title, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(DoughnutController, ArcElement, Title, Tooltip, Legend);

const FundingModel = () => {
  const [data, setData] = useState([
    { source: "BIRD", description: "Montant alloué : 75 millions de dollars" },
    { source: "Budget de l'État Tunisien", description: "Subventions et allocations budgétaires spécifiques" },
    { source: "Fonds de Développement Numérique", description: "Financement des projets liés aux technologies" },
    { source: "Subventions Directes", description: "Subventions aux startups et aux projets innovants" },
    { source: "Partenariats Public-Privé", description: "Collaboration avec les entreprises nationales et internationales" },
    { source: "Fonds de Garantie", description: "Fonds de garantie pour soutenir les startups" }
  ]);

  const [newSource, setNewSource] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const addEntry = () => {
    if (isEditing) {
      const updatedData = data.map((item, index) =>
        index === editingIndex ? { source: newSource, description: newDescription } : item
      );
      setData(updatedData);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      setData([...data, { source: newSource, description: newDescription }]);
    }
    setNewSource('');
    setNewDescription('');
  };

  const deleteEntry = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const editEntry = (index) => {
    setNewSource(data[index].source);
    setNewDescription(data[index].description);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const chartData = {
    labels: data.map(item => item.source),
    datasets: [
      {
        label: 'Répartition du Modèle de Financement',
        data: data.map(() => Math.floor(Math.random() * 100)), 
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
      }
    }
  };

  return (
    <div style={{ padding: '80px' }}>
      
      <div style={{ position: 'relative', width: '500px', margin: '0 auto' }}>
        <Doughnut data={chartData} options={options} />
      </div>

      <TableContainer component={Paper} style={{ marginTop: '250px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Source de Financement</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.source}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editEntry(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteEntry(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: '20px' }}>
        <TextField
          label="Source de Financement"
          value={newSource}
          onChange={(e) => setNewSource(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={addEntry}>
          {isEditing ? "Modifier" : "Ajouter"}
        </Button>
      </div>
    </div>
  );
};

export default FundingModel;
