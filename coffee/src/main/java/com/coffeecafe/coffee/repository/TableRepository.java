package com.coffeecafe.coffee.repository;

import com.coffeecafe.coffee.entity.TableEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TableRepository extends JpaRepository<TableEntity, Long> {
    List<TableEntity> findByCafeId(Long cafeId);

}