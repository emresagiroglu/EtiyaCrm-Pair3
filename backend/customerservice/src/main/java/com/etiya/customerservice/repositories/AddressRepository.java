package com.etiya.customerservice.repositories;

import com.etiya.customerservice.entity.Address;
import com.etiya.customerservice.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findByIdAndIsActiveTrue(Long id);
    Optional<List<Address>> findAllByIsActiveTrue();
    Optional<List<Address>> findAllByCustomerIdAndIsActiveTrue(Customer customer);
}
