package com.coffeecafe.coffee.entity;

import com.coffeecafe.coffee.entity.Cafe;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class CafeTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tableNumber;
    private int capacity;
    private double price;
    private String status; // Available, Booked

    @ElementCollection
    @CollectionTable(name = "table_images", joinColumns = @JoinColumn(name = "table_id"))
    @Column(name = "image_data", columnDefinition = "LONGTEXT")
    private List<String> images = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "cafe_id")
    private Cafe cafe; // This creates the cafe_id column in MySQL
}