package project.ecommerceapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.ecommerceapp.dto.RegistrationRequest;
import project.ecommerceapp.entity.AppUser;
import project.ecommerceapp.entity.AppUserRole;
import project.ecommerceapp.entity.ConfirmationToken;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationServiceImpl implements RegistrationService{

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailServiceImpl emailService;
    @Override
    public String register(RegistrationRequest request) {
        boolean validEmail = emailValidator.test(request.getEmail());
        if(!validEmail){
            throw new IllegalStateException("email not valid");
        }
        AppUser appUser = new AppUser();
        appUser.setEmail(request.getEmail());
        appUser.setFirstName(request.getFirstName());
        appUser.setLastName(request.getLastName());
        appUser.setUsername(request.getEmail());
        appUser.setPassword(request.getPassword());
        appUser.setAppUserRole(AppUserRole.USER);
        appUser.setDisplayName(request.getDisplayName());

        String token = appUserService.signUpUser(appUser);
        String link = "https://themillenniumfalcon.junhechen.com/584final/api/v1/user/confirm?token=" + token;
        String email = buildEmail(request.getDisplayName(),link);
        emailService.send(request.getEmail(),email);
        return token;
    }
    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService.getToken(token).orElseThrow(() ->
                new IllegalStateException("token not found"));
        if(confirmationToken.getConfirmedAt() != null){
            throw new IllegalStateException("email is already confirmed");
        }
        LocalDateTime expiresAt = confirmationToken.getExpiresAt();

        if (expiresAt.isBefore(LocalDateTime.now())){
            throw new IllegalStateException("token expired");
        }
        confirmationTokenService.setConfirmedAt(token);
        appUserService.enableAppUser(
                confirmationToken.getAppUser1().getUsername()
        );
        return "confirmed";
    }

    private String buildEmail(String name, String link){
        return
                "<p>Hi " + name + "</p>\n" +
                        "<p>link: " + link +"</p>\n";
    }
}
