package com.coffeecafe.coffee.controller;

import com.coffeecafe.coffee.dto.ApiResponse;
import com.coffeecafe.coffee.dto.LoginRequest;
import com.coffeecafe.coffee.dto.RegisterRequest;
import com.coffeecafe.coffee.entity.User;
import com.coffeecafe.coffee.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import com.coffeecafe.coffee.service.EmailService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping(value = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> registerUser(
            @RequestPart("userData") String userDataJson,
            @RequestPart("govtProof") MultipartFile govtProof
    ) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // This tells Jackson how to handle Java 8 Dates (LocalDate)
            objectMapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

            RegisterRequest request = objectMapper.readValue(userDataJson, RegisterRequest.class);

            userService.registerUser(request, govtProof);
            return ResponseEntity.ok(new ApiResponse("Registration Successful"));
        } catch (Exception e) {
            // This will now show more helpful error messages if something else is wrong
            return ResponseEntity.status(400).body(new ApiResponse("Error: " + e.getMessage()));
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user); // Status 200
        } else {
            return ResponseEntity.status(401).body("Invalid email or password"); // Status 401
        }
    }

    @PostMapping("/set-password")
    public ApiResponse setPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String newPassword = payload.get("password");
        userService.updatePasswordAndActivate(email, newPassword);
        return new ApiResponse("Password updated successfully");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        // 1. Ideally check if the user exists first
        // 2. If exists, send email
        emailService.sendResetLink(email);
        return ResponseEntity.ok("Reset link sent successfully");
    }


}