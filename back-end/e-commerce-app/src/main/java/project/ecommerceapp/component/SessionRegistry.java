package project.ecommerceapp.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Component
public class SessionRegistry {
    private static final HashMap<String,String> SESSIONS = new HashMap<>();
    private final ValueOperations<String,String> redisSessionStorage;


    @Autowired
    public SessionRegistry(final RedisTemplate<String, String> redisTemplate){
        redisSessionStorage = redisTemplate.opsForValue();
    }


    public String registerSession(final String username){
        if (username == null){
            throw new RuntimeException("Username need to be provided");
        }

        String sessionId = generateSessionId();

        try{
            redisSessionStorage.set(sessionId,username);
            redisSessionStorage.getAndExpire(sessionId,30, TimeUnit.MINUTES);

        }catch(final Exception e){
            // if redis not running we are using in memory session logging
            e.printStackTrace();
            SESSIONS.put(sessionId,username);
        }

        return sessionId;
    }

    public String getUsernameForSession(final String sessionId){
        try{
            return redisSessionStorage.get(sessionId);
        }catch(final Exception e){
            // if redis not running we are using in memory session logging
            e.printStackTrace();
            return SESSIONS.get(sessionId);
        }

    }

    public void expireSession(final String sessionId){
        try {
            redisSessionStorage.getAndDelete(sessionId);
        }catch (final Exception e){
            e.printStackTrace();
            SESSIONS.remove(sessionId);
        }
    }

    private String generateSessionId(){
        return new String(
                Base64.getEncoder().encode(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8))
        );
    }

}
