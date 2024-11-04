package org.example.identityservice.mapper;

import org.example.identityservice.dto.GetUserByEmailResponse;
import org.example.identityservice.dto.RegisterRequestDto;
import org.example.identityservice.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Optional;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User userFromUserAddRequestDto(RegisterRequestDto registerRequestDto);

    GetUserByEmailResponse getUserByEmailResponseFromUser(User user);


}
