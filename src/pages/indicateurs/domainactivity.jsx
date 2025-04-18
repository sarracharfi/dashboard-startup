import {
  Box,
  Button,
  Divider,
  FormControl,
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
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Composant générique pour le modal
const GenericModal = ({ 
  open, 
  handleClose, 
  isEditing, 
  values, 
  handleChange, 
  handleSave,
  title,
  fields 
}) => (
  <Modal open={open} onClose={handleClose}>
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
      <Typography variant="h6" gutterBottom>
        {isEditing ? `Modifier ${title}` : `Ajouter un nouveau ${title}`}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      {fields.map((field) => (
        <FormControl key={field.id} fullWidth margin="normal">
          <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
          <Input 
            id={field.id} 
            name={field.id} 
            value={values[field.id] || ''} 
            onChange={handleChange} 
          />
        </FormControl>
      ))}
      
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

// Composant générique pour le tableau
const GenericTable = ({ 
  data, 
  columns, 
  handleOpen, 
  handleDelete,
  title,
  addButtonText 
}) => (
  <Box sx={{ p: 4, textAlign: 'center', width: '100%' }}>
    <TableContainer 
      component={Paper} 
      sx={{ 
        mt: 4, 
        border: '1px solid #ddd', 
        borderRadius: 2, 
        boxShadow: 4,
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell 
                key={column.field} 
                align="center" 
                sx={{ bgcolor: '#3f51b5', color: 'white' }}
              >
                {column.headerName}
              </TableCell>
            ))}
            <TableCell align="center" sx={{ bgcolor: '#3f51b5', color: 'white' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.iddomain}>
              {columns.map((column) => (
                <TableCell key={`${row.iddomain}-${column.field}`} align="center">
                  {row[column.field]}
                </TableCell>
              ))}
              <TableCell align="center">
                <IconButton onClick={() => handleOpen(row)} color="primary">
                  <MdEdit />
                </IconButton>
                <IconButton onClick={() => handleDelete(row.iddomain)} color="error">
                  <MdDelete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    <Box sx={{ mt: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
        {addButtonText}
      </Button>
    </Box>
  </Box>
);

// Page générique utilisant les composants
const GenericPage = ({ 
  endpoint, 
  title, 
  fields, 
  columns,
  addButtonText = 'Ajouter un élément'
}) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initialiser les valeurs vides pour tous les champs
  const initialValues = fields.reduce((acc, field) => {
    acc[field.id] = '';
    return acc;
  }, {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/${endpoint}`);
        setData(response.data);
      } catch (err) {
        console.error(`Erreur lors de la récupération des données:`, err);
        setError('Impossible de charger les données. Veuillez réessayer.');
      }
    };
    fetchData();
  }, [endpoint]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleOpen = (item) => {
    setIsEditing(!!item);
    setCurrentItem(item);
    if (item) {
      const itemValues = fields.reduce((acc, field) => {
        acc[field.id] = item[field.id] || '';
        return acc;
      }, {});
      setValues(itemValues);
    } else {
      setValues(initialValues);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues(initialValues);
    setCurrentItem(null);
    setIsEditing(false);
  };

  const handleDelete = async (iddomain) => {
    try {
      if (!iddomain) {
        throw new Error('ID invalide pour la suppression.');
      }
      const response = await axios.delete(`http://localhost:8085/${endpoint}/${iddomain}`);
      if (response.status === 200 || response.status === 204) {
        setData((prevData) => prevData.filter((item) => item.iddomain !== iddomain));
        setError(null);
      } else {
        throw new Error('Réponse inattendue de l\'API lors de la suppression.');
      }
    } catch (err) {
      console.error('Erreur de suppression:', err);
      setError('Erreur lors de la suppression. Veuillez réessayer.');
    }
  };

  const handleSave = async () => {
    for (const field of fields) {
      if (!values[field.id]) {
        setError(`Le champ ${field.label} est requis.`);
        return;
      }
    }

    try {
      if (isEditing) {
        if (!currentItem || !currentItem.iddomain) {
          throw new Error('ID invalide pour la mise à jour.');
        }
        const response = await axios.put(
          `http://localhost:8085/${endpoint}/${currentItem.iddomain}`,
          values
        );
        if (response.status === 200 && response.data) {
          setData((prevData) =>
            prevData.map((item) =>
              item.iddomain === currentItem.iddomain ? { ...item, ...response.data.data } : item
            )
          );
          handleClose();
          setError(null);
          navigate(`/${endpoint}`);
        } else {
          throw new Error('Réponse inattendue de l\'API lors de la mise à jour.');
        }
      } else {
        const response = await axios.post(`http://localhost:8085/${endpoint}`, values);
        if (response.status === 201 && response.data) {
          setData([...data, response.data.data]);
          handleClose();
          setError(null);
          navigate(`/${endpoint}`);
        } else {
          throw new Error('Réponse inattendue de l\'API lors de l\'ajout.');
        }
      }
    } catch (err) {
      console.error(isEditing ? 'Erreur de mise à jour:' : "Erreur d'ajout:", err);
      setError(
        isEditing
          ? 'Erreur lors de la mise à jour. Veuillez réessayer.'
          : 'Erreur lors de l’ajout. Veuillez réessayer.'
      );
    }
  };

  return (
    <>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <GenericTable
        data={data}
        columns={columns}
        handleOpen={handleOpen}
        handleDelete={handleDelete}
        title={title}
        addButtonText={addButtonText}
      />
      
      <GenericModal
        open={open}
        handleClose={handleClose}
        isEditing={isEditing}
        values={values}
        handleChange={handleChange}
        handleSave={handleSave}
        title={title}
        fields={fields}
      />
    </>
  );
};

// Page spécifique pour DomainActivity
const DomainActivityPage = () => {
  const fields = [
    { id: 'aspect', label: 'Aspect' },
    { id: 'name', label: 'Domaine' }
  ];
  
  const columns = [
    { field: 'iddomain', headerName: 'ID' },
    { field: 'aspect', headerName: 'Aspect' },
    { field: 'name', headerName: 'Domaine' }
  ];

  return (
    <GenericPage
      endpoint="domain-activity"
      title="Activité"
      fields={fields}
      columns={columns}
      addButtonText="Ajouter une Activité"
    />
  );
};

export default DomainActivityPage;