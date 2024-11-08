package com.etiya.customerservice.services.concretes;

import com.etiya.customerservice.dto.address.*;
import com.etiya.customerservice.entity.Address;
import com.etiya.customerservice.entity.Customer;
import com.etiya.customerservice.mapper.AddressMapper;
import com.etiya.customerservice.repositories.AddressRepository;
import com.etiya.customerservice.repositories.CustomerRepository;
import com.etiya.customerservice.services.abstracts.AddressService;
import io.github.emresagiroglu.exception.type.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
private final AddressRepository addressRepository;
private final CustomerRepository customerRepository;

    public List<ListAddressResponseDto> getAll() {
        List<Address> addressList = addressRepository.findAllByIsActiveTrue().
                orElseThrow(() -> new BusinessException("There is no active Address."));;
        return AddressMapper.INSTANCE.listAddressResponseDtoFromAddressList(addressList);
    }
    public List<ListAddressResponseDto> getAllByCustomerId(Long customerId){
        Customer customer = customerRepository.findById(customerId).orElseThrow();
        List<Address> addressList = addressRepository.findAllByCustomerIdAndIsActiveTrue(customer)
                .orElseThrow(() -> new BusinessException("There is no active Address."));
        return AddressMapper.INSTANCE.listAddressResponseDtoFromAddressList(addressList);
    }
    public GetAddressResponseDto getById(Long id) {
        Address address = addressRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new BusinessException("There is no active Address with this id: " + id));
        return AddressMapper.INSTANCE.getAddressResponseDtoFromAddress(address);
    }
    public CreateAddressResponseDto save(CreateAddressRequestDto addressDto) {
        Address address = AddressMapper.INSTANCE.createAddressFromCreateAddressRequestDto(addressDto);
        addressRepository.save(address);
        return AddressMapper.INSTANCE.createAddressResponseDtoFromAddress(address);
    }
    public UpdateAddressResponseDto update(UpdateAddressRequestDto addressDto, Long id) {
        Address address = AddressMapper.INSTANCE.addressFromUpdateAddressRequestDto(addressDto);
        address.setId(id);
        addressRepository.save(address);
        return AddressMapper.INSTANCE.updateAddressResponseDtoFromAddress(address);
    }
    public void delete(Long id) {

        Address address = addressRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new BusinessException("There is no active Address with this id: " + id));
        address.setIsActive(false);
        addressRepository.save(address);

    }
}
