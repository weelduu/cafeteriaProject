package com.cafeteria.repository;

import com.cafeteria.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByPersonalId(String personalId);
    List<User> findByInstitute_Id(Long instituteId);
    long countByInstitute_Id(Long instituteId);
    List<User> findByPenaltyEndDateAfter(java.time.LocalDateTime date);
    List<User> findByPenaltyLevelGreaterThan(int level);
}
