package com.coffeecafe.coffee.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StaffProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String dob;
    private String password;

    // Link to the User (Account)
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Link to the Cafe (The "Belongs To" Relationship)
    @ManyToOne
    @JoinColumn(name = "cafe_id")
    private Cafe cafe;

    // Step 1 & 2: Personal & Address
    private String phone;
    private String plotNo;
    private String area;
    private String city;
    private String pincode;

    // Step 3: Academic
    private String institution;
    private String degree;
    private String passingYear;
    private String govtProofPath; // Stores the file path of the uploaded ID

    // Step 4: Work Experience
    private String jobTitle;
    private String companyName;
    private String employmentType;
    private String startDate;
    private String endDate;
    private boolean currentlyWorking;
    @Column(columnDefinition = "TEXT")
    private String responsibilities;
    @Column(columnDefinition = "TEXT")
    private String achievements;
    private String totalYearsOfExperience;
}
