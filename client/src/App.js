import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [años, setAños] = useState('');
  const [id, setId] = useState(null);
  const [editar, setEditar] = useState(false);
  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    if (!nombre || !edad || !pais || !cargo || !años) {
      alert('Por favor, completa todos los campos antes de registrar el empleado.');
      return;
    }

    Axios.post('http://localhost:3001/create', {
      nombre,
      edad,
      pais,
      cargo,
      años,
    })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: 'Registro Exitoso',
          html: `El empleado <b>${nombre} </b>fue registrado con éxito`,
          icon: 'success',
        });
      })
      .catch((error) => {
        console.error('Error al registrar el empleado:', error);
        alert('Error al registrar el empleado. Por favor, verifica los datos e intenta de nuevo.');
      });
  };

  const update = () => {
    Axios.put('http://localhost:3001/update', {
      id,
      nombre,
      edad,
      pais,
      cargo,
      años,
    })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: 'Actualización Exitosa',
          text: `El empleado ${nombre} fue actualizado con éxito`,
          icon: 'success',
        });
      })
      .catch((error) => {
        console.error('Error al actualizar el empleado:', error);
        alert('Error al actualizar el empleado. Por favor, verifica los datos e intenta de nuevo.');
      });
  };

  const deleteEmpleado = (id, nombre) => {
    if (!id || !nombre) {
      console.error('ID o nombre no definidos');
      return;
    }

    Axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: 'Eliminación Exitosa',
          text: `El empleado ${nombre} fue Eliminado con éxito`,
          icon: 'success',
        });
      })
      .catch((error) => {
        console.error('Error al eliminar empleado:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al eliminar el empleado',
          icon: 'error',
        });
      });
  };

  const limpiarCampos = () => {
    setAños('');
    setNombre('');
    setCargo('');
    setEdad('');
    setPais('');
    setId('');
    setEditar(false);
  };

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAños(val.años);
    setId(val.id);
  };

  const getEmpleados = () => {
    Axios.get('http://localhost:3001/empleados').then((response) => {
      setEmpleados(response.data);
    });
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">REGISTRO DE EMPLEADOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              value={nombre}
              placeholder="Ingresar Nombre"
              aria-label="Nombre"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Edad:
            </span>
            <input
              type="number"
              value={edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control"
              placeholder="Ingresar Edad"
              aria-label="Edad"
              aria-describedby="basic-addon2"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">
              País:
            </span>
            <input
              type="text"
              value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              placeholder="Ingresar País"
              aria-label="País"
              aria-describedby="basic-addon3"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon4">
              Cargo:
            </span>
            <input
              type="text"
              value={cargo}
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control"
              placeholder="Ingresar Cargo"
              aria-label="Cargo"
              aria-describedby="basic-addon4"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon5">
              Años de Experiencia:
            </span>
            <input
              type="number"
              value={años}
              onChange={(event) => {
                setAños(event.target.value);
              }}
              className="form-control"
              placeholder="Ingresar Años"
              aria-label="Años"
              aria-describedby="basic-addon5"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-info m-2" onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val, key) => (
            <tr key={key}>
              <th scope="row">{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.años}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                  <button type="button" onClick={() => editarEmpleado(val)} className="btn btn-info">
                    Editar
                  </button>
                  <button type="button" onClick={() => deleteEmpleado(val.id, val.nombre)} className="btn btn-danger">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
