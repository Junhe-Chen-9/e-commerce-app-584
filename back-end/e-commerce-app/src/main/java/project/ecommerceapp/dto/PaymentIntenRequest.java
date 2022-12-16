package project.ecommerceapp.dto;


import lombok.Data;

@Data
public class PaymentIntenRequest {
    long amount;
    String currency;
    String method;
}
