package com.coffeecafe.coffee.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cafe_tables")
public class TableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tableNumber;
    private Integer capacity;
    private Double price;
    private Long cafeId;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image; // Base64 string
}