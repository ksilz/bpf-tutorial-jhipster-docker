package com.betterprojectsfaster.tutorial.jhipsterdocker.web.rest;

import com.betterprojectsfaster.tutorial.jhipsterdocker.MySimpleShopApp;
import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ShoppingOrder;
import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.User;
import com.betterprojectsfaster.tutorial.jhipsterdocker.repository.ShoppingOrderRepository;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.ShoppingOrderService;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ShoppingOrderDTO;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper.ShoppingOrderMapper;

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
 * Integration tests for the {@link ShoppingOrderResource} REST controller.
 */
@SpringBootTest(classes = MySimpleShopApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ShoppingOrderResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Float DEFAULT_TOTAL_AMOUNT = 0F;
    private static final Float UPDATED_TOTAL_AMOUNT = 1F;

    private static final LocalDate DEFAULT_ORDERED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ORDERED = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ShoppingOrderRepository shoppingOrderRepository;

    @Autowired
    private ShoppingOrderMapper shoppingOrderMapper;

    @Autowired
    private ShoppingOrderService shoppingOrderService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restShoppingOrderMockMvc;

    private ShoppingOrder shoppingOrder;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShoppingOrder createEntity(EntityManager em) {
        ShoppingOrder shoppingOrder = new ShoppingOrder()
            .name(DEFAULT_NAME)
            .totalAmount(DEFAULT_TOTAL_AMOUNT)
            .ordered(DEFAULT_ORDERED);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        shoppingOrder.setBuyer(user);
        return shoppingOrder;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShoppingOrder createUpdatedEntity(EntityManager em) {
        ShoppingOrder shoppingOrder = new ShoppingOrder()
            .name(UPDATED_NAME)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .ordered(UPDATED_ORDERED);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        shoppingOrder.setBuyer(user);
        return shoppingOrder;
    }

    @BeforeEach
    public void initTest() {
        shoppingOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createShoppingOrder() throws Exception {
        int databaseSizeBeforeCreate = shoppingOrderRepository.findAll().size();
        // Create the ShoppingOrder
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);
        restShoppingOrderMockMvc.perform(post("/api/shopping-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO)))
            .andExpect(status().isCreated());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeCreate + 1);
        ShoppingOrder testShoppingOrder = shoppingOrderList.get(shoppingOrderList.size() - 1);
        assertThat(testShoppingOrder.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testShoppingOrder.getTotalAmount()).isEqualTo(DEFAULT_TOTAL_AMOUNT);
        assertThat(testShoppingOrder.getOrdered()).isEqualTo(DEFAULT_ORDERED);
    }

    @Test
    @Transactional
    public void createShoppingOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shoppingOrderRepository.findAll().size();

        // Create the ShoppingOrder with an existing ID
        shoppingOrder.setId(1L);
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShoppingOrderMockMvc.perform(post("/api/shopping-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = shoppingOrderRepository.findAll().size();
        // set the field null
        shoppingOrder.setName(null);

        // Create the ShoppingOrder, which fails.
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);


        restShoppingOrderMockMvc.perform(post("/api/shopping-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO)))
            .andExpect(status().isBadRequest());

        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllShoppingOrders() throws Exception {
        // Initialize the database
        shoppingOrderRepository.saveAndFlush(shoppingOrder);

        // Get all the shoppingOrderList
        restShoppingOrderMockMvc.perform(get("/api/shopping-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shoppingOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].totalAmount").value(hasItem(DEFAULT_TOTAL_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].ordered").value(hasItem(DEFAULT_ORDERED.toString())));
    }
    
    @Test
    @Transactional
    public void getShoppingOrder() throws Exception {
        // Initialize the database
        shoppingOrderRepository.saveAndFlush(shoppingOrder);

        // Get the shoppingOrder
        restShoppingOrderMockMvc.perform(get("/api/shopping-orders/{id}", shoppingOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(shoppingOrder.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.totalAmount").value(DEFAULT_TOTAL_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.ordered").value(DEFAULT_ORDERED.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingShoppingOrder() throws Exception {
        // Get the shoppingOrder
        restShoppingOrderMockMvc.perform(get("/api/shopping-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShoppingOrder() throws Exception {
        // Initialize the database
        shoppingOrderRepository.saveAndFlush(shoppingOrder);

        int databaseSizeBeforeUpdate = shoppingOrderRepository.findAll().size();

        // Update the shoppingOrder
        ShoppingOrder updatedShoppingOrder = shoppingOrderRepository.findById(shoppingOrder.getId()).get();
        // Disconnect from session so that the updates on updatedShoppingOrder are not directly saved in db
        em.detach(updatedShoppingOrder);
        updatedShoppingOrder
            .name(UPDATED_NAME)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .ordered(UPDATED_ORDERED);
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(updatedShoppingOrder);

        restShoppingOrderMockMvc.perform(put("/api/shopping-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO)))
            .andExpect(status().isOk());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeUpdate);
        ShoppingOrder testShoppingOrder = shoppingOrderList.get(shoppingOrderList.size() - 1);
        assertThat(testShoppingOrder.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testShoppingOrder.getTotalAmount()).isEqualTo(UPDATED_TOTAL_AMOUNT);
        assertThat(testShoppingOrder.getOrdered()).isEqualTo(UPDATED_ORDERED);
    }

    @Test
    @Transactional
    public void updateNonExistingShoppingOrder() throws Exception {
        int databaseSizeBeforeUpdate = shoppingOrderRepository.findAll().size();

        // Create the ShoppingOrder
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShoppingOrderMockMvc.perform(put("/api/shopping-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteShoppingOrder() throws Exception {
        // Initialize the database
        shoppingOrderRepository.saveAndFlush(shoppingOrder);

        int databaseSizeBeforeDelete = shoppingOrderRepository.findAll().size();

        // Delete the shoppingOrder
        restShoppingOrderMockMvc.perform(delete("/api/shopping-orders/{id}", shoppingOrder.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
