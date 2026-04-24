package com.cafeteria.service;

import com.cafeteria.model.Offer;
import com.cafeteria.repository.OfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;

    public List<Offer> getActiveOffers() {
        return offerRepository.findByEndDateGreaterThanEqual(LocalDate.now());
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public Offer createOffer(Offer offer) {
        return offerRepository.save(offer);
    }

    public void deleteOffer(Long id) {
        offerRepository.deleteById(id);
    }
}
