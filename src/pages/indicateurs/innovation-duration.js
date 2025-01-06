import { Box, Button, Divider, FormControl, Grid, Input, InputLabel, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { MdDelete, MdEdit } from 'react-icons/md'; 

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
    legend: {
      display: true,
    },
    datalabels: {
      color: '#000',
      display: true,
      formatter: (value) => `${value} années`, // Format with "années"
      font: {
        weight: 'bold',
        size: 12
      },
      padding: {
        bottom: 4
      }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
};

const ActivityModal = ({ open, handleClose, isEditing, activity, handleChange, handleSave }) => {
  const activityName = isEditing && activity ? activity.name : '';
  const activityDuration = isEditing && activity ? activity.duration : '';

  return (
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
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="name">Nom</InputLabel>
          <Input
            id="name"
            name="name"
            value={activityName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="duration">Durée (années)</InputLabel>
          <Input
            id="duration"
            name="duration"
            type="number"
            value={activityDuration}
            onChange={handleChange}
          />
        </FormControl>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button onClick={handleClose} color="secondary" sx={{ mr: 2 }}>
            Annuler
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Sauvegarder
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const InnovationDurationPage = () => {
  const [activities, setActivities] = useState([
    { id: 1, name: 'Développement des réseaux et infrastructures', duration: 3 },
    { id: 2, name: 'Soutien aux startups et financement', duration: 2 },
    { id: 3, name: 'Administration électronique et numérisation', duration: 2 },
    { id: 4, name: 'Développement des services numériques et financiers', duration: 3 }
  ]);
  
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [newActivity, setNewActivity] = useState({ name: '', duration: '' });

  const handleOpen = (activity) => {
    setIsEditing(!!activity);
    setCurrentActivity(activity || { id: Date.now(), name: '', duration: '' }); 
    setNewActivity(activity || { name: '', duration: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (isEditing) {
      setActivities(
        activities.map(activity =>
          activity.id === currentActivity.id ? { ...activity, ...newActivity } : activity
        )
      );
    } else {
      setActivities([...activities, { id: newActivity.id, ...newActivity }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return (
    <Box sx={{ padding: 20}}>
      
      
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
        activity={currentActivity}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </Box>
  );
};

const ActivityTable = ({ activities, handleOpen, handleDelete }) => {
  return (
    <Box sx={{ mt: 14, maxWidth: 800 }}>
      <Typography variant="h6" gutterBottom>
        Liste des Activités
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Années</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map(activity => (
              <TableRow key={activity.id}>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.duration}</TableCell>
                <TableCell>
                  <MdEdit onClick={() => handleOpen(activity)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <MdDelete onClick={() => handleDelete(activity.id)} style={{ cursor: 'pointer' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InnovationDurationPage;
