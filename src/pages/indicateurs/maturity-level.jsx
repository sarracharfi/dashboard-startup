import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Box, Button, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const getChartData = (maturityLevels) => {
  return {
    labels: maturityLevels.map(level => level.name),
    datasets: [{
      label: 'Niveau de Maturité',
      data: maturityLevels.map(level => level.percentage),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };
};

const chartOptions = {
  plugins: {
    legend: { display: true },
    datalabels: {
      color: '#000',
      display: true,
      formatter: (value) => `${value}%`,
      font: { weight: 'bold', size: 12 },
      padding: { bottom: 4 }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      beginAtZero: true,
      title: { display: true, text: 'Niveau de Maturité' }
    },
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Pourcentage' }
    }
  }
};

const MaturityLevelModal = ({ open, handleClose, isEditing, values, handleChange, handleSubmit }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
        {isEditing ? 'Modifier le Niveau' : 'Ajouter un Nouveau Niveau'}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Pourcentage"
          name="pourcentage"
          type="number"
          value={values.pourcentage}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {isEditing ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </form>
    </Box>
  </Modal>
);

const MaturityLevelTable = ({ maturityLevels, handleOpen, handleDelete }) => (
  <Box sx={{ mt: 14, maxWidth: 800 }}>
    <Typography variant="h6" gutterBottom>
      Liste des Niveaux de Maturité
    </Typography>
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Pourcentage</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {maturityLevels.map(level => (
            <TableRow key={level.id}>
              <TableCell>{level.name}</TableCell>
              <TableCell>{level.percentage}%</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(level)} variant="outlined" color="primary">
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDelete(level.id)} variant="outlined" color="secondary" sx={{ ml: 1 }}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

const MaturityLevelPage = () => {
  const [maturityLevels, setMaturityLevels] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [values, setValues] = useState({ name: '', pourcentage: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    axios.get('http://localhost:8085/maturite')
      .then(res => {
        // Parse backend's level field into name and percentage
        const fetchedData = res.data.map(item => {
          const [name, percentageStr] = item.level.split(': ');
          const percentage = parseFloat(percentageStr);
          return { id: item.idmaturite, name, percentage };
        });
        setMaturityLevels(fetchedData);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.response?.status === 404
          ? 'Endpoint /maturite not found. Please check if the backend server is running.'
          : 'Failed to fetch data. Please try again later.');
      });
  }, []);

  const handleOpen = (level) => {
    setIsEditing(!!level);
    setCurrentLevel(level);
    setValues(level ? { name: level.name, pourcentage: level.percentage } : { name: '', pourcentage: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({ name: '', pourcentage: '' });
    setIsEditing(false);
    setCurrentLevel(null);
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.name && values.pourcentage) {
      const level = `${values.name}: ${values.pourcentage}%`;
      if (isEditing && currentLevel) {
        // Update existing record
        axios
          .put(`http://localhost:8085/maturite/${currentLevel.id}`, { level })
          .then(res => {
            setMaturityLevels(maturityLevels.map(l => (l.id === currentLevel.id ? {
              id: res.data.data.idmaturite,
              name: values.name,
              percentage: parseFloat(values.pourcentage)
            } : l)));
            handleClose();
            setError(null);
            navigate('/maturity-level');
          })
          .catch(err => {
            console.error('Error updating data:', err);
            setError(err.response?.status === 400
              ? 'Invalid input. Please ensure name and percentage are valid.'
              : err.response?.status === 404
              ? `Endpoint /maturite/${currentLevel.id} not found.`
              : 'Failed to update data. Please try again.');
          });
      } else {
        // Create new record
        axios
          .post('http://localhost:8085/maturite', { level })
          .then(res => {
            setMaturityLevels([...maturityLevels, {
              id: res.data.data.idmaturite,
              name: values.name,
              percentage: parseFloat(values.pourcentage)
            }]);
            handleClose();
            setError(null);
            navigate('/maturity-level');
          })
          .catch(err => {
            console.error('Error adding data:', err);
            setError(err.response?.status === 400
              ? 'Invalid input. Please ensure name and percentage are valid.'
              : err.response?.status === 404
              ? 'Endpoint /maturite not found.'
              : 'Failed to add data. Please try again.');
          });
      }
    } else {
      setError('Please fill in both name and percentage fields.');
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8085/maturite/${id}`)
      .then(res => {
        setMaturityLevels(maturityLevels.filter(level => level.id !== id));
        setError(null);
        navigate('/maturity-level');
      })
      .catch(err => {
        console.error('Error deleting data:', err);
        setError(err.response?.status === 404
          ? `Endpoint /maturite/${id} not found.`
          : 'Failed to delete data. Please try again.');
      });
  };

  return (
    <Box sx={{ padding: 14 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Niveaux de Maturité
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
          {error}
        </Alert>
      )}
      <Box sx={{ mt: 3, height: '550px' }}>
        <Bar data={getChartData(maturityLevels)} options={chartOptions} />
      </Box>
      <MaturityLevelTable maturityLevels={maturityLevels} handleOpen={handleOpen} handleDelete={handleDelete} />
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Button onClick={() => handleOpen(null)} variant="contained" color="primary">
          Ajouter un Niveau
        </Button>
      </Grid>
      <MaturityLevelModal
        open={open}
        handleClose={handleClose}
        isEditing={isEditing}
        values={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default MaturityLevelPage;