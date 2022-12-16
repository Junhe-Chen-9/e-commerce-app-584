package project.ecommerceapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AuthenticationResponse {
    private String sessionId;
    private String displayName;
    private String userName;
}

