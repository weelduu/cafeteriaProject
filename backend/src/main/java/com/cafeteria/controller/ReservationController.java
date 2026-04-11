package com.cafeteria.controller;

import com.cafeteria.dto.ApiResponse;
import com.cafeteria.model.Reservation;
import com.cafeteria.service.ReservationService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("/my")
    public ApiResponse<List<Reservation>> getMyReservations(@RequestParam Long userId) {
        return ApiResponse.success(reservationService.getMyReservations(userId));
    }

    @PostMapping
    public ApiResponse<Reservation> createReservation(@RequestBody ReservationRequest request) {
        Reservation reservation = reservationService.createReservation(
                request.getUserId(), 
                request.getProductId(), 
                request.getShift()
        );
        return ApiResponse.success(reservation);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Reservation> cancelReservation(@PathVariable Long id) {
        return ApiResponse.success(reservationService.cancelReservation(id));
    }

    @Data
    public static class ReservationRequest {
        private Long userId;
        private Long productId;
        private String shift;
    }
}
