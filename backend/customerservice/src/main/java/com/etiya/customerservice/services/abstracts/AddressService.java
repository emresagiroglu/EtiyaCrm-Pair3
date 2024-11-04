package com.etiya.customerservice.services.abstracts;

import com.etiya.customerservice.dto.address.*;

import java.util.List;


public interface AddressService {
    List<ListAddressResponseDto> getAll();
    GetAddressResponseDto getById(Long id);
    CreateAddressResponseDto save(CreateAddressRequestDto addressDto);
    UpdateAddressResponseDto update(UpdateAddressRequestDto addressDto, Long id);
    List<ListAddressResponseDto> getAllByCustomerId(Long customerId);
    void delete(Long id);


}
