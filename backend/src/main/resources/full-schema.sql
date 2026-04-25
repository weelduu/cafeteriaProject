-- SCRIPT DE INICIALIZACIÓN COMPLETA (Schema + Datos)
-- Ejecuta este script en DBeaver para resetear la base de datos totalmente

-- 1. Borrar tablas si existen (en orden inverso de dependencia)
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS offers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS institutes CASCADE;

-- 2. Crear tabla Institutos
CREATE TABLE institutes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    prefix VARCHAR(5) NOT NULL
);

-- 3. Crear tabla Usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    personal_id VARCHAR(20) UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) DEFAULT 'USER',
    institute_id INTEGER REFERENCES institutes(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Crear tabla Productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(5, 2) NOT NULL,
    category VARCHAR(10) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    image_url TEXT
);

-- 5. Crear tabla Ofertas
CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    product_id INTEGER REFERENCES products(id),
    discount_percent INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

-- 6. Crear tabla Reservas
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    shift VARCHAR(10) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(15) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT NOW()
);

-- ---------------------------------------------------------
-- INSERCIÓN DE DATOS DE PRUEBA
-- ---------------------------------------------------------

-- Institutos iniciales
INSERT INTO institutes (id, name, prefix) VALUES 
(1, 'IES Serpis', 'SER'),
(2, 'IES Cabanyal', 'CAB');

-- Usuarios iniciales (Admins y algunos alumnos)
INSERT INTO users (personal_id, username, email, password, role, institute_id) VALUES 
('admin1', 'admin1', 'admin1@edu.gva.es', 'admin123', 'ADMIN', 1),
('admin2', 'admin2', 'admin2@edu.gva.es', 'admin123', 'ADMIN', 2),
('1-0001', '1-0001', 'hugo@alu.edu.gva.es', 'hugo123', 'USER', 1),
('2-0001', '2-0001', 'luis@alu.edu.gva.es', 'luis123', 'USER', 2);

-- Productos iniciales
INSERT INTO products (name, description, price, category, image_url) VALUES 
('Café con leche', 'Café cremoso con leche caliente', 1.50, 'BEBIDAS', 'https://images.unsplash.com/photo-1541167760496-1628856ab772'),
('Tostada con tomate', 'Tostada de pan artesano con tomate natural y aceite', 2.00, 'COMIDA', 'https://images.unsplash.com/photo-1525351484163-7529414344d8'),
('Bocadillo de Jamón', 'Bocadillo de jamón serrano con aceite de oliva', 3.50, 'COMIDA', 'https://images.unsplash.com/photo-1553909489-cd47e0907980');

-- Ofertas iniciales
INSERT INTO offers (name, description, product_id, discount_percent, start_date, end_date) VALUES 
('Oferta Desayuno', '20% de descuento en Tostada', 2, 20, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days');

-- Reservas iniciales
INSERT INTO reservations (user_id, product_id, shift, date, status) VALUES 
(3, 3, 'RECREO1', CURRENT_DATE, 'ACTIVE');
