import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';




const ActivityModal = ({ open, handleClose, isEditing, newActivity, handleChange, handleSave }) => (
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
        width: 600,
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
        <InputLabel htmlFor="aspect">Aspect</InputLabel>
        <Input
          id="aspect"
          name="aspect"
          value={newActivity.aspect || ''}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="name">domaine</InputLabel>
        <Input
          id="name"
          name="name"
          value={newActivity.name}
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

const ActivityTable = ({ activities, handleOpen, handleDelete }) => (
  <TableContainer component={Paper} sx={{ mt: 12, border: '1px solid #ddd', borderRadius: 2, boxShadow: 4 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center" sx={{ bgcolor: '#3f51b5', color: 'white', borderRight: '1px solid #ddd' }}>ID</TableCell>
          <TableCell align="center" sx={{ bgcolor: '#3f51b5', color: 'white', borderRight: '1px solid #ddd' }}>Aspect</TableCell>
          <TableCell align="center" sx={{ bgcolor: '#3f51b5', color: 'white', borderRight: '1px solid #ddd' }}>Domaine</TableCell>
          <TableCell align="center" sx={{ bgcolor: '#3f51b5', color: 'white' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell align="center" sx={{ borderBottom: '1px solid #ddd' }}>{activity.id}</TableCell>
            <TableCell align="center" sx={{ borderBottom: '1px solid #ddd' }}>{activity.aspect}</TableCell>
            <TableCell align="center" sx={{ borderBottom: '1px solid #ddd' }}>{activity.name}</TableCell>
            <TableCell align="center" sx={{ borderBottom: '1px solid #ddd' }}>
              <IconButton onClick={() => handleOpen(activity)} color="primary" sx={{ mr: 1 }}>
                <MdEdit />
              </IconButton>
              <IconButton onClick={() => handleDelete(activity.id)} color="error">
                <MdDelete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const DomainActivityPage = () => {
  const [activities, setActivities] = useState([
    { id: 1, aspect: 'Infrastructures TIC', name: 'Développement des réseaux et infrastructures' },
    { id: 2, aspect: 'Développement de Startups', name: 'Soutien aux startups et financement' },
    { id: 3, aspect: 'Numérisation', name: 'Administration électronique et numérisation' },
    { id: 4, aspect: 'Économie Numérique', name: 'Développement des services numériques et financiers' }
  ]);
  
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [newActivity, setNewActivity] = useState({ aspect: '', name: '' });

  const handleOpen = (activity) => {
    setIsEditing(!!activity);
    setCurrentActivity(activity);
    setNewActivity(activity || { aspect: '', name: '' });
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
      const newId = activities.length ? Math.max(activities.map(a => a.id)) + 1 : 1;
      setActivities([...activities, { id: newId, ...newActivity }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return (
    <Box sx={{ padding: 13}}>
      
      <ActivityTable activities={activities} handleOpen={handleOpen} handleDelete={handleDelete} />

      <Grid container justifyContent="center" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen(null)}
        >
          Ajouter une Nouvelle Activité
        </Button>
      </Grid>

      <ActivityModal
        open={open}
        handleClose={handleClose}
        isEditing={isEditing}
        newActivity={newActivity}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default DomainActivityPage;
