import { Delete, Edit, Visibility } from '@mui/icons-material';
import { IconButton, Switch } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';

const initialData = [
  { id: 1, class: "Les Indicateurs", name: "Domaine d'activité", object: "Technologie", date: "01/01/2023", enabled: true },
  { id: 2, class: "Genre", name: "Répartition", object: "Femmes : 40%, Hommes : 60%", date: "12/12/2022", enabled: true },
  { id: 3, class: "Chiffre D'Affaires", name: "CA Visé", object: "500k", date: "11/11/2022", enabled: false },
  { id: 4, class: "Modèle De Financement", name: "Investissements", object: "100k", date: "10/10/2022", enabled: true },
];

const S2TPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [s2tData, setS2tData] = React.useState(initialData);

  const handleEdit = (id) => {
    enqueueSnackbar(`L'élément avec l'ID: ${id} a été modifié. Assurez-vous de vérifier les nouvelles valeurs dans la table.`, { 
      variant: 'info', 
      autoHideDuration: 5000
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.")) {
      const updatedData = s2tData.filter(item => item.id !== id);
      setS2tData(updatedData);
      enqueueSnackbar(`L'élément avec l'ID: ${id} a été supprimé avec succès. La table a été mise à jour.`, { 
        variant: 'success', 
        autoHideDuration: 5000
      });
    }
  };

  const handleView = (id) => {
    enqueueSnackbar(`Vous visualisez les détails de l'élément avec l'ID: ${id}.`, { 
      variant: 'info', 
      autoHideDuration: 5000
    });
  };

  const handleToggleSwitch = (id) => {
    const updatedData = s2tData.map(item =>
      item.id === id ? { ...item, enabled: !item.enabled } : item
    );
    setS2tData(updatedData);
    enqueueSnackbar(`L'état de l'élément avec l'ID: ${id} a été changé. Actuel: ${updatedData.find(item => item.id === id).enabled ? 'Activé' : 'Désactivé'}.`, { 
      variant: 'info', 
      autoHideDuration: 5000
    });
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Class</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Object</th>
            <th style={styles.th}>Actions</th>
            <th style={styles.th}>Last Update</th>
            <th style={styles.th}>Enabled</th>
          </tr>
        </thead>
        <tbody>
          {s2tData.map((data) => (
            <tr key={data.id}>
              <td style={styles.td}>{data.class}</td>
              <td style={styles.td}>{data.name}</td>
              <td style={styles.td}>{data.object}</td>
              <td style={styles.td}>
                <IconButton onClick={() => handleEdit(data.id)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(data.id)} color="error">
                  <Delete />
                </IconButton>
                <IconButton onClick={() => handleView(data.id)} color="info">
                  <Visibility />
                </IconButton>
              </td>
              <td style={styles.td}>{data.date}</td>
              <td style={styles.td}>
                <Switch
                  checked={data.enabled}
                  onChange={() => handleToggleSwitch(data.id)}
                  color="primary"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  table: {
    width: '100%',
    maxWidth: '1200px',
    borderCollapse: 'collapse',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: '#f8f8f8',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  },
};

export default S2TPage;
