package project.ecommerceapp.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.net.ApiResource;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;
import project.ecommerceapp.dto.MyProduct;
import project.ecommerceapp.dto.PaymentIntenRequest;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/584final/api/v1/stripe")
public class APIController {

    @Value("${STRIPE_PUBLIC_KEY}")
    private String stripePublicKey;

    @Value("${STRIPE_SECRET_KEY}")
    private String secretKey;




    @GetMapping("/hello")
    public String hello(){
        return "helloworld" + stripePublicKey;
    }

    @PostMapping("/checkout")
    public String checkout(@RequestBody List<Product> products){

        return "not in used";

    }


    @GetMapping("/getAllItemStripe")
    public ProductCollection getAllItemStripe() throws StripeException {
        Stripe.apiKey = secretKey;
        Map<String, Object> params = new HashMap<>();
        params.put("limit", 3);
        ProductCollection products = Product.list(params);
        return ApiResource.GSON.fromJson(products.getLastResponse().body(), ProductCollection.class);
    }

    @GetMapping("/getAllItem")
    public List<MyProduct> getAllItem() throws StripeException {
        Stripe.apiKey = secretKey;
        Map<String, Object> params = new HashMap<>();
        params.put("limit", 100);
        ProductCollection productCollection = Product.list(params);

        List<MyProduct> products = new ArrayList<>();
        for(Product product : productCollection.getData()){
            MyProduct myProduct = new MyProduct();
            myProduct.setProductName(product.getName());
            myProduct.setId(product.getId());
            myProduct.setDescription(product.getDescription());
            myProduct.setImage_url(product.getImages().toArray(new String[0]));
            Price price = Price.retrieve(product.getDefaultPrice());
            myProduct.setPrice(price.getUnitAmount());
            myProduct.setCategory(product.getMetadata().get("category"));
            products.add(myProduct);
        }
        return products;
    }

    @PostMapping("/get")
    public MyProduct getId(@RequestBody String id) throws StripeException {
        Stripe.apiKey = secretKey;
        Product product = Product.retrieve(id);
        MyProduct myProduct = new MyProduct();
        myProduct.setProductName(product.getName());
        myProduct.setId(product.getId());
        myProduct.setDescription(product.getDescription());
        myProduct.setImage_url(product.getImages().toArray(new String[0]));
        Price price = Price.retrieve(product.getDefaultPrice());
        myProduct.setPrice(price.getUnitAmount());
        myProduct.setCategory(product.getMetadata().get("category"));
        return myProduct;
    }

    @PostMapping("/price")
    public Price getPrice(@RequestBody String id) throws StripeException {
        Stripe.apiKey = secretKey;
        Price price = Price.retrieve(id);
        return ApiResource.GSON.fromJson(price.getLastResponse().body(), Price.class);
    }

    @PostMapping("/paymentIntend")
    public PaymentIntent createPaymentIntend(@RequestBody PaymentIntenRequest paymentIntenRequest) throws StripeException{
        Stripe.apiKey = secretKey;
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(paymentIntenRequest.getAmount())
                        .setCurrency(paymentIntenRequest.getCurrency())
                        .addPaymentMethodType(paymentIntenRequest.getMethod())
                        .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return ApiResource.GSON.fromJson(paymentIntent.getLastResponse().body(), PaymentIntent.class);
    }

    @ExceptionHandler(StripeException.class)
    public String handleError(Model model, StripeException ex) {
        model.addAttribute("error", ex.getMessage());
        return ex.toString();
    }

}
