package com.etiya.customerservice.mapper;

import com.etiya.customerservice.dto.individualcustomer.GetIndividualCustomerResponseDto;
import com.etiya.customerservice.entity.ContactInformation;
import com.etiya.customerservice.entity.IndividualCustomer;
import io.github.emresagiroglu.kafka.events.contactinformation.ContactInformationUpdatedEvent;
import io.github.emresagiroglu.kafka.events.customer.CustomerCreatedEvent;
import io.github.emresagiroglu.kafka.events.customer.CustomerUpdatedEvent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface KafkaMapper {

    KafkaMapper INSTANCE = Mappers.getMapper(KafkaMapper.class);

    CustomerCreatedEvent createCustomerCreatedEventFromGetIndividualCustomerResponseDto(GetIndividualCustomerResponseDto individualCustomer);
    @Mapping(target = "id", ignore = true)
    void updateCustomerCreatedEventFromContactInformation(@MappingTarget CustomerCreatedEvent customerCreatedEvent, ContactInformation contactInformation);

    ContactInformationUpdatedEvent createContactInformationUpdatedEventFromContactInformation(ContactInformation contactInformation);

    CustomerUpdatedEvent updateCustomerUpdatedEventFromIndividualCustomer(IndividualCustomer individualCustomer);
}
