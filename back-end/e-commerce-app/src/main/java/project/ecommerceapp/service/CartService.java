package project.ecommerceapp.service;

public interface CartService {
    public String addProduct(String oktaId, String stripeId);
    public String remove(String oktaId, String stripeId);
    public String clear(String oktaId, String stripeId);
}
