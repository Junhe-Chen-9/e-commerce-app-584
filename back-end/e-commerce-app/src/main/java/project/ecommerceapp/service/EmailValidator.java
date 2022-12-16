package project.ecommerceapp.service;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;
import java.util.regex.Pattern;

@Service
public class EmailValidator implements Predicate<String> {


    @Override
    public boolean test(String s) {
        // TODO: Regex to validate email or we can do it on the front
        return Pattern.compile("^(.+)@(\\S+)$")
                .matcher(s)
                .matches();
    }
}