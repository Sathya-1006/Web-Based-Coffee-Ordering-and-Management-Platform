package com.coffeecafe.coffee.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    // Media
    @ElementCollection
    @CollectionTable(name = "cafe_images", joinColumns = @JoinColumn(name = "cafe_id"))
    @Column(name = "image_data", columnDefinition = "LONGTEXT")
    private List<String> cafeImages = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();


}