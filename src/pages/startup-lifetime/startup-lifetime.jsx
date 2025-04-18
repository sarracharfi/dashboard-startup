import { Delete, Edit } from '@mui/icons-material';
import { Alert, Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#da70d6'];

const StartupLifetime = () => {
  const [rows, setRows] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: '', duration: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    axios.get('http://localhost:8085/dureestartup')
      .then(res => {
        // Map backend fields to frontend format, generate name locally
        const fetchedData = res.data.map((item, index) => ({
          id: item.idduree,
          name: `Startup ${index + 1}`, // Generate name locally
          duration: item.duration
        }));
        setRows(fetchedData);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        if (err.response?.status === 404) {
          setError('Endpoint /dureestartup not found. Please check if the backend server is running and the endpoint exists.');
        } else {
          setError('Failed to fetch data. Please try again later.');
        }
      });
  }, []);

  const handleChange = (event) => {
    setNewEntry({ ...newEntry, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEntry.duration) {
      if (editId) {
        // Update existing record
        axios
          .put(`http://localhost:8085/dureestartup/${editId}`, {
            duration: newEntry.duration
          })
          .then(res => {
            console.log(res);
            setRows(rows.map(row => (row.id === editId ? {
              id: row.id,
              name: row.name, // Retain local name
              duration: res.data.data.duration
            } : row)));
            setNewEntry({ name: '', duration: '' });
            setEditId(null);
            setError(null);
            navigate('/startup-lifetime');
          })
          .catch(err => {
            console.error('Error updating data:', err);
            if (err.response?.status === 400) {
              setError('Invalid input. Please ensure duration is valid.');
            } else if (err.response?.status === 404) {
              setError(`Endpoint /dureestartup/${editId} not found. Please check the backend server.`);
            } else {
              setError('Failed to update data. Please try again.');
            }
          });
      } else {
        // Create new record
        axios
          .post('http://localhost:8085/dureestartup', {
            duration: newEntry.duration
          })
          .then(res => {
            console.log(res);
            setRows([...rows, {
              id: res.data.data.idduree,
              name: `Startup ${rows.length + 1}`, // Generate name locally
              duration: res.data.data.duration
            }]);
            setNewEntry({ name: '', duration: '' });
            setError(null);
            navigate('/startup-lifetime');
          })
          .catch(err => {
            console.error('Error adding data:', err);
            if (err.response?.status === 400) {
              setError('Invalid input. Please ensure duration is valid.');
            } else if (err.response?.status === 404) {
              setError('Endpoint /dureestartup not found. Please check the backend server.');
            } else {
              setError('Failed to add data. Please try again.');
            }
          });
      }
    } else {
      setError('Please fill in the duration field.');
    }
  };

  const handleEdit = (id) => {
    const row = rows.find(row => row.id === id);
    setNewEntry({ name: row.name, duration: row.duration });
    setEditId(id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8085/dureestartup/${id}`)
      .then(res => {
        console.log(res);
        setRows(rows.filter(row => row.id !== id));
        setError(null);
        navigate('/startup-lifetime');
      })
      .catch(err => {
        console.error('Error deleting data:', err);
        if (err.response?.status === 404) {
          setError(`Endpoint /dureestartup/${id} not found. Please check the backend server.`);
        } else {
          setError('Failed to delete data. Please try again.');
        }
      });
  };

  // Transform data for the pie chart
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
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Durée de Vie des Startups
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
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
            {editId ? 'Modifier une Durée de Startup' : 'Ajouter une Durée de Startup'}
          </Typography>
          <Box mb={2} display="flex" flexDirection="column" alignItems="center">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nom (optionnel)"
                value={newEntry.name}
                onChange={handleChange}
                name="name"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Durée"
                value={newEntry.duration}
                onChange={handleChange}
                name="duration"
                margin="normal"
                fullWidth
                required
              />
              <Button type="submit" variant="contained" style={{ marginTop: 16 }}>
                {editId ? 'Mettre à jour' : 'Ajouter'}
              </Button>
            </form>
          </Box>
          <Box mt={4} style={{ height: 400, width: '100%' }}>
            <Typography variant="h5" gutterBottom align="center">
              Liste des Durées de Startups
            </Typography>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default StartupLifetime;