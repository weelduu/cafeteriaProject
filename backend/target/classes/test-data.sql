-- Script de datos de prueba para Cafeteria Project (PostgreSQL)

-- Limpiar tablas (opcional, comentar si no se desea borrar lo existente)
-- TRUNCATE TABLE reservations, offers, products, users, institutes RESTART IDENTITY CASCADE;

-- Insertar Institutos
INSERT INTO institutes (name, prefix) VALUES 
('IES Velad al Hamar', 'IESVH'),
('IES El Argar', 'IESEA'),
('IES Al-Andalus', 'IESAA');

-- Insertar Usuarios
-- Nota: En un entorno real las contraseñas deberían estar hasheadas (ej. BCrypt)
-- Estos usuarios son de prueba.
INSERT INTO users (username, email, password, role, created_at) VALUES 
('admin', 'admin@cafeteria.com', 'admin123', 'ADMIN', NOW()),
('hugo', 'hugo@example.com', 'hugo123', 'USER', NOW()),
('paco', 'paco@example.com', 'paco123', 'USER', NOW()),
('luis', 'luis@example.com', 'luis123', 'USER', NOW());

-- Insertar Productos
INSERT INTO products (name, description, price, category, available, image_url) VALUES 
('Café con leche', 'Café cremoso con leche caliente', 1.50, 'BEBIDAS', true, 'https://images.unsplash.com/photo-1541167760496-1628856ab772'),
('Tostada con tomate', 'Tostada de pan artesano con tomate natural y aceite', 2.00, 'COMIDA', true, 'https://images.unsplash.com/photo-1525351484163-7529414344d8'),
('Bocadillo de Jamón', 'Bocadillo de jamón serrano con aceite de oliva', 3.50, 'COMIDA', true, 'https://images.unsplash.com/photo-1553909489-cd47e0907980'),
('Zumo de Naranja', 'Zumo de naranja recién exprimido', 2.50, 'BEBIDAS', true, 'https://images.unsplash.com/photo-1613478223719-2ab802602423'),
('Menú del día', 'Plato principal, bebida y postre', 6.50, 'MENU', true, 'https://images.unsplash.com/photo-1547592166-23ac45744acd'),
('Muffin de chocolate', 'Muffin artesano de chocolate negro', 1.80, 'DULCES', true, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35');

-- Insertar Ofertas
INSERT INTO offers (name, description, product_id, discount_percent, start_date, end_date) VALUES 
('Oferta Desayuno', '20% de descuento en Tostada con tomate al pedir un café', 2, 20, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days'),
('Promo Menú Semanal', 'Descuento especial en el menú del día', 5, 10, CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days');

-- Insertar Reservas
INSERT INTO reservations (user_id, product_id, shift, date, status, created_at) VALUES 
(2, 3, 'RECREO1', CURRENT_DATE, 'ACTIVE', NOW()),
(2, 1, 'RECREO1', CURRENT_DATE, 'ACTIVE', NOW()),
(3, 5, 'RECREO2', CURRENT_DATE, 'ACTIVE', NOW()),
(4, 6, 'RECREO1', CURRENT_DATE, 'COMPLETED', NOW());
