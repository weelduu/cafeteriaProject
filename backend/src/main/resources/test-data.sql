-- Script de datos de prueba Actualizado
-- Úsalo si solo quieres resetear los datos sin borrar las tablas

TRUNCATE TABLE reservations, offers, products, users, institutes RESTART IDENTITY CASCADE;

INSERT INTO institutes (id, name, prefix) VALUES 
(1, 'IES Serpis', 'SER'),
(2, 'IES Cabanyal', 'CAB');

INSERT INTO users (personal_id, username, email, password, role, institute_id) VALUES 
('admin1', 'admin1', 'admin1@edu.gva.es', 'admin123', 'ADMIN', 1),
('admin2', 'admin2', 'admin2@edu.gva.es', 'admin123', 'ADMIN', 2),
('1-0001', '1-0001', 'hugo@alu.edu.gva.es', 'hugo123', 'USER', 1),
('2-0001', '2-0001', 'luis@alu.edu.gva.es', 'luis123', 'USER', 2);

INSERT INTO products (name, description, price, category, image_url) VALUES 
('Café con leche', 'Café cremoso con leche caliente', 1.50, 'BEBIDAS', 'https://images.unsplash.com/photo-1541167760496-1628856ab772'),
('Tostada con tomate', 'Tostada de pan artesano con tomate natural y aceite', 2.00, 'COMIDA', 'https://images.unsplash.com/photo-1525351484163-7529414344d8'),
('Bocadillo de Jamón', 'Bocadillo de jamón serrano con aceite de oliva', 3.50, 'COMIDA', 'https://images.unsplash.com/photo-1553909489-cd47e0907980');
