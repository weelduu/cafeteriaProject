package com.cafeteria.controller;

import com.cafeteria.dto.ApiResponse;
import com.cafeteria.model.Offer;
import com.cafeteria.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OfferController {

    private final OfferService offerService;

    @GetMapping
    public ApiResponse<List<Offer>> getOffers() {
        return ApiResponse.success(offerService.getActiveOffers());
    }

    @GetMapping("/all")
    public ApiResponse<List<Offer>> getAllOffers() {
        return ApiResponse.success(offerService.getAllOffers());
    }

    @PostMapping
    public ApiResponse<Offer> createOffer(@RequestBody Offer offer) {
        return ApiResponse.success(offerService.createOffer(offer));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteOffer(@PathVariable Long id) {
        offerService.deleteOffer(id);
        return ApiResponse.success(null);
    }
}
