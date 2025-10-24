import React, {useEffect, useState} from "react";
import axios from "axios";
import "../../css/lista.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import Person from "../../css/person.png"


function agregarRegistro(){
    const [datosVacios, setDatosVacios] = useState(false);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const refreshPage = () => {
        window.location.reload();
    };
    const handleCloseRefresh = () => {
        setShow(false);
        if(!datosVacios){
            refreshPage();
        }
    }
    const handleClose = () => {
        setShow(false);
    }

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [noDpi, setNoDpi] = useState('');
    const [cargo, setCargo] = useState('');

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
      <button variant="primary" onClick={handleShow} className="button-agregar">
        <h3>Agregar Empleado</h3>
        <img src={Person} alt="" />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Registro</Modal.Title>
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
          <Button variant="primary" onClick={()=>{agregarDatos(nombre, apellido, noDpi, cargo);}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  function agregarDatos(name, lastname, dpi, workstation){
        const datos = {
                nombre : name,
                apellido : lastname,
                noDpi : dpi,
                cargo : workstation            
            }

        if(datos != null){
            axios.post('/api/empleados', datos)
                .then(
                    Swal.fire({
                        title: "Se Agregó su Registro",
                        icon: "success",
                        draggable: true
                    }).then((draggable)=>
                        handleCloseRefresh()
                    )
                )    
                .catch(error => {
                    console.log("ERROR: ",error.response.data);
                    });   
        }    

    }
}






export default agregarRegistro;