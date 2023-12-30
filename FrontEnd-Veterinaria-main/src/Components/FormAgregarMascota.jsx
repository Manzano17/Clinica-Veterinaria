import React from 'react';

import TextField from '@mui/material/TextField'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import PetsIcon from '@mui/icons-material/Pets';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from './AppBar';
import { Snackbar, Alert } from '@mui/material';

import './AgregarMascota.css'
import Fab from '@mui/material/Fab'

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios';

function FormAgregarMascota() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
    }

    const [alerta, setAlerta] = React.useState("success")
    const [mensaje, setMensaje] = React.useState("Mascota Agregada")

    const regresar = () => {
        navigate('/inicio')
    }

    const enviarForm = (data) => {
        axios.post('http://localhost:4567/api/animales/add', {
            nombre: data.nombreMascota,
            especie: data.tipoMascota,
            motivo: data.motivo,
            id_Dueño: '1234'
        }).then(() => {
            setOpen(true)
            navigate('/inicio')
        }).catch((error) => {
            setAlerta("error")
            setMensaje("Error al agregar mascota")
            setOpen(true)
            console.log(error);
        })

    }

    return (
        <>
            <Box>
                <AppBar index="Agregar mascota" />
            </Box>
            <Box sx={{ marginTop: 2, marginLeft: -100 }}>
                <Fab color="inherit" aria-label="Atras" onClick={regresar}>
                    <ArrowBackIcon />
                </Fab>
            </Box>
            <form onSubmit={handleSubmit(enviarForm)}>
                <fieldset id='formMascota'>
                    <legend id='legendMascota'>Mascota</legend>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <DriveFileRenameOutlineIcon sx={{ mr: 1, my: 0.5 }} />
                        <TextField
                            id="nombreMascota"
                            {...register("nombreMascota", { required: 'Ingrese un nombre.' })}
                            label="Nombre de la mascota"
                            variant="standard" fullWidth />
                    </Box>
                    <p role='alert'>{errors.nombreMascota?.message}</p>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PetsIcon sx={{ mr: 1, my: 0.5 }} />
                        <TextField
                            id="tipoMascota"
                            {...register("tipoMascota", { required: 'Ingrese un tipo de mascota.' })}
                            label="Tipo de mascota"
                            variant="standard"
                            placeholder='Perro, gato, hasmter...'
                            fullWidth />
                    </Box>
                    <p role='alert'>{errors.tipoMascota?.message}</p>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <LocalHospitalIcon sx={{ mr: 1, my: 0.5 }} />
                        <TextField
                            id="motivo"
                            {...register("motivo", { required: 'Ingrese un motivo de visita.' })}
                            multiline
                            label="Padecimiento/Motivo de visita"
                            variant="standard"
                            placeholder='Malestar, Vacuna, Cita...'
                            fullWidth />
                    </Box>
                    <p role='alert'>{errors.motivo?.message}</p>
                </fieldset>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 3 }}>
                    <Button variant="contained" id='btnInicioSesion' type='submit' size='large'>
                        Agregar
                    </Button>
                </Box>
            </form>

            <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
                <Alert severity={alerta} >{mensaje}</Alert>
            </Snackbar>

        </>
    )
}
export default FormAgregarMascota;