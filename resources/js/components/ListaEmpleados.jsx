import React, {useEffect, useState} from "react";
import axios from "axios";
import "../../css/lista.css"
import AgregarRegistro from "./formularioAgregar"
import EditarRegistro from "./formularioEditar"
import Delete from "../../css/delete.png"
import Swal from 'sweetalert2'


const ListaEmpleados = () => {
    const [empleados, setEmpleados] = useState([]);
    useEffect(() => {
        axios.get("/api/empleados").then(response=> setEmpleados(response.data.empleados));
    },[]);

    return (
        <div>
            <div>
                <h1 className="encabezado">
                    LISTA DE EMPLEADOS
                </h1>
            </div>

            <div>
                <div>
                    <AgregarRegistro />
                </div>
                <table>
                    <thead>                    
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DPI</th>
                            <th>Cargo</th>
                            <td>Acciones</td>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map(empleado=>(
                            <tr key={empleado.id}>
                                <td>{empleado.id}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.noDpi}</td>
                                <td>{empleado.cargo}</td>
                                <td>
                                    <button onClick={()=>borrarEmpleado(empleado.id)}><img src={Delete} alt="" /></button>
                                    <EditarRegistro id={empleado.id}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}

function borrarEmpleado(id){
    const refreshPage = () => {
        window.location.reload();
    };
    Swal.fire({
    title: "Atención",
    text: "¿Está seguro de Borrar este Registro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, Bórralo"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/api/empleados/${id}`)    
            refreshPage();    
        }

    });
        
}





export default ListaEmpleados;
