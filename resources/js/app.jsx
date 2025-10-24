import './bootstrap';
import "../css/app.css";

import { createRoot } from 'react-dom/client';
import ListaEmpleados from './components/ListaEmpleados';

const empleado = document.getElementById('app');
const root = createRoot(empleado);
root.render(<ListaEmpleados />);
