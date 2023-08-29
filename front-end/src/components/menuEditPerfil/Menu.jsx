import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Perfil from './Perfil/Perfil';
import { Link, useLocation } from 'react-router-dom'; 


export default function BasicList() {
  const items = [
    {text: 'Perfil', link: '/perfil'},
    {text: 'Senha', link: '/senha'},
    {text: 'Interesses', link: '/interesses'},
    {text: 'Formações', link: '/formacoes'},
    {text: 'Cursos', link: '/cursos'},
    {text: 'Experiências', link: '/experiencias'}
  ];

  const location = useLocation();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 260,
        height: '100%',
        maxHeight: 390,
        bgcolor: 'background.paper',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
        fontWeight: 'bold',
      }}
    >
      <nav aria-label="primary mailbox folders">
        <List>
        {items.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton
                disableRipple
                divider
                component={Link}
                to={item.link}
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#DB752C',
                    fontWeight: 'bold',
                  },
                  '&.active': {
                    color: '#DB752C',
                  },
                }}
                className={location.pathname === item.link ? 'active' : ''} 
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}

