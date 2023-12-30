import { Box, Fab, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AppBar from "./AppBar";
import Tabla from "./Tabla";
import TextField from '@mui/material/TextField'


import { useForm } from 'react-hook-form'

import './Inicio.css'

import { useNavigate } from 'react-router-dom';
import React from "react";
import axios from 'axios';
import { blue } from "@mui/material/colors";



function Inicio() {
    const navigate = useNavigate()

    const [filaSeleccionada, setFilaSeleccionada] = React.useState([{}]);

    const { register, handleSubmit } = useForm()

    const [datos, setData] = React.useState([{}])

    const cargarDatos = async () => {

        axios.get('http://localhost:4567/api/animales/get').then((respuesta) => {
            console.log(respuesta.data)
            setData(respuesta.data)
        })
    }

    React.useEffect(() => {
        cargarDatos()
    }, [])

    const irAgregar = () => {
        navigate('/agregarMascota')
    }

    const [open, setOpen] = React.useState(false)
    const abrir = () => {
        setOpen(true)
    }
    const cerrar = () => {
        setOpen(false)
    }

    const verInfo = (datosFila) => {
        setFilaSeleccionada(datosFila)
        console.log("Fila actualizada:", filaSeleccionada);
        abrir()
    }

    const editarInfo = (data) => {
        console.log("accion de editar")
        axios.put('http://localhost:4567/api/animales/change', {
            id: filaSeleccionada.id,
            nombre: data.nombreMascota,
            especie: data.tipoMascota,
            motivo: data.motivo,
            id_Dueño: '1234'
        }).then(() => {
            setOpen(false)
        }).catch((error) => {
            console.log(error);
        })
    }

    const eliminarAnimal = () => {
        // axios.delete('http://localhost:4567/api/animales/remove/',  filaSeleccionada.id).then(() => {
        //     setOpen(false)
        // })
        console.log(filaSeleccionada.id)
    }

    return (
        <>
            <AppBar index="¡Bienvenido!" />

            <Box>
                <Tabla opcionVer={verInfo} data={datos} ></Tabla>
            </Box>

            <Box sx={{ paddingTop: 3, width: 50, alignContent: 'end' }}>
                <Tooltip title="Agregar una mascota" placement="top">
                    <Fab color="success" aria-label="add" onClick={irAgregar}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <Dialog open={open} onClose={cerrar}>
                    <DialogTitle>
                        Editar Información
                    </DialogTitle>
                    <DialogContent>
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box>
                                    <p >ID de la mascota: {filaSeleccionada.id}</p>
                                    <p >Nombre de la mascota: {filaSeleccionada.nombre}</p>
                                    <p >Tipo de mascota: {filaSeleccionada.especie}</p>
                                    <p >Motivo de visita: {filaSeleccionada.motivo}</p>
                                </Box>
                                <Box sx={{ width: '50%' }}>
                                    <TextField
                                        id="nombreMascota"
                                        {...register("nombreMascota", { required: 'Ingrese un nombre.' })}
                                        label="Nombre de la mascota"
                                        variant="standard"
                                        fullWidth
                                    />
                                    <TextField
                                        id="tipoMascota"
                                        {...register("tipoMascota", { required: 'Ingrese un tipo de mascota.' })}
                                        label="Tipo de Mascota"
                                        variant="standard"
                                        fullWidth
                                    />
                                    <TextField
                                        id="motivo"
                                        {...register("motivo", { required: 'Ingrese un motivo de visita.' })}
                                        multiline
                                        label="Padecimiento/Motivo de visita"
                                        variant="standard"
                                        fullWidth
                                    />
                                </Box>
                            </Box>
                        </>
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" variant="text" onClick={cerrar}>
                            Cerrar
                        </Button>
                        <Button color="error" variant="contained" onClick={eliminarAnimal}>
                            Eliminar
                        </Button>
                        <Button color="primary" variant="contained" onClick={handleSubmit(editarInfo)}>
                            Editar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

        </>
    )
} export default Inicio;