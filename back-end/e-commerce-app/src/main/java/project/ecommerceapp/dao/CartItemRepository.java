package project.ecommerceapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import project.ecommerceapp.entity.CartItem;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findCartItemByProductId(String id);
}