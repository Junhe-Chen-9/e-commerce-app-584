package project.ecommerceapp.entity;

import lombok.Getter;
import lombok.Setter;
import project.ecommerceapp.entity.AppUser;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;


    private String imageUrl;


    private BigDecimal unitPrice;


    //private int quantity;


    private String productId;

    @ManyToOne
    @JoinColumn(name = "appUser_id")
    private AppUser appUser;

}
