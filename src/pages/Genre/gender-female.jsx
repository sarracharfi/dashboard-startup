import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GenderFemalePage = () => {
  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    annee: '',
    pourcentage: ''
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    axios.get('http://localhost:8085/gender-female')
      .then(res => {
        // Map backend fields to frontend format
        const fetchedData = res.data.map(item => ({
          id: item.idfemale,
          year: item.annee,
          percentage: item.pourcentage
        }));
        setData(fetchedData);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8085/gender-female', values)
      .then(res => {
        console.log(res);
        // Use the idfemale from the backend response
        setData([...data, {
          id: res.data.data.idfemale,
          year: res.data.data.annee,
          percentage: res.data.data.pourcentage
        }]);
        setValues({ annee: '', pourcentage: '' });
        navigate('/gender-female');
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (id) => {
    const item = data.find((item) => item.id === id);
    setValues({ annee: item.year, pourcentage: item.percentage });
    setEditId(id);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8085/gender-female/${editId}`, {
      annee: values.annee,
      pourcentage: values.pourcentage // Keep as string to support decimals if needed
    })
      .then(res => {
        console.log(res);
        setData(data.map((item) => (item.id === editId ? {
          ...item,
          year: res.data.data.annee,
          percentage: res.data.data.pourcentage
        } : item)));
        setEditId(null);
        setValues({ annee: '', pourcentage: '' });
        navigate('/gender-female');
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8085/gender-female/${id}`)
      .then(res => {
        console.log('Delete response:', res);
        if (res.status === 200 || res.status === 204) {
          setData(data.filter((item) => item.id !== id));
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

  const getChartData = () => ({
    labels: data.map((item) => item.year),
    datasets: [
      {
        label: "Proportion des femmes bénéficiant d'une formation",
        data: data.map((item) => item.percentage),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

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
          text: 'Pourcentage',
        },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <Box sx={{ padding: 12 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Proportion des femmes bénéficiant d'une formation
      </Typography>

      <Box sx={{ mt: 3, height: '500px' }}>
        <Bar data={getChartData()} options={chartOptions} />
      </Box>

      <Box sx={{ mt: 12 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Année</TableCell>
                <TableCell>Pourcentage</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(item.id)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
          <form onSubmit={handleSubmit}>
            <h3>{editId ? 'Modifier' : 'Ajouter'} Données</h3>
            <br />
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
                placeholder="Pourcentage"
                name="pourcentage"
                value={values.pourcentage}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
              />
            </div>
            <br />
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
  );
};

export default GenderFemalePage;