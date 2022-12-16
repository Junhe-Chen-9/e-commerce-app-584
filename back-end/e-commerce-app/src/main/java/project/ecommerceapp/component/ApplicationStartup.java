
package project.ecommerceapp.component;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Product;
import com.stripe.model.ProductCollection;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import project.ecommerceapp.dao.DatabaseProductRepository;
import project.ecommerceapp.entity.DatabaseProduct;


import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;


@Component
public class ApplicationStartup {

    @Value("${STRIPE_SECRET_KEY}")
    private String secretKey;

    @Autowired
    private DatabaseProductRepository productRepository;

    @PostConstruct
    public void initialize() throws StripeException {
        // populate database
        Stripe.apiKey = secretKey;
        Map<String, Object> params = new HashMap<>();
        params.put("limit", 100);
        ProductCollection productCollection = Product.list(params);
        for(Product product : productCollection.getData()){
            DatabaseProduct databaseProduct = new DatabaseProduct();
            databaseProduct.setProductId(product.getId());
            productRepository.save(databaseProduct);
        }
    }


} // class


