package org.example.identityservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserByEmailResponse {
    private String firstName;
    private String lastName;
    private String[] roles;
}
