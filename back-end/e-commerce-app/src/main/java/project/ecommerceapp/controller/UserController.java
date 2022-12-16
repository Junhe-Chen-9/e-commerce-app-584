package project.ecommerceapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.ecommerceapp.dao.AppUserRepository;
import project.ecommerceapp.dto.RegistrationRequest;
import project.ecommerceapp.service.RegistrationService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("584final/api/v1/user")
public class UserController {

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    RegistrationService registrationService;

    @PostMapping("/register")
    public String register(@RequestBody RegistrationRequest request){
        return registrationService.register(request);
    }
    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token){
        return registrationService.confirmToken(token);
    }
}
