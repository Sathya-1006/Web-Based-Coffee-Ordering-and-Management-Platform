package com.coffeecafe.coffee.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "menu_items")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private Double price;
    private String description;
    private Long cafeId;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo; // Stores the Base64 image string
}