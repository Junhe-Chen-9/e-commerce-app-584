package project.ecommerceapp.dto;

import lombok.Data;

@Data
public class MyProduct {
    String productName;
    long price;
    String id;
    String[] image_url;
    String description;
    String category;




}
