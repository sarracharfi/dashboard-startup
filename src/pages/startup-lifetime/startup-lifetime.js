import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';


const initialData = [
  { id: 1, name: 'Startup A', duration: '1-2 ans' },
  { id: 2, name: 'Startup B', duration: '3-5 ans' },
  { id: 3, name: 'Startup C', duration: '6-10 ans' },
];

const colors = ['#0088FE', '#00C49F', '#FFBB28','#da70d6']; 

const StartupLifetime = () => {
  const [rows, setRows] = useState(initialData);
  const [newEntry, setNewEntry] = useState({ name: '', duration: '' });

  const handleAdd = () => {
    if (newEntry.name && newEntry.duration) {
      setRows([...rows, { id: rows.length + 1, ...newEntry }]);
      setNewEntry({ name: '', duration: '' });
    }
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleUpdate = (id, updatedRow) => {
    setRows(rows.map(row => (row.id === id ? updatedRow : row)));
  };

  // Transforme les données pour le graphique
  const chartData = rows.reduce((acc, row) => {
    const existing = acc.find(item => item.name === row.duration);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: row.duration, value: 1 });
    }
    return acc;
  }, []);

  const columns = [
    { field: 'name', headerName: 'Nom', width: 150 },
    { field: 'duration', headerName: 'Durée', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <IconButton onClick={() => handleUpdate(params.row.id, { ...params.row, duration: 'Updated' })}>
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
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Box mb={4} display="flex" flexDirection="column" alignItems="center" style={{ width: '100%' }}>
         
          <Box style={{ width: '100%', height: 500 }}>
            <PieChart width={900} height={600}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={200}
                innerRadius={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
        </Box>
        <Box mt={17} style={{ width: '100%' }}>
          <Typography variant="h5" gutterBottom align="center">
            Ajouter une Startup
          </Typography>
          <Box mb={2} display="flex" flexDirection="column" alignItems="center">
            <TextField
              label="Nom"
              value={newEntry.name}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Durée"
              value={newEntry.duration}
              onChange={(e) => setNewEntry({ ...newEntry, duration: e.target.value })}
              margin="normal"
              fullWidth
            />
            <Button variant="contained" onClick={handleAdd} style={{ marginTop: 16 }}>
              Ajouter
            </Button>
          </Box>
          <Box mt={4} style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default StartupLifetime;
