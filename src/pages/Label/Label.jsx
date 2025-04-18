import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Label = () => {
  const [rows, setRows] = useState([]);
  const [values, setValues] = useState({
    annee: '',
    valeur: '',
    forecast: ''
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    axios.get('http://localhost:8085/label')
      .then(res => {
        // Map backend fields to frontend format
        const fetchedData = res.data.map(item => {
          const [year, value, forecast] = item.name.split(':');
          return {
            id: item.idlabel,
            year,
            value: parseFloat(value),
            forecast: parseFloat(forecast)
          };
        });
        setRows(fetchedData);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = `${values.annee}:${values.valeur}:${values.forecast}`;
    axios.post('http://localhost:8085/label', { name })
      .then(res => {
        console.log(res);
        setRows([...rows, {
          id: res.data.data.idlabel,
          year: values.annee,
          value: parseFloat(values.valeur),
          forecast: parseFloat(values.forecast)
        }]);
        setValues({ annee: '', valeur: '', forecast: '' });
        navigate('/label');
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (id) => {
    const row = rows.find(row => row.id === id);
    setValues({
      annee: row.year,
      valeur: row.value,
      forecast: row.forecast
    });
    setEditId(id);
  };

  const handleUpdate = () => {
    const name = `${values.annee}:${values.valeur}:${values.forecast}`;
    axios.put(`http://localhost:8085/label/${editId}`, { name })
      .then(res => {
        console.log(res);
        setRows(rows.map(row => (row.id === editId ? {
          id: row.id,
          year: values.annee,
          value: parseFloat(values.valeur),
          forecast: parseFloat(values.forecast)
        } : row)));
        setEditId(null);
        setValues({ annee: '', valeur: '', forecast: '' });
        navigate('/label');
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8085/label/${id}`)
      .then(res => {
        console.log('Delete response:', res);
        if (res.status === 200 || res.status === 204) {
          setRows(rows.filter(row => row.id !== id));
          console.log(`Successfully deleted record with id ${id} from the database`);
        } else {
          console.error('Unexpected response status:', res.status);
        }
      })
      .catch(err => {
        console.error('Error deleting record from database:', err);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
        }
      });
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
      <Box mt={23}>
        <Box mb={10} display="flex" justifyContent="center">
          <Box width="100%">
            <Typography variant="h6" align="center">Réalisations & Prévisions</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={rows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  tick={true}
                  axisLine={true}
                  tickLine={true}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={true}
                  axisLine={true}
                  tickLine={true}
                />
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
            Ajouter ou Modifier une Année
          </Typography>
          <Box mb={2} display="flex" justifyContent="center">
            <Box width="50%">
              <form onSubmit={handleSubmit}>
                <div className="input-box">
                  <input
                    type="number"
                    placeholder="Année"
                    name="annee"
                    value={values.annee}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    placeholder="Nombre de Startups Réalisées"
                    name="valeur"
                    value={values.valeur}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    placeholder="Prévision de Startups"
                    name="forecast"
                    value={values.forecast}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
                  />
                </div>
                {editId ? (
                  <Button
                    variant="contained"
                    onClick={handleUpdate}
                    style={{ marginTop: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                  >
                    Mettre à jour
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ marginTop: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                  >
                    Register
                  </Button>
                )}
              </form>
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
};

export default Label;