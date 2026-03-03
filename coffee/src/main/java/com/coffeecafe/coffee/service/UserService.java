package com.coffeecafe.coffee.service;

import com.coffeecafe.coffee.dto.RegisterRequest;
import com.coffeecafe.coffee.entity.User;
import com.coffeecafe.coffee.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Handles User Registration with Multi-step data and File Upload
     */
    public void registerUser(RegisterRequest request, MultipartFile govtProof) {
        User user = new User();

        // Step 1: Personal
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setGender(request.getGender());
        user.setDob(request.getDob());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // ENCODE IT HERE
        user.setStatus("PENDING");

        // Step 2: Address
        user.setPlotNo(request.getPlotNo());
        user.setArea(request.getArea());
        user.setCity(request.getCity());
        user.setPincode(request.getPincode());

        // Step 3: Academic
        user.setInstitution(request.getInstitution());
        user.setDegree(request.getDegree());
        user.setPassingYear(request.getYear());

        // Step 4: Work Experience
        user.setJobTitle(request.getJobTitle());
        user.setCompanyName(request.getCompanyName());
        user.setEmploymentType(request.getEmploymentType());
        user.setTotalYears(request.getTotalYears());
        user.setStartDate(request.getStartDate());
        user.setEndDate(request.getEndDate());
        user.setCurrentlyWorking(request.isCurrentlyWorking());
        user.setResponsibilities(request.getResponsibilities());
        user.setAchievements(request.getAchievements());

        // Handle File Upload for Govt Proof
        // Inside registerUser method in UserService.java
        if (govtProof != null && !govtProof.isEmpty()) {
            try {
                // Change this to match your React URL path
                String uploadDir = "uploads/proofs/";
                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                String fileName = System.currentTimeMillis() + "_" + govtProof.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                Files.copy(govtProof.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                user.setGovtProofPath(fileName);
            } catch (Exception e) {
                throw new RuntimeException("Could not store file", e);
            }
        }

        userRepository.save(user);
    }

    /**
     * Admin Approval Logic: Generates Temp Password and Emails user
     */
    public void approveUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate 8-character temporary password
        String tempPassword = java.util.UUID.randomUUID().toString().substring(0, 8);

        user.setPassword(passwordEncoder.encode(tempPassword));
        user.setStatus("APPROVED");
        userRepository.save(user);

        // The Login Link (Update this URL if your React port is different)
        String loginLink = "http://localhost:5173/login";

        sendEmail(user.getEmail(), "Account Approved",
                "Congratulations! Your account has been approved.\n\n" +
                        "Your temporary password is: " + tempPassword + "\n" +
                        "Login here to reset your password: " + loginLink);
    }

    /**
     * Admin Denial Logic: Updates status and notifies user
     */
    public void denyUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus("DENIED");
        userRepository.save(user);

        sendEmail(user.getEmail(), "Application Update",
                "Your application for the Coffee Platform has been denied.");
    }

    /**
     * Fetches users based on their current status (e.g., PENDING, APPROVED)
     */
    public List<User> getUsersByStatus(String status) {
        // Corrected: Removed unreachable code and used repository call directly
        return userRepository.findByStatus(status);
    }

    /**
     * Handles first-time login password resets
     */
    public void updatePasswordAndActivate(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setStatus("ACTIVE");
        userRepository.save(user);
    }

    /**
     * Standard Login verification
     */
    public User loginUser(String email, String password) {
        System.out.println("--- Login Attempt ---");
        System.out.println("Email: " + email);

        return userRepository.findByEmail(email).map(user -> {
            boolean isMatch = passwordEncoder.matches(password, user.getPassword());

            System.out.println("Password Match: " + isMatch);
            System.out.println("User Status: " + user.getStatus());
            System.out.println("Stored Hash: " + user.getPassword());

            if (isMatch) return user;
            return null;
        }).orElseGet(() -> {
            System.out.println("User not found in DB");
            return null;
        });
    }

    /**
     * Helper method to send emails via Gmail SMTP
     */
    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}