package project.ecommerceapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import project.ecommerceapp.entity.ConfirmationToken;

import java.util.Optional;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {
    Optional<ConfirmationToken> findByToken(String token);
}