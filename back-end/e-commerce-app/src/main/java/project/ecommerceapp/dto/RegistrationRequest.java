package project.ecommerceapp.dto;

import lombok.*;
import java.util.Date;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Setter
public class RegistrationRequest {
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String password;
    private final String displayName;
}
