package com.coffeecafe.coffee.controller;

import com.coffeecafe.coffee.entity.MenuItem;
import com.coffeecafe.coffee.repository.MenuItemRepository;
import com.coffeecafe.coffee.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @Autowired
    private MenuItemRepository menuItemRepository;

    // Matches the updated frontend: /api/menu/add/{cafeId}
    @PostMapping("/add/{cafeId}")
    public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem item, @PathVariable Long cafeId) {
        MenuItem savedItem = menuItemService.saveMenuItem(item, cafeId);
        return ResponseEntity.ok(savedItem);
    }

    @GetMapping("/cafe/{cafeId}")
    public ResponseEntity<List<MenuItem>> getMenuByCafe(@PathVariable Long cafeId) {
        // This uses your MenuItemRepository's findByCafeId method
        return ResponseEntity.ok(menuItemRepository.findByCafeId(cafeId));
    }

    // Matches the updated frontend: /api/menu/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuItemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
