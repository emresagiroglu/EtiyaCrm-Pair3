package com.etiya.customerservice.dto.address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetAddressResponseDto {
    private Long id;
    private Long customerId;
    private Long neighbourhoodId;
    private String addressName;
    private String street;
    private String houseNumber;
    private String neighbourhoodName;
    private String districtName;
    private String cityName;
}
