package com.cafeteria.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "personal_id", unique = true, length = 20)
    private String personalId;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(length = 10)
    private String role = "USER";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "institute_id")
    private Institute institute;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT NOW()")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "penalty_level", columnDefinition = "integer default 0")
    private int penaltyLevel = 0;

    @Column(name = "penalty_start_date")
    private LocalDateTime penaltyStartDate;

    @Column(name = "penalty_end_date")
    private LocalDateTime penaltyEndDate;
}
