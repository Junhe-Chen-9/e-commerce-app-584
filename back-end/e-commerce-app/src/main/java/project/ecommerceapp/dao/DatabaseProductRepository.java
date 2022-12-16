package project.ecommerceapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import project.ecommerceapp.entity.DatabaseProduct;

public interface DatabaseProductRepository extends JpaRepository<DatabaseProduct, Long> {
    DatabaseProduct findByProductId(String id);
}