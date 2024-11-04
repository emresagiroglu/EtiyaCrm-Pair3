package com.etiya.customerservice.rule;

import com.etiya.customerservice.entity.IndividualCustomer;
import com.etiya.customerservice.repositories.CorporateCustomerRepository;
import com.etiya.customerservice.repositories.IndividualCustomerRepository;
import io.github.emresagiroglu.exception.type.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


import java.util.Optional;

@RequiredArgsConstructor
@Component
public class CustomerBusinessRules {

    private final IndividualCustomerRepository individualCustomerRepository;
    private final CorporateCustomerRepository corporateCustomerRepository;

    public void customerWithSameNationalityId(String nationalityId)
    {
        Optional<IndividualCustomer> individualCustomer = individualCustomerRepository.findByNationalityId(nationalityId);

        if(individualCustomer.isPresent()){
            throw new BusinessException("There is a customer with same Nationality ID.");

        }
    }
}
