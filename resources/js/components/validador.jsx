import React, { useState } from 'react';

const touchErrors = (errors) => {
    const touched = {};
    for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
            touched[key] = { ...errors[key], dirty: true };
        }
    }
    return touched;
};

const nombreValidator = (nombre, form) => nombre.trim().length < 2 ? "El nombre es demasiado corto." : "";
const apellidoValidator = (apellido, form) => apellido.trim().length < 2 ? "El apellido es demasiado corto." : "";
const noDpiValidator = (noDpi, form) => /^\d{13}$/.test(noDpi) ? "" : "El DPI debe tener 13 dígitos numéricos.";
const cargoValidator = (cargo, form) => cargo.trim().length === 0 ? "El cargo es obligatorio." : "";


export function Validador() {
    const [errors, setErrors] = useState({
        nombre: {
            dirty: false,
            error: false,
            message: "",
        },
        apellido: {
            dirty: false,
            error: false,
            message: "",
        },
        noDpi: {
            dirty: false,
            error: false,
            message: "",
        },
        cargo: {
            dirty: false,
            error: false,
            message: "",
        },
    });

    const validarFormulario = ({ form, field, errors, forceTouchErrors = false }) => {
        let isValid = true;

        let nextErrors = JSON.parse(JSON.stringify(errors));

        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
        }

        const { nombre, apellido, noDpi, cargo } = form;

        if (nextErrors.nombre.dirty && (field ? field === "nombre" : true)) {
            const nombreMessage = nombreValidator(nombre, form);
            nextErrors.nombre.error = !!nombreMessage;
            nextErrors.nombre.message = nombreMessage;
            if (!!nombreMessage) isValid = false;
        }

        if (nextErrors.apellido.dirty && (field ? field === "apellido" : true)) {
            const apellidoMessage = apellidoValidator(apellido, form);
            nextErrors.apellido.error = !!apellidoMessage;
            nextErrors.apellido.message = apellidoMessage;
            if (!!apellidoMessage) isValid = false;
        }
        
        if (nextErrors.noDpi.dirty && (field ? field === "noDpi" : true)) {
            const noDpiMessage = noDpiValidator(noDpi, form);
            nextErrors.noDpi.error = !!noDpiMessage;
            nextErrors.noDpi.message = noDpiMessage;
            if (!!noDpiMessage) isValid = false;
        }
        
        if (nextErrors.cargo.dirty && (field ? field === "cargo" : true)) {
            const cargoMessage = cargoValidator(cargo, form);
            nextErrors.cargo.error = !!cargoMessage;
            nextErrors.cargo.message = cargoMessage;
            if (!!cargoMessage) isValid = false;
        }

        setErrors(nextErrors);

        return {
            isValid,
            errors: nextErrors,
        };
    };
    
    const onBlurField = (e, form) => {
        const field = e.target.name;
        const fieldError = errors[field];
        if (fieldError.dirty) return;

        const updatedErrors = {
            ...errors,
            [field]: {
                ...errors[field],
                dirty: true,
            },
        };

        validarFormulario({ form, field, errors: updatedErrors }); 
    };

    return {
        validarFormulario,
        onBlurField,
        errors,
    }
}