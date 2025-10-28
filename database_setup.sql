-- Drop tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS mascota_imagen;
DROP TABLE IF EXISTS solicitudadopcion;
DROP TABLE IF EXISTS adopcion;
DROP TABLE IF EXISTS resultadousuario;
DROP TABLE IF EXISTS respondedorcuestionario;
DROP TABLE IF EXISTS opcionrespuesta;
DROP TABLE IF EXISTS pregunta;
DROP TABLE IF EXISTS cuestionario;
DROP TABLE IF EXISTS mascota;
DROP TABLE IF EXISTS tipoemocional;
DROP TABLE IF EXISTS users;

-- Create tables
CREATE TABLE users (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    rol VARCHAR(20) DEFAULT 'usuario'
);

CREATE TABLE tipoemocional (
    id_emocional SERIAL PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE mascota (
    id_mascota SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    tamano VARCHAR(50),
    edad INTEGER,
    sexo VARCHAR(20),
    descripcion TEXT,
    estado_adopcion VARCHAR(50) DEFAULT 'disponible',
    lugar_actual VARCHAR(255),
    requerimientos TEXT,
    id_emocional INTEGER REFERENCES tipoemocional(id_emocional)
);

CREATE TABLE mascota_imagen (
    id_imagen SERIAL PRIMARY KEY,
    id_mascota INTEGER REFERENCES mascota(id_mascota) ON DELETE CASCADE,
    imagen BYTEA NOT NULL,
    orden INTEGER NOT NULL,
    UNIQUE(id_mascota, orden)
);

CREATE TABLE cuestionario (
    id_cuestionario SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT
);

CREATE TABLE pregunta (
    id_pregunta SERIAL PRIMARY KEY,
    id_cuestionario INTEGER REFERENCES cuestionario(id_cuestionario) ON DELETE CASCADE,
    texto_pregunta TEXT NOT NULL,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE opcionrespuesta (
    id_opcion SERIAL PRIMARY KEY,
    id_pregunta INTEGER REFERENCES pregunta(id_pregunta) ON DELETE CASCADE,
    texto_opcion TEXT NOT NULL,
    valor INTEGER
);

CREATE TABLE respondedorcuestionario (
    id_respondedor SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES users(id_usuario),
    id_cuestionario INTEGER REFERENCES cuestionario(id_cuestionario),
    fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    respuestas JSONB
);

CREATE TABLE resultadousuario (
    id_resultado SERIAL PRIMARY KEY,
    id_respondedor INTEGER REFERENCES respondedorcuestionario(id_respondedor),
    id_emocional INTEGER REFERENCES tipoemocional(id_emocional),
    fecha_resultado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    puntuacion INTEGER
);

CREATE TABLE solicitudadopcion (
    id_solicitud SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES users(id_usuario),
    id_mascota INTEGER REFERENCES mascota(id_mascota),
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'pendiente',
    motivo TEXT,
    respuesta TEXT
);

CREATE TABLE adopcion (
    id_adopcion SERIAL PRIMARY KEY,
    id_solicitud INTEGER REFERENCES solicitudadopcion(id_solicitud),
    fecha_adopcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    condiciones TEXT,
    estado VARCHAR(50) DEFAULT 'activa'
);

-- Insert some initial data for tipoemocional
INSERT INTO tipoemocional (descripcion) VALUES 
('Juguetón y Energético'),
('Tranquilo y Relajado'),
('Sociable y Amigable'),
('Independiente'),
('Protector'),
('Tímido y Cauteloso');

-- Create an admin user (password: admin123)
INSERT INTO users (nombre, apellido, email, password, rol) 
VALUES ('Admin', 'System', 'admin@adopcion.com', '$2b$10$XOPbrlUPQdwdJUpSrIFR8.M6J.3JQT9bw6VzjrLyOoYKBYUhF8/qi', 'admin');