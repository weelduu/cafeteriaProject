package com.cafeteria.repository;

import com.cafeteria.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByEndDateGreaterThanEqual(LocalDate date);
}
