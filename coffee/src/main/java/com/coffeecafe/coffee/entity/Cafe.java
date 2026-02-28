package com.coffeecafe.coffee.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "cafes")
public class Cafe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cafeName;
    private String ownerName;
    private String contactNumber;
    private String email;
    private String openingTime;
    private String closingTime;

    // Address fields
    private String street;
    private String city;
    private String state;
    private String pincode;

    // Business info
    private String businessType;
    private String fssaiLicenseNumber;
    private String gstNumber;

    // Media (Storing as Strings for URLs/Base64)
    @Lob
    private String cafeImage;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
}