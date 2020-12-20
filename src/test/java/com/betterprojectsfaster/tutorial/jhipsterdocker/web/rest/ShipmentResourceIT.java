package com.betterprojectsfaster.tutorial.jhipsterdocker.web.rest;

import com.betterprojectsfaster.tutorial.jhipsterdocker.MySimpleShopApp;
import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.Shipment;
import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ShoppingOrder;
import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.User;
import com.betterprojectsfaster.tutorial.jhipsterdocker.repository.ShipmentRepository;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.ShipmentService;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ShipmentDTO;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper.ShipmentMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ShipmentResource} REST controller.
 */
@SpringBootTest(classes = MySimpleShopApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ShipmentResourceIT {

    private static final LocalDate DEFAULT_SHIPPED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SHIPPED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private ShipmentMapper shipmentMapper;

    @Autowired
    private ShipmentService shipmentService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restShipmentMockMvc;

    private Shipment shipment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shipment createEntity(EntityManager em) {
        Shipment shipment = new Shipment()
            .shippedAt(DEFAULT_SHIPPED_AT);
        // Add required entity
        ShoppingOrder shoppingOrder;
        if (TestUtil.findAll(em, ShoppingOrder.class).isEmpty()) {
            shoppingOrder = ShoppingOrderResourceIT.createEntity(em);
            em.persist(shoppingOrder);
            em.flush();
        } else {
            shoppingOrder = TestUtil.findAll(em, ShoppingOrder.class).get(0);
        }
        shipment.setOrder(shoppingOrder);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        shipment.setShippedBy(user);
        return shipment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shipment createUpdatedEntity(EntityManager em) {
        Shipment shipment = new Shipment()
            .shippedAt(UPDATED_SHIPPED_AT);
        // Add required entity
        ShoppingOrder shoppingOrder;
        if (TestUtil.findAll(em, ShoppingOrder.class).isEmpty()) {
            shoppingOrder = ShoppingOrderResourceIT.createUpdatedEntity(em);
            em.persist(shoppingOrder);
            em.flush();
        } else {
            shoppingOrder = TestUtil.findAll(em, ShoppingOrder.class).get(0);
        }
        shipment.setOrder(shoppingOrder);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        shipment.setShippedBy(user);
        return shipment;
    }

    @BeforeEach
    public void initTest() {
        shipment = createEntity(em);
    }

    @Test
    @Transactional
    public void createShipment() throws Exception {
        int databaseSizeBeforeCreate = shipmentRepository.findAll().size();
        // Create the Shipment
        ShipmentDTO shipmentDTO = shipmentMapper.toDto(shipment);
        restShipmentMockMvc.perform(post("/api/shipments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shipmentDTO)))
            .andExpect(status().isCreated());

        // Validate the Shipment in the database
        List<Shipment> shipmentList = shipmentRepository.findAll();
        assertThat(shipmentList).hasSize(databaseSizeBeforeCreate + 1);
        Shipment testShipment = shipmentList.get(shipmentList.size() - 1);
        assertThat(testShipment.getShippedAt()).isEqualTo(DEFAULT_SHIPPED_AT);
    }

    @Test
    @Transactional
    public void createShipmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shipmentRepository.findAll().size();

        // Create the Shipment with an existing ID
        shipment.setId(1L);
        ShipmentDTO shipmentDTO = shipmentMapper.toDto(shipment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShipmentMockMvc.perform(post("/api/shipments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shipmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Shipment in the database
        List<Shipment> shipmentList = shipmentRepository.findAll();
        assertThat(shipmentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkShippedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = shipmentRepository.findAll().size();
        // set the field null
        shipment.setShippedAt(null);

        // Create the Shipment, which fails.
        ShipmentDTO shipmentDTO = shipmentMapper.toDto(shipment);


        restShipmentMockMvc.perform(post("/api/shipments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shipmentDTO)))
            .andExpect(status().isBadRequest());

        List<Shipment> shipmentList = shipmentRepository.findAll();
        assertThat(shipmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllShipments() throws Exception {
        // Initialize the database
        shipmentRepository.saveAndFlush(shipment);

        // Get all the shipmentList
        restShipmentMockMvc.perform(get("/api/shipments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shipment.getId().intValue())))
            .andExpect(jsonPath("$.[*].shippedAt").value(hasItem(DEFAULT_SHIPPED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getShipment() throws Exception {
        // Initialize the database
        shipmentRepository.saveAndFlush(shipment);

        // Get the shipment
        restShipmentMockMvc.perform(get("/api/shipments/{id}", shipment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(shipment.getId().intValue()))
            .andExpect(jsonPath("$.shippedAt").value(DEFAULT_SHIPPED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingShipment() throws Exception {
        // Get the shipment
        restShipmentMockMvc.perform(get("/api/shipments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShipment() throws Exception {
        // Initialize the database
        shipmentRepository.saveAndFlush(shipment);

        int databaseSizeBeforeUpdate = shipmentRepository.findAll().size();

        // Update the shipment
        Shipment updatedShipment = shipmentRepository.findById(shipment.getId()).get();
        // Disconnect from session so that the updates on updatedShipment are not directly saved in db
        em.detach(updatedShipment);
        updatedShipment
            .shippedAt(UPDATED_SHIPPED_AT);
        ShipmentDTO shipmentDTO = shipmentMapper.toDto(updatedShipment);

        restShipmentMockMvc.perform(put("/api/shipments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shipmentDTO)))
            .andExpect(status().isOk());

        // Validate the Shipment in the database
        List<Shipment> shipmentList = shipmentRepository.findAll();
        assertThat(shipmentList).hasSize(databaseSizeBeforeUpdate);
        Shipment testShipment = shipmentList.get(shipmentList.size() - 1);
        assertThat(testShipment.getShippedAt()).isEqualTo(UPDATED_SHIPPED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingShipment() throws Exception {
        int databaseSizeBeforeUpdate = shipmentRepository.findAll().size();

        // Create the Shipment
        ShipmentDTO shipmentDTO = shipmentMapper.toDto(shipment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShipmentMockMvc.perform(put("/api/shipments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shipmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Shipment in the database
        List<Shipment> shipmentList = shipmentRepository.findAll();
        assertThat(shipmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteShipment() throws Exception {
        // Initialize the database
        shipmentRepository.saveAndFlush(shipment);

        int databaseSizeBeforeDelete = shipmentRepository.findAll().size();

        // Delete the shipment
        restShipmentMockMvc.perform(delete("/api/shipments/{id}", shipment.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Shipment> shipmentList = shipmentRepository.findAll();
        assertThat(shipmentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
