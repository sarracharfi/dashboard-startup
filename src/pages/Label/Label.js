import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const initialData = [
  { id: 1, year: '2020', value: 209, forecast: 220 },
  { id: 2, year: '2021', value: 206, forecast: 210 },
  { id: 3, year: '2022', value: 200, forecast: 220 },
  { id: 4, year: '2023', value: 200, forecast: 230 },
  { id: 5, year: '2024', value: 200, forecast: 240 },
];

const Label = () => {
  const [rows, setRows] = useState(initialData);
  const [newEntry, setNewEntry] = useState({ year: '', value: '', forecast: '' });

  const handleAdd = () => {
    if (newEntry.year && newEntry.value && newEntry.forecast) {
      setRows([...rows, { id: rows.length + 1, ...newEntry }]);
      setNewEntry({ year: '', value: '', forecast: '' });
    }
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleUpdate = (id, updatedRow) => {
    setRows(rows.map(row => (row.id === id ? updatedRow : row)));
  };

  const columns = [
    { field: 'year', headerName: 'Année', width: 150 },
    { field: 'value', headerName: 'Nombre de Startups Réalisées', width: 200 },
    { field: 'forecast', headerName: 'Prévision de Startups', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <IconButton onClick={() => handleUpdate(params.row.id, { ...params.row, value: 'Updated' })}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container>
      <Box mt={23}>
       
        <Box mb={10} display="flex" justifyContent="center">
          <Box width="100%">
            <Typography variant="h6" align="center">Réalisations & Prévisions</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={rows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#FF69B4" name="Réalisations" />
                <Bar dataKey="forecast" fill="#87CEEB" name="Prévisions" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box mt={20}>
          <Typography variant="h5" gutterBottom align="center">
            Ajouter une Année
          </Typography>
          <Box mb={2} display="flex" justifyContent="center">
            <Box width="50%">
              <TextField
                label="Année"
                value={newEntry.year}
                onChange={(e) => setNewEntry({ ...newEntry, year: e.target.value })}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Nombre de Startups Réalisées"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Prévision de Startups"
                value={newEntry.forecast}
                onChange={(e) => setNewEntry({ ...newEntry, forecast: e.target.value })}
                margin="normal"
                fullWidth
              />
              <Button variant="contained" onClick={handleAdd} style={{ marginTop: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                Ajouter
              </Button>
            </Box>
          </Box>
        </Box>

    
        <Box mt={4}>
          <Typography variant="h4" gutterBottom align="center">
            Liste des Réalisations et Prévisions
          </Typography>
          <Box display="flex" justifyContent="center">
            <div style={{ height: 400, width: '80%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} />
            </div>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Label;
