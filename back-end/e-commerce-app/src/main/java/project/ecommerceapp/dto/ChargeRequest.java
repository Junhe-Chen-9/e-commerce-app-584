package project.ecommerceapp.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ChargeRequest {
    public enum Currency{
        EUR,USD;
    }
    private String description;
    private Integer amount;
    private Currency currency;
    private String stripeEmail;
    private String stripeToken;

    public ChargeRequest(String description, Integer amount, String stripeEmail, String stripeToken) {
        this.description = description;
        this.amount = amount;
        this.stripeEmail = stripeEmail;
        this.stripeToken = stripeToken;
    }
}
