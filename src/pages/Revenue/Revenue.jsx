import { Delete, Edit } from '@mui/icons-material';
import { Alert, Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

const Revenue = () => {
  const [rows, setRows] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: '', amount: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    axios.get('http://localhost:8085/revenue')
      .then(res => {
        // Map backend fields to frontend format
        const fetchedData = res.data.map(item => ({
          id: item.idrevenue,
          name: item.annee.toString(), // Treat year as name for display
          amount: item.amount
        }));
        setRows(fetchedData);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        if (err.response?.status === 404) {
          setError('Endpoint /revenue not found. Please check if the backend server is running and the endpoint exists.');
        } else {
          setError('Failed to fetch data. Please try again later.');
        }
      });
  }, []);

  const handleAdd = () => {
    if (newEntry.name && newEntry.amount) {
      axios
        .post('http://localhost:8085/revenue', {
          annee: parseInt(newEntry.name),
          amount: parseFloat(newEntry.amount)
        })
        .then(res => {
          console.log(res);
          setRows([...rows, {
            id: res.data.data.idrevenue,
            name: res.data.data.annee.toString(),
            amount: res.data.data.amount
          }]);
          setNewEntry({ name: '', amount: '' });
          setError(null);
          navigate('/revenue');
        })
        .catch(err => {
          console.error('Error adding data:', err);
          if (err.response?.status === 400) {
            setError('Invalid input. Please ensure year and amount are valid.');
          } else if (err.response?.status === 404) {
            setError('Endpoint /revenue not found. Please check the backend server.');
          } else {
            setError('Failed to add data. Please try again.');
          }
        });
    } else {
      setError('Please fill in both year and amount fields.');
    }
  };

  const handleEdit = (id) => {
    const row = rows.find(row => row.id === id);
    setNewEntry({ name: row.name, amount: row.amount });
    setEditId(id);
  };

  const handleUpdate = () => {
    if (newEntry.name && newEntry.amount) {
      axios
        .put(`http://localhost:8085/revenue/${editId}`, {
          annee: parseInt(newEntry.name),
          amount: parseFloat(newEntry.amount)
        })
        .then(res => {
          console.log(res);
          setRows(rows.map(row => (row.id === editId ? {
            id: row.id,
            name: res.data.data.annee.toString(),
            amount: res.data.data.amount
          } : row)));
          setNewEntry({ name: '', amount: '' });
          setEditId(null);
          setError(null);
          navigate('/revenue');
        })
        .catch(err => {
          console.error('Error updating data:', err);
          if (err.response?.status === 400) {
            setError('Invalid input. Please ensure year and amount are valid.');
          } else if (err.response?.status === 404) {
            setError(`Endpoint /revenue/${editId} not found. Please check the backend server.`);
          } else {
            setError('Failed to update data. Please try again.');
          }
        });
    } else {
      setError('Please fill in both year and amount fields.');
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8085/revenue/${id}`)
      .then(res => {
        console.log(res);
        setRows(rows.filter(row => row.id !== id));
        setError(null);
        navigate('/revenue');
      })
      .catch(err => {
        console.error('Error deleting data:', err);
        if (err.response?.status === 404) {
          setError(`Endpoint /revenue/${id} not found. Please check the backend server.`);
        } else {
          setError('Failed to delete data. Please try again.');
        }
      });
  };

  const totalAmount = rows.reduce((acc, row) => acc + parseFloat(row.amount), 0);

  const sortedData = [...rows].sort((a, b) => parseInt(a.name) - parseInt(b.name)); // Sort by year

  const chartData = sortedData.map(row => ({
    name: row.name,
    amount: parseFloat(row.amount),
    percentage: totalAmount ? (parseFloat(row.amount) / totalAmount) * 100 : 0,
  }));

  const columns = [
    { field: 'name', headerName: 'Année', width: 200 },
    { field: 'amount', headerName: 'Montant (Dinars)', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <IconButton onClick={() => handleEdit(params.row.id)}>
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
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Objectifs Financiers
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box mb={26}>
          <AreaChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: "Année", position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: "Montant (Dinars)", angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `${value} Dinars`} />
            <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" gutterBottom>
            {editId ? 'Modifier un Objectif Financier' : 'Ajouter un Objectif Financier'}
          </Typography>
          <Box mb={2}>
            <TextField
              label="Année"
              value={newEntry.name}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              type="number"
              margin="normal"
              fullWidth
            />
            <TextField
              label="Montant (Dinars)"
              value={newEntry.amount}
              onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
              type="number"
              margin="normal"
              fullWidth
            />
            {editId ? (
              <Button variant="contained" onClick={handleUpdate} style={{ marginTop: 16 }}>
                Mettre à jour
              </Button>
            ) : (
              <Button variant="contained" onClick={handleAdd} style={{ marginTop: 16 }}>
                Ajouter
              </Button>
            )}
          </Box>
          <Box mb={4}>
            <Typography variant="h5" gutterBottom align="center">
              Liste des Objectifs Financiers
            </Typography>
            <div style={{ height: 300, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} />
            </div>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Revenue;