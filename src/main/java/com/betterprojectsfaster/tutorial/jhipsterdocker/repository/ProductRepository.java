package com.betterprojectsfaster.tutorial.jhipsterdocker.repository;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.Product;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {}
