package com.coffeecafe.coffee.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

    // Step 1: Personal & Account
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotNull(message = "Date of birth is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Role is required")
    private String role;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    // Step 2: Address Details
    private String plotNo;
    private String area;    // Matches 'area' in your form
    private String street;  // Kept for backward compatibility
    private String city;
    private String pincode;

    // Step 3: Academic Details
    private String institution;
    private String degree;
    private String year;

    // Step 4: Work Experience Details
    private String jobTitle;
    private String companyName;
    private String employmentType;
    private String totalYears;
    private String startDate;
    private String endDate;
    private boolean currentlyWorking;
    private String responsibilities;
    private String achievements;

    // Summary field (optional)
    private String workExperience;
}