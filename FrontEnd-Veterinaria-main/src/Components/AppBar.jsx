import React from 'react'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Avatar, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';


import { useNavigate} from 'react-router-dom';

function TopBar({ index }) {
  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false)
  const close = () => {
    setOpen(false)
    console.log(open)
  }

  const dialogoSesion = () =>{
    setOpen(true)
    console.log(open)
  }

  const irInicioSesion = () =>{
    navigate('/')
  }

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#2A6041'}}>
        <Toolbar>
          <Avatar
            alt="Logo Veterinaria"
            src="/src/img/logo.jpeg"
            sx={{ width: 32, height: 32, marginRight: 1 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {index}
          </Typography>
          <Tooltip title="Cerrar sesión">
            <IconButton aria-label="Cerrar Sesion" color='inherit' size='large' onClick={dialogoSesion}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={close} keepMounted >
        <DialogTitle >
          Advertencia
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"¿Estas segur@ que quieres cerrar sesión?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancelar
          </Button>
          <Button onClick={irInicioSesion} color="error" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default TopBar;