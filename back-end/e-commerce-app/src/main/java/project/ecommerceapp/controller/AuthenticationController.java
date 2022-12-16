package project.ecommerceapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.ecommerceapp.component.SessionRegistry;
import project.ecommerceapp.dao.AppUserRepository;
import project.ecommerceapp.dto.AuthenticationResponse;
import project.ecommerceapp.dto.UsernameAndPasswordAuthenticationRequest;
import project.ecommerceapp.entity.AppUser;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/584final/api/")
public class AuthenticationController {


    @Autowired
    public AuthenticationManager authenticationManager;

    @Autowired
    public SessionRegistry sessionRegistry;

    @Autowired
    public AppUserRepository appUserRepository;

    @PostMapping("/v1/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody String request) {

        // returns a basic user info to the front end
        String[] usernamePassword = new String(Base64.getDecoder().decode(request.getBytes(StandardCharsets.UTF_8))).split(":");
        UsernameAndPasswordAuthenticationRequest user = new UsernameAndPasswordAuthenticationRequest(usernamePassword[0],usernamePassword[1]);
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword());
        Authentication authentication = authenticationManager.authenticate(token);
        final String sessionId = sessionRegistry.registerSession(user.getUsername());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setSessionId(sessionId);

        AppUser appUser = (AppUser) authentication.getPrincipal();
        authenticationResponse.setDisplayName(appUser.getDisplayName());
        authenticationResponse.setUserName(appUser.getUsername());
        return ResponseEntity.ok(authenticationResponse);
    }

    @PostMapping("/v1/logout")
    public String logout(@RequestHeader("Authorization") String sessionId) {
        sessionRegistry.expireSession(sessionId);
        return "sucess!";
    }


    /* we are not using jwttoken
    private String buildJwtToken(Authentication authResult){
        // create a jwt token and send to our client
        String token = Jwts.builder()
                .setSubject(authResult.getName())
                .claim("authorities", authResult.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(2)))
                .signWith(Keys.hmacShaKeyFor("securesecuresecuresecuresecuresecuresecuresecuresecuresecure".getBytes(StandardCharsets.UTF_8))).compact();
        String res = ("Authorization: " + "Bearer " + token);
        return res;
    }

    */

    @PostMapping("/v2/loadUser")
    private String loadUser(@RequestHeader("Authorization") String sessionId){
        String username = sessionRegistry.getUsernameForSession(sessionId);
        AppUser appUser = appUserRepository.findAppUserByUsername(username);
        return appUser.getUsername();
    }


}

