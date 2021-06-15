package com.betterprojectsfaster.tutorial.jhipsterdocker.repository;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ShoppingOrder;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ShoppingOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShoppingOrderRepository extends JpaRepository<ShoppingOrder, Long> {
    @Query("select shoppingOrder from ShoppingOrder shoppingOrder where shoppingOrder.buyer.login = ?#{principal.username}")
    List<ShoppingOrder> findByBuyerIsCurrentUser();
}
