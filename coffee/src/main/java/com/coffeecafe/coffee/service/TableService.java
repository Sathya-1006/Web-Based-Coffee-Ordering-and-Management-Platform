package com.coffeecafe.coffee.service;

import com.coffeecafe.coffee.entity.TableEntity;
import com.coffeecafe.coffee.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TableService {

    @Autowired
    private TableRepository tableRepository;

    public List<TableEntity> getTablesByCafeId(Long cafeId) {
        // Uses your existing repository method
        return tableRepository.findByCafeId(cafeId);
    }
}