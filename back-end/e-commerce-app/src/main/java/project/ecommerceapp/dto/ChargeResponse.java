package project.ecommerceapp.dto;

import lombok.Data;

@Data
public class ChargeResponse {

    private String id;
    private String status;
    private String chargeId;
    private String balance_transaction;

}
