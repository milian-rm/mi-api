import React, { useState } from "react";
import axios from "axios";
import "../../css/lista.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import Person from "../../css/person.png"
import BootstrapForm from 'react-bootstrap/Form';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const RegistroSchema = Yup.object().shape({
  nombre: Yup.string().required("El Nombre es Requerido"),
  apellido: Yup.string().required("El Apellido es Requerido"),
  noDpi: Yup.string().required("El No. DPI es Requerido"),
  cargo: Yup.string().required("El Cargo es Requerido"),
});


function AgregarRegistro() {
  const [show, setShow] = useState(false);

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

  const agregarDatos = (values, { setSubmitting, resetForm }) => {
    const datos = values;

    axios.post('/api/empleados', datos)
      .then(() => {
        Swal.fire({
          title: "¡Registro Agregado!",
          text: "El nuevo empleado ha sido guardado exitosamente.",
          icon: "success",
          draggable: true
        }).then(() => {
          handleCloseRefresh();
          resetForm();
        });
      })
      .catch(error => {
        console.error("ERROR al agregar registro: ", error.response ? error.response.data : error.message);
        Swal.fire({
          title: "Error al Guardar",
          text: "No se pudo agregar el registro. Inténtalo de nuevo.",
          icon: "error",
          timer: 5000
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }


  return (
    <>
      <button variant="primary" onClick={handleShow} className="button-agregar">
        <h3>Agregar Empleado</h3>
        <img src={Person} alt="" />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ nombre: '', apellido: '', noDpi: '', cargo: '' }}
            validationSchema={RegistroSchema}
            onSubmit={agregarDatos}
            enableReinitialize={false}
          >
            {({ isSubmitting }) => (
              <FormikForm>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="nombre">Nombre</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="nombre"
                    as={BootstrapForm.Control}
                    placeholder="Ingrese el Nombre"
                  />
                  <ErrorMessage name="nombre" component="div" className="text-danger small" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="apellido">Apellido</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="apellido"
                    as={BootstrapForm.Control}
                    placeholder="Ingrese el Apellido"
                  />
                  <ErrorMessage name="apellido" component="div" className="text-danger small" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="noDpi">No. DPI</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="noDpi"
                    as={BootstrapForm.Control}
                    placeholder="Ingrese el No. DPI"
                  />
                  <ErrorMessage name="noDpi" component="div" className="text-danger small" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="cargo">Cargo</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="cargo"
                    as={BootstrapForm.Control}
                    placeholder="Ingrese el Cargo"
                  />
                  <ErrorMessage name="cargo" component="div" className="text-danger small" />
                </BootstrapForm.Group>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    Guardar Registro
                  </Button>
                </Modal.Footer>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AgregarRegistro;