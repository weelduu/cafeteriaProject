package com.cafeteria.controller;

import com.cafeteria.dto.ApiResponse;
import com.cafeteria.model.User;
import com.cafeteria.service.PenaltyService;
import com.cafeteria.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final PenaltyService penaltyService;

    @GetMapping
    public ApiResponse<List<User>> getAllUsers() {
        return ApiResponse.success(userService.getAllUsers());
    }

    @PutMapping("/{id}")
    public ApiResponse<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ApiResponse.success(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ApiResponse.success(null);
    }

    @GetMapping("/penalized")
    public ApiResponse<List<User>> getPenalizedUsers() {
        return ApiResponse.success(penaltyService.getPenalizedUsers());
    }

    @PutMapping("/{id}/remove-penalty")
    public ApiResponse<User> removePenalty(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ApiResponse.success(penaltyService.removePenalty(user));
    }
}
