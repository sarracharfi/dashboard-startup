import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Box, Button, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const getChartData = (activities) => {
  return {
    labels: activities.map(activity => activity.name),
    datasets: [{
      label: 'Durée d\'Innovation',
      data: activities.map(activity => activity.duration),
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)'
      ],
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
      formatter: (value) => `${value} années`,
      font: { weight: 'bold', size: 12 },
      padding: { bottom: 4 }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
};

const ActivityModal = ({ open, handleClose, isEditing, values, handleChange, handleSubmit }) => (
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
        {isEditing ? 'Modifier l\'Activité' : 'Ajouter une Nouvelle Activité'}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom (optionnel)"
          name="name"
          value={values.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Durée (années)"
          name="annee"
          type="number"
          value={values.annee}
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

const ActivityTable = ({ activities, handleOpen, handleDelete }) => (
  <Box sx={{ mt: 14, maxWidth: 800 }}>
    <Typography variant="h6" gutterBottom>
      Liste des Activités
    </Typography>
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Durée (années)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map(activity => (
            <TableRow key={activity.id}>
              <TableCell>{activity.name}</TableCell>
              <TableCell>{activity.duration}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(activity)} variant="outlined" color="primary">
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDelete(activity.id)} variant="outlined" color="secondary" sx={{ ml: 1 }}>
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

const InnovationDurationPage = () => {
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [values, setValues] = useState({ name: '', annee: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    axios.get('http://localhost:8085/innovation')
      .then(res => {
        const fetchedData = res.data.map((item, index) => ({
          id: item.idinnovation,
          name: `Activity ${index + 1}`, // Generate name locally
          duration: item.duration
        }));
        setActivities(fetchedData);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.response?.status === 404
          ? 'Endpoint /innovation not found. Please check if the backend server is running.'
          : 'Failed to fetch data. Please try again later.');
      });
  }, []);

  const handleOpen = (activity) => {
    setIsEditing(!!activity);
    setCurrentActivity(activity);
    setValues(activity ? { name: activity.name, annee: activity.duration } : { name: '', annee: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({ name: '', annee: '' });
    setIsEditing(false);
    setCurrentActivity(null);
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.annee) {
      const duration = parseInt(values.annee);
      if (isEditing && currentActivity) {
        // Update existing record
        axios
          .put(`http://localhost:8085/innovation/${currentActivity.id}`, { duration })
          .then(res => {
            setActivities(activities.map(a => (a.id === currentActivity.id ? {
              id: res.data.data.idinnovation,
              name: values.name || a.name, // Retain or update name
              duration: res.data.data.duration
            } : a)));
            handleClose();
            setError(null);
            navigate('/innovation-duration');
          })
          .catch(err => {
            console.error('Error updating data:', err);
            setError(err.response?.status === 400
              ? 'Invalid input. Please ensure duration is valid.'
              : err.response?.status === 404
              ? `Endpoint /innovation/${currentActivity.id} not found.`
              : 'Failed to update data. Please try again.');
          });
      } else {
        // Create new record
        axios
          .post('http://localhost:8085/innovation', { duration })
          .then(res => {
            setActivities([...activities, {
              id: res.data.data.idinnovation,
              name: values.name || `Activity ${activities.length + 1}`, // Generate name if empty
              duration: res.data.data.duration
            }]);
            handleClose();
            setError(null);
            navigate('/innovation-duration');
          })
          .catch(err => {
            console.error('Error adding data:', err);
            setError(err.response?.status === 400
              ? 'Invalid input. Please ensure duration is valid.'
              : err.response?.status === 404
              ? 'Endpoint /innovation not found.'
              : 'Failed to add data. Please try again.');
          });
      }
    } else {
      setError('Please fill in the duration field.');
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8085/innovation/${id}`)
      .then(res => {
        setActivities(activities.filter(activity => activity.id !== id));
        setError(null);
        navigate('/innovation-duration');
      })
      .catch(err => {
        console.error('Error deleting data:', err);
        setError(err.response?.status === 404
          ? `Endpoint /innovation/${id} not found.`
          : 'Failed to delete data. Please try again.');
      });
  };

  return (
    <Box sx={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Durée d'Innovation
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
          {error}
        </Alert>
      )}
      <Box sx={{ mt: 1, height: '500px' }}>
        <Pie data={getChartData(activities)} options={chartOptions} />
      </Box>
      <ActivityTable activities={activities} handleOpen={handleOpen} handleDelete={handleDelete} />
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Button onClick={() => handleOpen(null)} variant="contained" color="primary">
          Ajouter une Activité
        </Button>
      </Grid>
      <ActivityModal
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

export default InnovationDurationPage;