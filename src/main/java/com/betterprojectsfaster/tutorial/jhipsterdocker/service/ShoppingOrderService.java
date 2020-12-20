package com.betterprojectsfaster.tutorial.jhipsterdocker.service;

import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ShoppingOrderDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ShoppingOrder}.
 */
public interface ShoppingOrderService {

    /**
     * Save a shoppingOrder.
     *
     * @param shoppingOrderDTO the entity to save.
     * @return the persisted entity.
     */
    ShoppingOrderDTO save(ShoppingOrderDTO shoppingOrderDTO);

    /**
     * Get all the shoppingOrders.
     *
     * @return the list of entities.
     */
    List<ShoppingOrderDTO> findAll();
    /**
     * Get all the ShoppingOrderDTO where Shipment is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<ShoppingOrderDTO> findAllWhereShipmentIsNull();


    /**
     * Get the "id" shoppingOrder.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ShoppingOrderDTO> findOne(Long id);

    /**
     * Delete the "id" shoppingOrder.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
