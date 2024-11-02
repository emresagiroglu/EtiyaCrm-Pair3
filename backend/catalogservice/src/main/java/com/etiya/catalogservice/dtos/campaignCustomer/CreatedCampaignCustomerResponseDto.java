package com.etiya.catalogservice.dtos.campaignCustomer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatedCampaignCustomerResponseDto {

    private UUID id;
    private UUID campaignId;

    private Long customerId;

    private Long addressId;
}