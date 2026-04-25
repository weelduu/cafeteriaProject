package com.cafeteria.service;

import com.cafeteria.model.Product;
import com.cafeteria.model.Reservation;
import com.cafeteria.model.User;
import com.cafeteria.repository.ProductRepository;
import com.cafeteria.repository.ReservationRepository;
import com.cafeteria.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<Reservation> getMyReservations(Long userId) {
        return reservationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Reservation createReservation(Long userId, Long productId, String shift) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado (ID: " + userId + ")"));
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado (ID: " + productId + ")"));
        
        if (!product.getAvailable()) {
            throw new RuntimeException("El producto no está disponible para reserva.");
        }

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setProduct(product);
        reservation.setShift(shift);
        reservation.setDate(LocalDate.now());
        reservation.setStatus("ACTIVE");
        
        return reservationRepository.save(reservation);
    }

    public Reservation cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada (ID: " + id + ")"));
        
        reservation.setStatus("CANCELLED");
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}
