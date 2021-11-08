package com.betterprojectsfaster.tutorial.jhipsterdocker.web.rest;

import com.betterprojectsfaster.tutorial.jhipsterdocker.repository.ProductOrderRepository;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.ProductOrderService;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ProductOrderDTO;
import com.betterprojectsfaster.tutorial.jhipsterdocker.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ProductOrder}.
 */
@RestController
@RequestMapping("/api")
public class ProductOrderResource {

    private final Logger log = LoggerFactory.getLogger(ProductOrderResource.class);

    private static final String ENTITY_NAME = "productOrder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductOrderService productOrderService;

    private final ProductOrderRepository productOrderRepository;

    public ProductOrderResource(ProductOrderService productOrderService, ProductOrderRepository productOrderRepository) {
        this.productOrderService = productOrderService;
        this.productOrderRepository = productOrderRepository;
    }

    /**
     * {@code POST  /product-orders} : Create a new productOrder.
     *
     * @param productOrderDTO the productOrderDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productOrderDTO, or with status {@code 400 (Bad Request)} if the productOrder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/product-orders")
    public ResponseEntity<ProductOrderDTO> createProductOrder(@Valid @RequestBody ProductOrderDTO productOrderDTO)
        throws URISyntaxException {
        log.debug("REST request to save ProductOrder : {}", productOrderDTO);
        if (productOrderDTO.getId() != null) {
            throw new BadRequestAlertException("A new productOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductOrderDTO result = productOrderService.save(productOrderDTO);
        return ResponseEntity
            .created(new URI("/api/product-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-orders/:id} : Updates an existing productOrder.
     *
     * @param id the id of the productOrderDTO to save.
     * @param productOrderDTO the productOrderDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productOrderDTO,
     * or with status {@code 400 (Bad Request)} if the productOrderDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productOrderDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/product-orders/{id}")
    public ResponseEntity<ProductOrderDTO> updateProductOrder(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ProductOrderDTO productOrderDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ProductOrder : {}, {}", id, productOrderDTO);
        if (productOrderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productOrderDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productOrderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProductOrderDTO result = productOrderService.save(productOrderDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productOrderDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /product-orders/:id} : Partial updates given fields of an existing productOrder, field will ignore if it is null
     *
     * @param id the id of the productOrderDTO to save.
     * @param productOrderDTO the productOrderDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productOrderDTO,
     * or with status {@code 400 (Bad Request)} if the productOrderDTO is not valid,
     * or with status {@code 404 (Not Found)} if the productOrderDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the productOrderDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/product-orders/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProductOrderDTO> partialUpdateProductOrder(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ProductOrderDTO productOrderDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProductOrder partially : {}, {}", id, productOrderDTO);
        if (productOrderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productOrderDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productOrderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProductOrderDTO> result = productOrderService.partialUpdate(productOrderDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productOrderDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /product-orders} : get all the productOrders.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productOrders in body.
     */
    @GetMapping("/product-orders")
    public List<ProductOrderDTO> getAllProductOrders() {
        log.debug("REST request to get all ProductOrders");
        return productOrderService.findAll();
    }

    /**
     * {@code GET  /product-orders/:id} : get the "id" productOrder.
     *
     * @param id the id of the productOrderDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productOrderDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/product-orders/{id}")
    public ResponseEntity<ProductOrderDTO> getProductOrder(@PathVariable Long id) {
        log.debug("REST request to get ProductOrder : {}", id);
        Optional<ProductOrderDTO> productOrderDTO = productOrderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productOrderDTO);
    }

    /**
     * {@code DELETE  /product-orders/:id} : delete the "id" productOrder.
     *
     * @param id the id of the productOrderDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/product-orders/{id}")
    public ResponseEntity<Void> deleteProductOrder(@PathVariable Long id) {
        log.debug("REST request to delete ProductOrder : {}", id);
        productOrderService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
