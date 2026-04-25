package com.cafeteria.service;

import com.cafeteria.model.Institute;
import com.cafeteria.model.User;
import com.cafeteria.repository.InstituteRepository;
import com.cafeteria.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final InstituteRepository instituteRepository;

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ese email"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return user;
    }

    public User register(String email, String password, Long instituteId) {
        // 1. Validar dominio del email
        if (!email.toLowerCase().endsWith("@alu.edu.gva.es")) {
            throw new RuntimeException("El registro solo está permitido para correos @alu.edu.gva.es");
        }

        // 2. Validar si el email ya existe
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        // 3. Obtener el instituto
        Institute institute = instituteRepository.findById(instituteId)
                .orElseThrow(() -> new RuntimeException("Instituto no encontrado"));

        // 4. Generar Personal ID (ej: 1-0012)
        long count = userRepository.countByInstitute_Id(instituteId);
        String personalId = String.format("%d-%04d", instituteId, count + 1);

        // 5. Crear usuario
        User user = new User();
        user.setEmail(email);
        user.setPassword(password); // En entorno real, usar BCrypt
        user.setPersonalId(personalId);
        user.setUsername(personalId); // Usamos el personalId como username por defecto
        user.setRole("USER");
        user.setInstitute(institute);

        return userRepository.save(user);
    }
}
