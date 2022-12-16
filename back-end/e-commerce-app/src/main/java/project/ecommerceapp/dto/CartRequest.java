package project.ecommerceapp.dto;

import lombok.Data;

@Data
public class CartRequest {
    private String username;
    private String stripeId;
}
