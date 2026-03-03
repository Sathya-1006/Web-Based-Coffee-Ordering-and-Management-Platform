package com.coffeecafe.coffee.service;

import com.coffeecafe.coffee.entity.MenuItem;
import com.coffeecafe.coffee.entity.Cafe;
import com.coffeecafe.coffee.repository.MenuItemRepository;
import com.coffeecafe.coffee.repository.CafeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private CafeRepository cafeRepository;

    public MenuItem saveMenuItem(MenuItem item, Long cafeId) {

        Cafe cafe = cafeRepository.findById(cafeId)
                .orElseThrow(() -> new RuntimeException("Cafe not found"));

        item.setCafe(cafe);
        return menuItemRepository.save(item);
    }
}