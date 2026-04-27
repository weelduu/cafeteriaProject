-- Script de datos de prueba para la Cafetería
-- Ejecutar en PostgreSQL después de que Spring Boot haya creado las tablas (hibernate ddl-auto=update)

-- 1. Insertar Institutos
INSERT INTO institutes (name, prefix) VALUES ('IES Serpis', 'IESSP');
INSERT INTO institutes (name, prefix) VALUES ('IES Newton', 'IESNW');

-- 2. Insertar Usuarios
-- Usuario administrador
INSERT INTO users (personal_id, email, username, password, role, institute_id, created_at, penalty_level) 
VALUES ('1-0001', 'admin@alu.edu.gva.es', 'admin', 'admin123', 'ADMIN', 1, NOW(), 0);

-- Usuario normal
INSERT INTO users (personal_id, email, username, password, role, institute_id, created_at, penalty_level) 
VALUES ('1-0002', 'alumno1@alu.edu.gva.es', 'alumno1', '1234', 'USER', 1, NOW(), 0);

-- Usuario penalizado (Nivel 1: 1 semana)
INSERT INTO users (personal_id, email, username, password, role, institute_id, created_at, penalty_level, penalty_start_date, penalty_end_date) 
VALUES ('1-0003', 'alumno_penalizado@alu.edu.gva.es', 'alumno_penalizado', '1234', 'USER', 1, NOW(), 1, NOW(), NOW() + INTERVAL '7 days');

-- 3. Insertar Productos
INSERT INTO products (name, description, price, category, available, image_url) 
VALUES ('Bocadillo de Jamón', 'Delicioso bocadillo de jamón serrano con tomate', 2.50, 'Bocadillos', true, 'https://via.placeholder.com/150');

INSERT INTO products (name, description, price, category, available, image_url) 
VALUES ('Bocadillo de Tortilla', 'Bocadillo de tortilla de patatas recién hecha', 2.00, 'Bocadillos', true, 'https://via.placeholder.com/150');

INSERT INTO products (name, description, price, category, available, image_url) 
VALUES ('Coca-Cola', 'Lata de Coca-Cola 33cl', 1.20, 'Bebidas', true, 'https://via.placeholder.com/150');

INSERT INTO products (name, description, price, category, available, image_url) 
VALUES ('Café con Leche', 'Café recién molido con leche', 1.10, 'Cafetería', true, 'https://via.placeholder.com/150');

-- 4. Insertar Ofertas
INSERT INTO offers (name, description, product_id, discount_percent, start_date, end_date) 
VALUES ('Promo Vuelta al Cole', 'Descuento especial de inicio de curso', 1, 20, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days');

INSERT INTO offers (name, description, product_id, discount_percent, start_date, end_date) 
VALUES ('Bebida de Invierno', 'Café más barato en días fríos', 4, 15, CURRENT_DATE, CURRENT_DATE + INTERVAL '10 days');

-- 5. Insertar Reservas (Pedidos)
-- Reserva Activa
INSERT INTO reservations (user_id, product_id, shift, date, status, created_at) 
VALUES (2, 1, 'Patio 1', CURRENT_DATE, 'ACTIVE', NOW());

-- Reserva Cancelada
INSERT INTO reservations (user_id, product_id, shift, date, status, created_at) 
VALUES (2, 3, 'Patio 2', CURRENT_DATE, 'CANCELLED', NOW() - INTERVAL '2 hours');

-- Reserva No Recogida (Historial que generó la penalización del alumno 3)
INSERT INTO reservations (user_id, product_id, shift, date, status, created_at) 
VALUES (3, 2, 'Patio 1', CURRENT_DATE - INTERVAL '1 day', 'NOT_PICKED_UP', NOW() - INTERVAL '1 day');
