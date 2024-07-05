CRUD APP DE EMPLEADOS

Este proyecto es una aplicación CRUD (Create, Read, Update, Delete) desarrollada utilizando React Native para el frontend y Node.js con MySQL para el backend. Permite gestionar el registro de empleados almacenados en una base de datos.

CARACTERISTICAS

Registro de nuevos empleados con nombre, edad, país, cargo y años de experiencia.
Visualización de todos los empleados registrados.
Actualización de la información de un empleado.
Eliminación de empleados existentes.

TECNOLOGIAS UTILIZADAS

Frontend:

React Native
Axios para manejo de peticiones HTTP
Bootstrap para estilos básicos

Backend:

Node.js
Express.js como framework web
MySQL como base de datos relacional
CORS para permitir peticiones desde el frontend

Instalación
Para ejecutar esta aplicación localmente, sigue estos pasos:

Prerrequisitos
Node.js (v10 o superior)
MySQL
Git

#Clonar el Repositorio#

git clone https://github.com/LiderSalinas-dev/crudapp.git
cd crudapp

#Instalar Dependencias#

Backend
cd server
npm install

Frontend

cd client
npm install

#Configuración de la Base de Datos#

Crea una base de datos MySQL llamada empleados_crud.
Ejecuta el script SQL proporcionado en server/database.sql para crear la tabla empleados.

#Configuración del Backend#
En la carpeta server, crea un archivo .env y configura los siguientes valores:

DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_DATABASE=empleados_crud

#Configuración del Frontend#

En la carpeta client, ajusta la URL de conexión en App.js si es necesario:

const baseURL = 'http://localhost:3001';

#Ejecución#

Backend

cd server
npm start

Frontend

cd client
npm start

#Uso#

Una vez que los servidores estén en funcionamiento:

Accede a http://localhost:3000 en tu navegador para interactuar con la aplicación frontend.

