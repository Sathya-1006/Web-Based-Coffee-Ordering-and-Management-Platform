package com.coffeecafe.coffee.controller;

import com.coffeecafe.coffee.entity.Cafe;
import com.coffeecafe.coffee.entity.MenuItem;
import com.coffeecafe.coffee.entity.TableEntity;
import com.coffeecafe.coffee.repository.CafeRepository;
import com.coffeecafe.coffee.repository.MenuItemRepository;
import com.coffeecafe.coffee.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cafes")
@CrossOrigin(origins = "http://localhost:5173")
public class CafeController {

    @Autowired
    private CafeRepository cafeRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerCafe(@RequestBody Cafe cafe) {
        try {
            Cafe savedCafe = cafeRepository.save(cafe);
            return ResponseEntity.ok(savedCafe);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // GET all cafes
    @GetMapping("/all")
    public List<Cafe> getAllCafes() {
        return cafeRepository.findAll();
    }

    // UPDATE cafe
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCafe(@PathVariable Long id, @RequestBody Cafe cafeDetails) {
        return cafeRepository.findById(id).map(cafe -> {
            cafe.setCafeName(cafeDetails.getCafeName());
            cafe.setOwnerName(cafeDetails.getOwnerName());
            // ... set other fields similarly
            return ResponseEntity.ok(cafeRepository.save(cafe));
        }).orElse(ResponseEntity.notFound().build());
    }



    @Autowired
    private MenuItemRepository menuItemRepository;

    @PostMapping("/menu/add")
    public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem item) {
        return ResponseEntity.ok(menuItemRepository.save(item));
    }

    @GetMapping("/menu/all")
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    @GetMapping("/menu/{cafeId}")
    public List<MenuItem> getMenuByCafe(@PathVariable Long cafeId) {
        return menuItemRepository.findByCafeId(cafeId);
    }

    @GetMapping("/tables/{cafeId}")
    public List<TableEntity> getTablesByCafe(@PathVariable Long cafeId) {
        return tableRepository.findByCafeId(cafeId);
    }

    @Autowired
    private TableRepository tableRepository;

    @PostMapping("/tables/add")
    public ResponseEntity<TableEntity> addTable(@RequestBody TableEntity table) {
        return ResponseEntity.ok(tableRepository.save(table));
    }

    @GetMapping("/tables/all")
    public List<TableEntity> getAllTables() {
        return tableRepository.findAll();
    }




    // Keep this for tables
    @DeleteMapping("/tables/delete/{id}")
    public ResponseEntity<?> deleteTable(@PathVariable Long id) {
        tableRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Keep ONLY ONE of these for cafes
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCafe(@PathVariable Long id) {
        try {
            cafeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting cafe");
        }
    }


}