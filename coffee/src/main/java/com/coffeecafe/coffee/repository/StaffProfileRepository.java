package com.coffeecafe.coffee.repository;

import com.coffeecafe.coffee.entity.StaffProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffProfileRepository extends JpaRepository<StaffProfile, Long> {

    List<StaffProfile> findByCafeId(Long cafeId);
}