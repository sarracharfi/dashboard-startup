import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GenderMalePage = () => {
  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    annee: '',
    pourcentage: ''
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    axios.get('http://localhost:8085/gender-male')
      .then(res => {
        // Map backend fields to frontend format
        const fetchedData = res.data.map(item => ({
          id: item.idmale,
          year: item.annee,
          value: item.pourcentage
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
    axios.post('http://localhost:8085/gender-male', values)
      .then(res => {
        console.log(res);
        // Use the idmale from the backend response
        setData([...data, {
          id: res.data.data.idmale,
          year: res.data.data.annee,
          value: res.data.data.pourcentage
        }]);
        setValues({ annee: '', pourcentage: '' });
        navigate('/gender-male');
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (id) => {
    const item = data.find((item) => item.id === id);
    setValues({ annee: item.year, pourcentage: item.value });
    setEditId(id);
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:8085/gender-male/${editId}`, {
      annee: values.annee,
      pourcentage: values.pourcentage // Keep as string to support decimals if needed
    })
      .then(res => {
        console.log('Update response:', res);
        if (res.status === 200) {
          setData(data.map((item) =>
            item.id === editId ? {
              ...item,
              year: res.data.data.annee,
              value: res.data.data.pourcentage
            } : item
          ));
          setEditId(null);
          setValues({ annee: '', pourcentage: '' });
          navigate('/gender-male');
          console.log(`Successfully updated record with id ${editId} in the database`);
        } else {
          console.error('Unexpected response status for update:', res.status);
        }
      })
      .catch(err => {
        console.error('Error updating record in database:', err);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
        }
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8085/gender-male/${id}`)
      .then(res => {
        console.log('Delete response:', res);
        if (res.status === 200 || res.status === 204) {
          setData(data.filter((item) => item.id !== id));
          console.log(`Successfully deleted record with id ${id} from the database`);
        } else {
          console.error('Unexpected response status for delete:', res.status);
        }
      })
      .catch(err => {
        console.error('Error deleting record from database:', err);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
        } else if (err.request) {
          console.error('No response received, request sent but no reply:', err.request);
        } else {
          console.error('Error setting up the request:', err.message);
        }
      });
  };

  const getChartData = () => {
    return {
      labels: data.map(item => item.year),
      datasets: [
        {
          label: "Proportion des hommes bénéficiant d'une formation",
          data: data.map(item => item.value),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }
      ]
    };
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Année'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pourcentage'
        },
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    }
  };

  return (
    <Box sx={{ padding: 14 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Proportion des hommes bénéficiant d'une formation
      </Typography>
      
      <Box sx={{ mt: 6, height: '500px' }}>
        <Bar data={getChartData()} options={chartOptions} />
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Ajouter ou Modifier des Données
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="number"
              placeholder="Année"
              name="annee"
              value={values.annee}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '16px', marginRight: '16px' }}
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
              style={{ width: '100%', padding: '8px', marginBottom: '16px', marginRight: '16px' }}
            />
          </div>
          <br />
          {editId !== null ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveEdit}
              style={{ marginTop: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Enregistrer
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Register
            </Button>
          )}
        </form>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Liste des Données
        </Typography>
        <List>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText primary={`${item.year}: ${item.value}%`} />
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

export default GenderMalePage;