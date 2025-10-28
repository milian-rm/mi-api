import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/lista.css"
import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from "../../css/edit.png"
import Swal from "sweetalert2";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'; 
import * as Yup from 'yup'; 

const EdicionSchema = Yup.object().shape({
  nombre: Yup.string()
    .required("El Nombre es Requerido"),
  apellido: Yup.string()
    .required("El Apellido es Requerido"),
  noDpi: Yup.string()
    .required("El No. DPI es Requerido"),
  cargo: Yup.string()
    .required("El Cargo es Requerido"),
});


function EditarRegistro({ id }) {
  const [show, setShow] = useState(false);
  const [empleado, setEmpleado] = useState(null); 

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

  const recargarDatos = () => {
    axios.get(`/api/empleados/${id}`).then(response => {
      const empleadoSeleccionado = response.data.empleados;
      setEmpleado(empleadoSeleccionado);
    }).catch(error => {
      console.error("Error al cargar datos:", error);
      setEmpleado(null); 
    });
  };
  useEffect(() => {
    axios.get(`/api/empleados/${id}`).then(response => {
      const empleadoSeleccionado = response.data.empleados;
      setEmpleado(empleadoSeleccionado);
    }).catch(error => {
      console.error("Error al cargar datos:", error);
      setEmpleado(null); 
    });
  },[id]);

  const editarDatos = (values, { setSubmitting }) => {
    const datos = values;
  
    axios.put(`/api/empleados/${id}`, datos)
      .then(() => {
        Swal.fire({
          title: "Edición Exitosa",
          icon: "success",
          draggable: true,
        }).then(() => {
          handleCloseRefresh(); 
        });
      })
      .catch(error => {
        console.error("Error al editar:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal al actualizar el registro",
          timer: 3000,
        });
        setSubmitting(false); 
      });
  };


  return (
    <>
      <button onClick={() => { handleShow(); recargarDatos(); }}>
        <img src={Edit} alt="Editar"/>
      </button>

      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {empleado ? ( 
            <Formik
              initialValues={{
                nombre: empleado.nombre || '',
                apellido: empleado.apellido || '',
                noDpi: empleado.noDpi || '',
                cargo: empleado.cargo || '',
              }}
              validationSchema={EdicionSchema}
              onSubmit={editarDatos}
              enableReinitialize={true} 
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
                    <ErrorMessage name="nombre" component="div" className="text-danger" />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label htmlFor="apellido">Apellido</BootstrapForm.Label>
                    <Field 
                      type="text" 
                      name="apellido" 
                      as={BootstrapForm.Control} 
                      placeholder="Ingrese el Apellido" 
                    />
                    <ErrorMessage name="apellido" component="div" className="text-danger" />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label htmlFor="noDpi">No. DPI</BootstrapForm.Label>
                    <Field 
                      type="text" 
                      name="noDpi" 
                      as={BootstrapForm.Control} 
                      placeholder="Ingrese el No. DPI" 
                    />
                    <ErrorMessage name="noDpi" component="div" className="text-danger" />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label htmlFor="cargo">Cargo</BootstrapForm.Label>
                    <Field 
                      type="text" 
                      name="cargo" 
                      as={BootstrapForm.Control} 
                      placeholder="Ingrese el Cargo" 
                    />
                    <ErrorMessage name="cargo" component="div" className="text-danger" />
                  </BootstrapForm.Group>
                  
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cerrar
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                      Guardar Cambios
                    </Button>
                  </Modal.Footer>
                </FormikForm>
              )}
            </Formik>
          ) : (
            <div>Cargando datos del empleado...</div> // Mensaje de carga
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditarRegistro;

/*import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/lista.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from "../../css/edit.png"
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from 'formik';



function EditarRegistro({ id }) {
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

  const recargarDatos = () => {
    axios.get(`/api/empleados/${id}`).then(response => {
      const empleadoSeleccionado = response.data.empleados;

      setEmpleado(empleadoSeleccionado);

      setNombre(empleadoSeleccionado.nombre || '');
      setApellido(empleadoSeleccionado.apellido || '');
      setNoDpi(empleadoSeleccionado.noDpi || '');
      setCargo(empleadoSeleccionado.cargo || '');
    });
  };

  useEffect(() => {
    axios.get(`/api/empleados/${id}`).then(response => {
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

  const Basic = () => (
    <div>
      <h1>Empleados</h1>
      <Formik
        initialValues={{ nombre: "", apellido: "", noDpi: "", cargo: "" }}
        validate={values => {
          const errors = {};
          if (!values.nombre) {
            errors.nombre = "Requerido";
          } {
            errors.email = "Debe Ingresar un Nombre";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="nombre" name="nombre" />
            <ErrorMessage name="nombre" component="div" />
            <Field type="apellido" name="apellido" />
            <ErrorMessage name="apellido" component="div" />
            <Field type="noDpi" name="noDpi" />
            <ErrorMessage name="noDpi" component="div" />
            <Field type="cargo" name="cargo" />
            <ErrorMessage name="cargo" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Subir
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )


  function editarDatos(id, name, lastname, dpi, workstation) {
    const datos = {
      nombre: name,
      apellido: lastname,
      noDpi: dpi,
      cargo: workstation
    }

    const datosArray = [];
    var datosVacios = false;

    for (let key in datos) {
      datosArray.push(datos[key]);
    }
    console.log(datosArray);

    for (let i = 0; i < datosArray.length; i++) {
      if (datosArray[i] === "" || datosArray[i] === null) {
        datosVacios = true;
        break;
      }
    }

    if (!datosVacios) {
      console.log(datosVacios);
      axios.put(`/api/empleados/${id}`, datos)
        .then(
          Swal.fire({
            title: "Edición Exitosa",
            icon: "success",
            draggable: true,
          }).then((draggable) => {
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
    } else {
      Swal.fire({
        icon: "error",
        title: "Campo Vacío",
        text: "No puede dejar un campo vacío",
        timer: 200000,
      }).then(() => {
        handleClose();
        recargarDatos();
      }
      )
    }




  }
}

export default EditarRegistro;

*/