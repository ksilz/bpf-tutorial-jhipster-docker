package com.betterprojectsfaster.tutorial.jhipsterdocker.service;

import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ShipmentDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.Shipment}.
 */
public interface ShipmentService {

    /**
     * Save a shipment.
     *
     * @param shipmentDTO the entity to save.
     * @return the persisted entity.
     */
    ShipmentDTO save(ShipmentDTO shipmentDTO);

    /**
     * Get all the shipments.
     *
     * @return the list of entities.
     */
    List<ShipmentDTO> findAll();


    /**
     * Get the "id" shipment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ShipmentDTO> findOne(Long id);

    /**
     * Delete the "id" shipment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
