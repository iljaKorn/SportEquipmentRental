package ru.vsu.cs.sportbox.Data.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonLoginDto {
    private String password;
    private String email;
}