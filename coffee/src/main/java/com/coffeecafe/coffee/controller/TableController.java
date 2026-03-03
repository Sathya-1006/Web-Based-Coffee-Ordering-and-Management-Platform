package com.coffeecafe.coffee.controller;

import com.coffeecafe.coffee.entity.TableEntity;
import com.coffeecafe.coffee.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@CrossOrigin(origins = "http://localhost:5173")
public class TableController {

    @Autowired
    private TableService tableService;

    // This matches the fetch URL in your React code
    @GetMapping("/cafe/{cafeId}")
    public ResponseEntity<List<TableEntity>> getTablesByCafe(@PathVariable Long cafeId) {
        List<TableEntity> tables = tableService.getTablesByCafeId(cafeId);
        return ResponseEntity.ok(tables);
    }
}