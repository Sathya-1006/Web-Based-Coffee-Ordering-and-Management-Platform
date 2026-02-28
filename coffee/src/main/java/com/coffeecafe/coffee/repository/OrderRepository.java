package com.coffeecafe.coffee.repository;

import com.coffeecafe.coffee.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Long customerId); // For Order History
    List<Order> findByCafeId(Long cafeId);         // For Cafe Owner Dashboard
}