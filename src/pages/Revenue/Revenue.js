import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

const initialData = [
  { id: 1, name: "Chiffre d'Affaires", amount: 1000000 },
  { id: 2, name: 'Création de Startups', amount: 1000 },
  { id: 3, name: 'Création d\'emplois', amount: 10000 },
  { id: 4, name: 'Expansion Internationale', amount: 500000 },
];

const Revenue = () => {
  const [rows, setRows] = useState(initialData);
  const [newEntry, setNewEntry] = useState({ name: '', amount: '' });

  const handleAdd = () => {
    if (newEntry.name && newEntry.amount) {
      setRows([...rows, { id: rows.length + 1, ...newEntry }]);
      setNewEntry({ name: '', amount: '' });
    }
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleUpdate = (id, updatedRow) => {
    setRows(rows.map(row => (row.id === id ? updatedRow : row)));
  };

  const totalAmount = rows.reduce((acc, row) => acc + parseFloat(row.amount), 0);

  const sortedData = [...rows].sort((a, b) => a.name === "Chiffre d'Affaires" ? -1 : b.name === "Chiffre d'Affaires" ? 1 : 0);

  const chartData = sortedData.map(row => ({
    name: row.name,
    amount: parseFloat(row.amount),
    percentage: (parseFloat(row.amount) / totalAmount) * 100,
  }));

  const columns = [
    { field: 'name', headerName: 'Nom de l\'objectif', width: 200 },
    { field: 'amount', headerName: 'Montant (Dinars)', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <IconButton onClick={() => handleUpdate(params.row.id, { ...params.row, amount: 'Updated' })}>
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
      <Box mt={16} display="flex" flexDirection="column" alignItems="center">
        <Box mb={26}>
          <AreaChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: "Montant (Dinars)", angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" gutterBottom>
            Ajouter un Objectif Financier
          </Typography>
          <Box mb={2}>
            <TextField
              label="Nom"
              value={newEntry.name}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Montant (Dinars)"
              value={newEntry.amount}
              onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
              margin="normal"
              fullWidth
            />
            <Button variant="contained" onClick={handleAdd} style={{ marginTop: 16 }}>
              Ajouter
            </Button>
          </Box>
          <Box mb={4}>
            <div style={{ height: 300, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} />
            </div>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Revenue;
