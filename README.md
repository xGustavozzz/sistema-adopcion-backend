# Sistema de Adopción – Backend

Backend desarrollado en Node.js + Express con base de datos PostgreSQL, diseñado para gestionar el proceso integral de adopción: registro de usuarios, cuestionario emocional, asignación automática de tipo emocional, administración de mascotas y seguimiento del proceso.

## 1. Características principales

- API REST estructurada mediante controladores y rutas.
- Autenticación y autorización mediante JWT.
- Gestión completa de entidades:
  - adopcion
  - auditoriacuestionario
  - cuestionario
  - historialemocional
  - mascota
  - mascota_imagen
  - opcionrespuesta
  - pregunta
  - respuestasusuario
  - resultadousuario
  - solicitudadopcion
  - tipoemocional

usuario
- Cálculo automático del tipo emocional predominante según las respuestas del cuestionario.
- Respaldo estructural respetando checks, triggers y reglas del archivo Adopcion.tar.
- Respuestas estandarizadas en JSON.
- Protección de endpoints sensibles mediante middleware de autenticación.
- Manejo centralizado de errores.

## 2. Requisitos previos

- Node.js v18 o superior
- PostgreSQL v14 o superior
- npm o yarn

## 3. Instalación

Clonar el repositorio:

```bash
git clone https://github.com/xGustavozzz/sistema-adopcion-backend
cd sistema-adopcion-backend
```
Instalar dependencias:
```bash
npm install
```
## 4. Estructura del proyecto
```bash
src/
│
├── config/
│   └── db.js
│   └── dotenv.js
|
├── controllers/
│   ├── usuarioController.js
│   ├── mascotaController.js
│   ├── cuestionarioController.js
│   └── adopcionController.js
│   ...
|
├── middleware/
|   └── auth.js
│   └── authMiddleware.js
│   └──authorizerole.js
|
├── routes/
│   ├── usuarioRoutes.js
│   ├── mascotaRoutes.js
│   ├── cuestionarioRoutes.js
│   └── adopcionRoutes.js
│    ...
|
├── services/
│   └── cuestionarioService.js
|   ...
|
├── app.js

```

## 5. Endpoints Principales

### 1. Autenticación
- POST /api/auth/register  
  Registra un nuevo usuario.

- POST /api/auth/login  
  Inicia sesión y devuelve un token JWT.

### 2. Cuestionario Emocional
- GET /api/cuestionario  
  Obtiene preguntas y opciones del cuestionario.

- POST /api/cuestionario/responder  
  Recibe respuestas, calcula el tipo emocional y lo registra.  
  (El id_usuario se obtiene desde el token.)

### 3. Mascotas
- GET /api/mascota  
  Lista todas las mascotas.

- POST /api/mascota  
  Crea una mascota.

- PUT /api/mascota/:id  
  Actualiza una mascota según su ID.

- DELETE /api/mascota/:id  
  Elimina una mascota según su ID.

### 4. Adopciones
- POST /api/adopcion  
  Registra una solicitud de adopción.

- GET /api/adopcion/:id_usuario  
  Obtiene el estado o historial de adopción del usuario.

### 5. Usuarios
- GET /api/usuario/me  
  Información del usuario autenticado. (si está implementado)
  
## 6. Lógica del Cuestionario
 1. El usuario responde preguntas con opciones predefinidas.
 2. Cada opción tiene un peso asociado a un tipo emocional.
 3. Se suman los pesos.
 4. Se determina el tipo emocional predominante.
 5. Se registra en resultadousuario y en el usuario.
 6. Se respetan triggers y reglas del respaldo oficial.

## 7. Ejecutar el servidor
```bash
npm start
```
Servidor por defecto:
```bash
http://localhost:3000
```

## 8. Licencia
Proyecto académico. Uso permitido para fines educativos y de investigación.
