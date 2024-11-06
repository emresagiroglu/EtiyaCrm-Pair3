package org.example.searchservice.repository;

import org.example.searchservice.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FilterRepositoryCustom {
    Page<Customer> searchResult(String nationalityId, String id, String mobilePhone,
                                String accountNumber, String firstName, String middleName,
                                String lastName, String sortField, String sortOrder, Pageable pageable);
}