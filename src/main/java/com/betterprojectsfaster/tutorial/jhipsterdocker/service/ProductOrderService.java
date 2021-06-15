package com.betterprojectsfaster.tutorial.jhipsterdocker.service;

import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ProductOrderDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ProductOrder}.
 */
public interface ProductOrderService {
    /**
     * Save a productOrder.
     *
     * @param productOrderDTO the entity to save.
     * @return the persisted entity.
     */
    ProductOrderDTO save(ProductOrderDTO productOrderDTO);

    /**
     * Partially updates a productOrder.
     *
     * @param productOrderDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProductOrderDTO> partialUpdate(ProductOrderDTO productOrderDTO);

    /**
     * Get all the productOrders.
     *
     * @return the list of entities.
     */
    List<ProductOrderDTO> findAll();

    /**
     * Get the "id" productOrder.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductOrderDTO> findOne(Long id);

    /**
     * Delete the "id" productOrder.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
