import { Box, Button, Divider, FormControl, Grid, Input, InputLabel, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { BarElement, CategoryScale, LinearScale, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    legend: {
      display: true,
    },
    datalabels: {
      color: '#000',
      display: true,
      formatter: (value) => `${value}%`, 
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
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Niveau de Maturité'
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Pourcentage'
      }
    }
  }
};

const MaturityLevelModal = ({ open, handleClose, isEditing, level, handleChange, handleSave }) => {
  const levelName = isEditing && level ? level.name : '';
  const levelPercentage = isEditing && level ? level.percentage : '';

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
          {isEditing ? 'Modifier le Niveau' : 'Ajouter un Nouveau Niveau'}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="name">Nom</InputLabel>
          <Input
            id="name"
            name="name"
            value={levelName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="percentage">Pourcentage (%)</InputLabel>
          <Input
            id="percentage"
            name="percentage"
            type="number"
            value={levelPercentage}
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

const MaturityLevelPage = () => {
  const [maturityLevels, setMaturityLevels] = useState([
    { id: 1, name: 'Création des infrastructures', percentage: 20 },
    { id: 2, name: 'Croissance : Expansion des réseaux', percentage: 30 },
    { id: 3, name: 'Maturité : Maintenance et optimisation', percentage: 25 },
    { id: 4, name: 'Initial : Incubation et validation', percentage: 25 }
  ]);

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [newLevel, setNewLevel] = useState({ name: '', percentage: '' });

  const handleOpen = (level) => {
    setIsEditing(!!level);
    setCurrentLevel(level || { id: Date.now(), name: '', percentage: '' }); // Utiliser Date.now() pour les nouveaux IDs
    setNewLevel(level || { name: '', percentage: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewLevel({ ...newLevel, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (isEditing) {
      setMaturityLevels(
        maturityLevels.map(level =>
          level.id === currentLevel.id ? { ...level, ...newLevel } : level
        )
      );
    } else {
      setMaturityLevels([...maturityLevels, { id: newLevel.id, ...newLevel }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setMaturityLevels(maturityLevels.filter(level => level.id !== id));
  };

  return (
    <Box sx={{ padding: 14}}>
      
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
        level={currentLevel}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </Box>
  );
};

const MaturityLevelTable = ({ maturityLevels, handleOpen, handleDelete }) => {
  return (
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
};

export default MaturityLevelPage;
