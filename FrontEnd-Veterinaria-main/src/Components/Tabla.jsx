import DataTable from "react-data-table-component";
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility';



function Tabla({data, opcionVer }) {

    const columns = [
        {
            name: 'Mascota',
            selector: row => row.nombre,
        },
        {
            name: 'Tipo',
            selector: row => row.especie,
        },
        {
            name: 'Motivo',
            selector: row => row.motivo,
        },
    
        {
            name: 'Acciones',
            cell: row => (
                <>
                    <IconButton aria-label="editar" color="primary" onClick={() => opcionVer(row)}>
                        <VisibilityIcon />
                    </IconButton>
                </>
            )
        }
    ]

    return (
        <>
            <DataTable columns={columns} data={data} pagination conditionalRowStyles={[
                {
                    when: row => true,
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    },
                },
            ]} />
        </>
    )

} export default Tabla;