package com.etiya.customerservice.dto.neighbourhood;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateNeighbourhoodResponseDto {
    private Long id;
    private String name;
    private Long districtId;
}