package com.betterprojectsfaster.tutorial.jhipsterdocker.web.rest;

import com.betterprojectsfaster.tutorial.jhipsterdocker.service.ShipmentService;
import com.betterprojectsfaster.tutorial.jhipsterdocker.web.rest.errors.BadRequestAlertException;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ShipmentDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.Shipment}.
 */
@RestController
@RequestMapping("/api")
public class ShipmentResource {

    private final Logger log = LoggerFactory.getLogger(ShipmentResource.class);

    private static final String ENTITY_NAME = "shipment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ShipmentService shipmentService;

    public ShipmentResource(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    /**
     * {@code POST  /shipments} : Create a new shipment.
     *
     * @param shipmentDTO the shipmentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new shipmentDTO, or with status {@code 400 (Bad Request)} if the shipment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/shipments")
    public ResponseEntity<ShipmentDTO> createShipment(@Valid @RequestBody ShipmentDTO shipmentDTO) throws URISyntaxException {
        log.debug("REST request to save Shipment : {}", shipmentDTO);
        if (shipmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new shipment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShipmentDTO result = shipmentService.save(shipmentDTO);
        return ResponseEntity.created(new URI("/api/shipments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /shipments} : Updates an existing shipment.
     *
     * @param shipmentDTO the shipmentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shipmentDTO,
     * or with status {@code 400 (Bad Request)} if the shipmentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the shipmentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/shipments")
    public ResponseEntity<ShipmentDTO> updateShipment(@Valid @RequestBody ShipmentDTO shipmentDTO) throws URISyntaxException {
        log.debug("REST request to update Shipment : {}", shipmentDTO);
        if (shipmentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ShipmentDTO result = shipmentService.save(shipmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, shipmentDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /shipments} : get all the shipments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of shipments in body.
     */
    @GetMapping("/shipments")
    public List<ShipmentDTO> getAllShipments() {
        log.debug("REST request to get all Shipments");
        return shipmentService.findAll();
    }

    /**
     * {@code GET  /shipments/:id} : get the "id" shipment.
     *
     * @param id the id of the shipmentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the shipmentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/shipments/{id}")
    public ResponseEntity<ShipmentDTO> getShipment(@PathVariable Long id) {
        log.debug("REST request to get Shipment : {}", id);
        Optional<ShipmentDTO> shipmentDTO = shipmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(shipmentDTO);
    }

    /**
     * {@code DELETE  /shipments/:id} : delete the "id" shipment.
     *
     * @param id the id of the shipmentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/shipments/{id}")
    public ResponseEntity<Void> deleteShipment(@PathVariable Long id) {
        log.debug("REST request to delete Shipment : {}", id);
        shipmentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
