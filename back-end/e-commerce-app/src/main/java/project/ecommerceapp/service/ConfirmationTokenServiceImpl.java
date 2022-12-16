package project.ecommerceapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.ecommerceapp.dao.ConfirmationTokenRepository;
import project.ecommerceapp.entity.ConfirmationToken;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService{
    private final ConfirmationTokenRepository confirmationTokenRepository;

    @Override
    public void saveConfirmationToken(ConfirmationToken confirmationToken){
        confirmationTokenRepository.save(confirmationToken);
    }

    @Override
    public Optional<ConfirmationToken> getToken(String token) {
        return this.confirmationTokenRepository.findByToken(token);
    }

    @Override
    public void setConfirmedAt(String token){
        confirmationTokenRepository.findByToken(token).get().setConfirmedAt(LocalDateTime.now());
    }
}