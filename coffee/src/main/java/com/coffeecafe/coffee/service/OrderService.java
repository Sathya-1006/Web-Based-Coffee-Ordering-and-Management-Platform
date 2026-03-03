package com.coffeecafe.coffee.service;

import com.coffeecafe.coffee.entity.Order;
import com.coffeecafe.coffee.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public Page<Order> getHistory(Long customerId, int page, int size) {
        return orderRepository.findByCustomerIdOrderByOrderDateDesc(customerId, PageRequest.of(page, size));
    }
}