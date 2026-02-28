package com.coffeecafe.coffee.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "customer_orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;
    private String customerName;
    private Long cafeId;
    private String cafeName;

    private Double totalAmount;
    private String orderType; // "Dine-In", "Takeaway", "Home Delivery"
    private String status;    // "Pending", "Success", "Cancelled"

    private String tableNumber; // Only for Dine-In
    private LocalDateTime orderDate;

    @ElementCollection
    private List<String> items; // Simple list of item names ordered
}