import React, {useEffect, useState} from "react";
import axios from "axios";
import "../../css/lista.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from "../../css/edit.png"
import Swal from "sweetalert2";



function EditarRegistro({id}){
    const [datosVacios, setDatosVacios] = useState(false);
    const [show, setShow] = useState(false);
    const [empleado, setEmpleado] = useState();
     const handleShow = () => setShow(true);
    const refreshPage = () => {
        window.location.reload();
    };
    const handleCloseRefresh = () => {
        setShow(false);
        refreshPage();
   }
    const handleClose = () => {
        setShow(false);
    }

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [noDpi, setNoDpi] = useState("");
    const [cargo, setCargo] = useState("");

    useEffect(() => {
        axios.get(`/api/empleados/${id}`).then(response=> {
                     const empleadoSeleccionado = response.data.empleados;

                     setEmpleado(empleadoSeleccionado); 

                     setNombre(empleadoSeleccionado.nombre || '');
                     setApellido(empleadoSeleccionado.apellido || '');
                     setNoDpi(empleadoSeleccionado.noDpi || '');
                     setCargo(empleadoSeleccionado.cargo || '');
                 });
    }, [id]);

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };
    const handleApellidoChange = (event) => {
        setApellido(event.target.value);
    };
    const handleNoDpiChange = (event) => {
        setNoDpi(event.target.value);
    };
    const handleCargoChange = (event) => {
        setCargo(event.target.value);
    };

     return (
    <>
      <button onClick={handleShow}>
        <img src={Edit} alt="" />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDITAR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={nombre}
                onChange={handleNombreChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={apellido}
                onChange={handleApellidoChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>noDpi</Form.Label>
              <Form.Control
                type="text"
                value={noDpi}
                onChange={handleNoDpiChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                type="text"
                value={cargo}
                onChange={handleCargoChange}
              />
            </Form.Group>        
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{editarDatos(id, nombre, apellido, noDpi, cargo); handleCloseRefresh}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  function editarDatos(id, name, lastname, dpi, workstation){
        const datos = {
                nombre : name,
                apellido : lastname,
                noDpi : dpi,
                cargo : workstation            
            }

        if(datos != null){
            axios.put(`/api/empleados/${id}`, datos)
                .then(
                    Swal.fire({
                    title: "Edición Exitosa",
                    icon: "success",
                    draggable: true,
                    }).then((draggable) =>{
                        handleCloseRefresh()
                    }
                    )
                )    
                .catch(error => {
                    draggable: false;
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Algo salió mal",
                        timer: 200000,
                        })
                    }); 
            setDatosVacios(false) 
        }    

    }
}






export default EditarRegistro;