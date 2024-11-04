package org.example.identityservice.service.auth;

import org.example.identityservice.dto.*;

public interface AuthService {
    TokenResponse login(LoginRequestDto loginRequest);

    RegisterResponseDto register(RegisterRequestDto registerRequest);

    GetUserByEmailResponse getUserByEmail(GetUserByEmailRequest request);
}
