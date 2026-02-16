package com.coffeecafe.coffee.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;
    private String role;
    private String email;
    private String password;
    private String govtProofPath;
    private String status;
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
    private String workExperience;

    // Address Details
    private String street;
    private String plotNo;
    private String city;
    private String pincode;

    // Getters and Setters

    @ElementCollection
    @CollectionTable(name = "user_academic_info", joinColumns = @JoinColumn(name = "user_id"))
    private List<AcademicInfo> academicHistory;

    public String getGovtProofPath() { return govtProofPath; }
    public void setGovtProofPath(String govtProofPath) { this.govtProofPath = govtProofPath; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
