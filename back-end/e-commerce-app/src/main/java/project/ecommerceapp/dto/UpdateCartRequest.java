package project.ecommerceapp.dto;

import lombok.Data;

@Data
public class UpdateCartRequest {
    String userName;
    String[] stripeIds;
}
