package project.ecommerceapp.service;

import project.ecommerceapp.dto.RegistrationRequest;

public interface RegistrationService {
    String register(RegistrationRequest request);

    String confirmToken(String token);
}
