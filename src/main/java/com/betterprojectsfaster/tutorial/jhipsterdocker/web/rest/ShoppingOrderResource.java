package com.betterprojectsfaster.tutorial.jhipsterdocker.web.rest;

import com.betterprojectsfaster.tutorial.jhipsterdocker.service.ShoppingOrderService;
import com.betterprojectsfaster.tutorial.jhipsterdocker.web.rest.errors.BadRequestAlertException;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ShoppingOrderDTO;

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
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ShoppingOrder}.
 */
@RestController
@RequestMapping("/api")
public class ShoppingOrderResource {

    private final Logger log = LoggerFactory.getLogger(ShoppingOrderResource.class);

    private static final String ENTITY_NAME = "shoppingOrder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ShoppingOrderService shoppingOrderService;

    public ShoppingOrderResource(ShoppingOrderService shoppingOrderService) {
        this.shoppingOrderService = shoppingOrderService;
    }

    /**
     * {@code POST  /shopping-orders} : Create a new shoppingOrder.
     *
     * @param shoppingOrderDTO the shoppingOrderDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new shoppingOrderDTO, or with status {@code 400 (Bad Request)} if the shoppingOrder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/shopping-orders")
    public ResponseEntity<ShoppingOrderDTO> createShoppingOrder(@Valid @RequestBody ShoppingOrderDTO shoppingOrderDTO) throws URISyntaxException {
        log.debug("REST request to save ShoppingOrder : {}", shoppingOrderDTO);
        if (shoppingOrderDTO.getId() != null) {
            throw new BadRequestAlertException("A new shoppingOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShoppingOrderDTO result = shoppingOrderService.save(shoppingOrderDTO);
        return ResponseEntity.created(new URI("/api/shopping-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /shopping-orders} : Updates an existing shoppingOrder.
     *
     * @param shoppingOrderDTO the shoppingOrderDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shoppingOrderDTO,
     * or with status {@code 400 (Bad Request)} if the shoppingOrderDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the shoppingOrderDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/shopping-orders")
    public ResponseEntity<ShoppingOrderDTO> updateShoppingOrder(@Valid @RequestBody ShoppingOrderDTO shoppingOrderDTO) throws URISyntaxException {
        log.debug("REST request to update ShoppingOrder : {}", shoppingOrderDTO);
        if (shoppingOrderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ShoppingOrderDTO result = shoppingOrderService.save(shoppingOrderDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, shoppingOrderDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /shopping-orders} : get all the shoppingOrders.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of shoppingOrders in body.
     */
    @GetMapping("/shopping-orders")
    public List<ShoppingOrderDTO> getAllShoppingOrders(@RequestParam(required = false) String filter) {
        if ("shipment-is-null".equals(filter)) {
            log.debug("REST request to get all ShoppingOrders where shipment is null");
            return shoppingOrderService.findAllWhereShipmentIsNull();
        }
        log.debug("REST request to get all ShoppingOrders");
        return shoppingOrderService.findAll();
    }

    /**
     * {@code GET  /shopping-orders/:id} : get the "id" shoppingOrder.
     *
     * @param id the id of the shoppingOrderDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the shoppingOrderDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/shopping-orders/{id}")
    public ResponseEntity<ShoppingOrderDTO> getShoppingOrder(@PathVariable Long id) {
        log.debug("REST request to get ShoppingOrder : {}", id);
        Optional<ShoppingOrderDTO> shoppingOrderDTO = shoppingOrderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(shoppingOrderDTO);
    }

    /**
     * {@code DELETE  /shopping-orders/:id} : delete the "id" shoppingOrder.
     *
     * @param id the id of the shoppingOrderDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/shopping-orders/{id}")
    public ResponseEntity<Void> deleteShoppingOrder(@PathVariable Long id) {
        log.debug("REST request to delete ShoppingOrder : {}", id);
        shoppingOrderService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
