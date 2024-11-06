package org.example.searchservice;

import io.github.emresagiroglu.kafka.events.customer.CustomerCreatedEvent;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.searchservice.entity.Customer;
import org.example.searchservice.service.FilterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;


import java.util.function.Consumer;

@Component
@AllArgsConstructor
public class CustomerConsumer {
    private FilterService filterService;
    private final Logger logger = LoggerFactory.getLogger(CustomerConsumer.class);

    @Bean
    public Consumer<CustomerCreatedEvent> processCustomerCreatedEvent(){

        return customerCreatedEvent ->
        {
            logger.info(String.valueOf(customerCreatedEvent));
            Customer customer = new Customer();
            customer.setNationalityId(customerCreatedEvent.getNationalityId());
            customer.setId(customerCreatedEvent.getId());
            customer.setFirstName(customerCreatedEvent.getFirstName());
            customer.setMiddleName(customerCreatedEvent.getMiddleName());
            customer.setLastName(customerCreatedEvent.getLastName());
            customer.setPhoneNumber(customerCreatedEvent.getMobilePhone());
            this.filterService.createCustomer(customer);
        };

    }
}
