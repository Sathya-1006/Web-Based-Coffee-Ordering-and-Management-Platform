package com.coffeecafe.coffee.controller;

import com.coffeecafe.coffee.dto.ApiResponse;
import com.coffeecafe.coffee.dto.LoginRequest;
import com.coffeecafe.coffee.dto.RegisterRequest;
import com.coffeecafe.coffee.entity.User;
import com.coffeecafe.coffee.service.UserService;
import com.coffeecafe.coffee.service.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    // --- EXISTING REGISTRATION (JSON BASED) ---
    @PostMapping(value = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> registerUser(
            @RequestPart("userData") String userDataJson,
            @RequestPart("govtProof") MultipartFile govtProof
    ) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
            RegisterRequest request = objectMapper.readValue(userDataJson, RegisterRequest.class);

            userService.registerUser(request, govtProof);
            return ResponseEntity.ok(new ApiResponse("Registration Successful", true));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse("Error: " + e.getMessage(), false));
        }
    }

    // --- NEW STAFF REGISTRATION (STEP 1-4 PARAMS) ---
    @PostMapping("/api/staff/register")
    public ResponseEntity<?> registerStaff(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("role") String role,
            @RequestParam("gender") String gender,
            @RequestParam("dob") String dob,
            @RequestParam("phone") String phone,
            @RequestParam("plotNo") String plotNo,
            @RequestParam("area") String area,
            @RequestParam("city") String city,
            @RequestParam("pincode") String pincode,
            @RequestParam("institution") String institution,
            @RequestParam("degree") String degree,
            @RequestParam("year") String year,
            @RequestParam("govtProof") MultipartFile govtProof,
            @RequestParam("jobTitle") String jobTitle,
            @RequestParam("companyName") String companyName,
            @RequestParam("totalYears") String totalYears,
            @RequestParam("startDate") String startDate,
            @RequestParam(value = "endDate", required = false) String endDate,
            @RequestParam("currentlyWorking") boolean currentlyWorking,
            @RequestParam("responsibilities") String responsibilities,
            @RequestParam("achievements") String achievements,
            @RequestParam("cafeId") Long cafeId) {

        try {
            // 1. Create a Request object to send to the Service
            RegisterRequest request = new RegisterRequest();
            request.setFirstName(firstName);
            request.setLastName(lastName);
            request.setEmail(email);
            request.setPassword(password);
            request.setRole(role);
            request.setGender(gender);
            request.setDob(LocalDate.parse(dob)); // Converts String to LocalDate
            request.setPhoneNumber(phone);
            request.setPlotNo(plotNo);
            request.setArea(area);
            request.setCity(city);
            request.setPincode(pincode);
            request.setInstitution(institution);
            request.setDegree(degree);
            request.setYear(year);
            request.setJobTitle(jobTitle);
            request.setCompanyName(companyName);
            request.setTotalYears(totalYears);
            request.setStartDate(startDate);
            request.setEndDate(endDate);
            request.setCurrentlyWorking(currentlyWorking);
            request.setResponsibilities(responsibilities);
            request.setAchievements(achievements);

            // 2. Call the service to save to DB
            userService.registerUser(request, govtProof);

            return ResponseEntity.ok(new ApiResponse("Staff registered successfully", true));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse("Registration failed: " + e.getMessage(), false));
        }
    }

    // --- OTHER ENDPOINTS ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body(new ApiResponse("Invalid email or password", false));
        }
    }

    @PostMapping("/set-password")
    public ResponseEntity<?> setPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String newPassword = payload.get("password");
        userService.updatePasswordAndActivate(email, newPassword);
        return ResponseEntity.ok(new ApiResponse("Password updated successfully", true));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        emailService.sendResetLink(email);
        return ResponseEntity.ok(new ApiResponse("Reset link sent successfully", true));
    }
}