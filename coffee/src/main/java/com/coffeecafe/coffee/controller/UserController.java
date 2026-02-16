package com.coffeecafe.coffee.controller;

// CRITICAL: These imports resolve all the red text in your screenshots
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

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // Fixes registration errors shown in image_3d7423.png
    @PostMapping(value = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> registerUser(
            @RequestPart("userData") String userDataJson,
            @RequestPart("govtProof") MultipartFile govtProof
    ) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // ADD THIS LINE: This tells Jackson how to handle Java 8 Dates (LocalDate)
            objectMapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

            RegisterRequest request = objectMapper.readValue(userDataJson, RegisterRequest.class);

            userService.registerUser(request, govtProof);
            return ResponseEntity.ok(new ApiResponse("Registration Successful"));
        } catch (Exception e) {
            // This will now show more helpful error messages if something else is wrong
            return ResponseEntity.status(400).body(new ApiResponse("Error: " + e.getMessage()));
        }
    }

    // Fixes login errors shown in image_3d785d.png
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


}