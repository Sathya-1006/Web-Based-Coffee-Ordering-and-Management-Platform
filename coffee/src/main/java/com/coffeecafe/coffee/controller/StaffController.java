package com.coffeecafe.coffee.controller;

import com.coffeecafe.coffee.dto.StaffRegisterRequest;
import com.coffeecafe.coffee.entity.StaffProfile;
import com.coffeecafe.coffee.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:5173")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerStaff(@ModelAttribute StaffRegisterRequest request) {
        try {
            staffService.completeStaffRegistration(request);
            return ResponseEntity.ok("Staff registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/cafe/{cafeId}")
    public ResponseEntity<List<StaffProfile>> getStaffByCafe(@PathVariable Long cafeId) {
        return ResponseEntity.ok(staffService.getStaffByCafeId(cafeId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {
        try {
            staffService.deleteStaffById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}