package org.example.searchservice.service;

import org.example.searchservice.dto.SearchResponse;
import org.example.searchservice.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FilterService {
    void createCustomer(Customer customer);
    void updateCustomer(Customer customer);
    void deleteCustomer(Customer customer);

    Customer getById(String id);
    List<SearchResponse> getAll();
    Page<SearchResponse> search(String nationalityId, String id, String mobilePhone,
                                String accountNumber, String firstName, String middleName,
                                String lastName, String sortField, String sortOrder, Pageable pageable);
}