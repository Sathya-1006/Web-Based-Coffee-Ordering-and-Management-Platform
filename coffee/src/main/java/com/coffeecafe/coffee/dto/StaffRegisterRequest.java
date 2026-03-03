package com.coffeecafe.coffee.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class StaffRegisterRequest {
    // Step 1: Personal
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String gender;
    private String dob;
    private String password;
    private String role;
    private Long cafeId;

    // Step 2: Address
    private String plotNo;
    private String area;
    private String city;
    private String pincode;

    // Step 3: Academic
    private String institution;
    private String degree;
    private String year;
    private MultipartFile govtProof;

    // Step 4: Work Experience
    private String jobTitle;
    private String companyName;
    private String employmentType;
    private String totalYears;
    private String startDate;
    private String endDate;
    private boolean currentlyWorking;
    private String responsibilities;
    private String achievements;
}