package com.cafeteria.service;

import com.cafeteria.model.User;
import com.cafeteria.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return user;
    }

    public User register(String email, String username, String password) {
        // Validación extra: Formato de email
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            throw new RuntimeException("Formato de email inválido");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("El nombre de usuario ya existe");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(password); // In production, hash this
        user.setRole("USER");

        return userRepository.save(user);
    }
}
