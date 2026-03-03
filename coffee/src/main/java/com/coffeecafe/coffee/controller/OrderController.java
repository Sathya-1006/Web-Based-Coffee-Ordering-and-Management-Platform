package com.coffeecafe.coffee.controller;

import com.coffeecafe.coffee.entity.Order;
import com.coffeecafe.coffee.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    public Order placeOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    @GetMapping("/customer/{customerId}")
    public Page<Order> getOrderHistory(
            @PathVariable Long customerId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return orderService.getHistory(customerId, page, size);
    }
}