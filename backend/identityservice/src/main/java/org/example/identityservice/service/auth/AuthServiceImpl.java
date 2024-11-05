package org.example.identityservice.service.auth;
import io.github.emresagiroglu.security.BaseJwtService;
import org.example.identityservice.dto.*;
import org.example.identityservice.entity.User;
import org.example.identityservice.mapper.UserMapper;
import org.example.identityservice.repository.UserRepository;
import org.example.identityservice.service.user.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserService userService;
    private final BaseJwtService baseJwtService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public TokenResponse login(LoginRequestDto loginRequest) {
        UserDetails user = userService.loadUserByUsername(loginRequest.getEmail());
        boolean passwordMatching = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
        if(!passwordMatching)
            throw new RuntimeException("E-posta veya şifre hatalı.");

        return new TokenResponse(baseJwtService.generateToken(user.getUsername()),true);
    }
    @Override
    public RegisterResponseDto register(RegisterRequestDto registerRequest) {

        registerRequest.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userService.create(registerRequest);
        RegisterResponseDto registerResponseDto = new RegisterResponseDto();
        registerResponseDto.setEmail(registerRequest.getEmail());
        return registerResponseDto;
    }

    @Override
    public GetUserByEmailResponse getUserByEmail(GetUserByEmailRequest request) {

        User user = userRepository.findByEmail(request.getEmail());

        if(user == null){
            throw new RuntimeException("No user with this credentials!");
        }

        GetUserByEmailResponse getUserByEmailResponse = UserMapper.INSTANCE.getUserByEmailResponseFromUser(user);

        return getUserByEmailResponse;
    }

}
