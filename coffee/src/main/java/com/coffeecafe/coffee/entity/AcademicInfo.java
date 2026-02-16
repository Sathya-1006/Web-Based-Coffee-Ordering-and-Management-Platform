package com.coffeecafe.coffee.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Embeddable
public class AcademicInfo {
    private String institution;
    private String degree;
    private String yearOfPassing;
}