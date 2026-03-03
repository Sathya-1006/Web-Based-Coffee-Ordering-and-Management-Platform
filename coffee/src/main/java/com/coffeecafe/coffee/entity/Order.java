package com.coffeecafe.coffee.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.time.LocalDateTime;

@Entity
@Table(name = "customer_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;
    private String customerName;
    private String cafeName;
    private Double totalAmount;
    private String orderType;
    private String tableNumber;
    private String paymentMethod;
    private LocalDateTime orderDate;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "order_items", joinColumns = @JoinColumn(name = "order_id"))
    @Column(name = "items")
    private List<String> items;

    @PrePersist
    protected void onCreate() {
        this.orderDate = LocalDateTime.now();
    }
}