package com.coffeecafe.coffee.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

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
    private String category;

    @ManyToOne
    @JoinColumn(name = "cafe_id")
    private Cafe cafe;

    // ---MULTIPLE IMAGES ---
    @ElementCollection
    @CollectionTable(name = "menu_item_photos", joinColumns = @JoinColumn(name = "menu_item_id"))
    @Column(name = "photo", columnDefinition = "LONGTEXT")
    private List<String> photos;
}