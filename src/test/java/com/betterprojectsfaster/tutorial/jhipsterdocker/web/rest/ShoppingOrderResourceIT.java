package com.betterprojectsfaster.tutorial.jhipsterdocker.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.betterprojectsfaster.tutorial.jhipsterdocker.IntegrationTest;
import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ShoppingOrder;
import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.User;
import com.betterprojectsfaster.tutorial.jhipsterdocker.repository.ShoppingOrderRepository;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ShoppingOrderDTO;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper.ShoppingOrderMapper;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ShoppingOrderResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ShoppingOrderResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Float DEFAULT_TOTAL_AMOUNT = 0F;
    private static final Float UPDATED_TOTAL_AMOUNT = 1F;

    private static final LocalDate DEFAULT_ORDERED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ORDERED = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/shopping-orders";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ShoppingOrderRepository shoppingOrderRepository;

    @Autowired
    private ShoppingOrderMapper shoppingOrderMapper;

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
        ShoppingOrder shoppingOrder = new ShoppingOrder().name(DEFAULT_NAME).totalAmount(DEFAULT_TOTAL_AMOUNT).ordered(DEFAULT_ORDERED);
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
        ShoppingOrder shoppingOrder = new ShoppingOrder().name(UPDATED_NAME).totalAmount(UPDATED_TOTAL_AMOUNT).ordered(UPDATED_ORDERED);
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
    void createShoppingOrder() throws Exception {
        int databaseSizeBeforeCreate = shoppingOrderRepository.findAll().size();
        // Create the ShoppingOrder
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);
        restShoppingOrderMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO))
            )
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
    void createShoppingOrderWithExistingId() throws Exception {
        // Create the ShoppingOrder with an existing ID
        shoppingOrder.setId(1L);
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);

        int databaseSizeBeforeCreate = shoppingOrderRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restShoppingOrderMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = shoppingOrderRepository.findAll().size();
        // set the field null
        shoppingOrder.setName(null);

        // Create the ShoppingOrder, which fails.
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);

        restShoppingOrderMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO))
            )
            .andExpect(status().isBadRequest());

        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllShoppingOrders() throws Exception {
        // Initialize the database
        shoppingOrderRepository.saveAndFlush(shoppingOrder);

        // Get all the shoppingOrderList
        restShoppingOrderMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shoppingOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].totalAmount").value(hasItem(DEFAULT_TOTAL_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].ordered").value(hasItem(DEFAULT_ORDERED.toString())));
    }

    @Test
    @Transactional
    void getShoppingOrder() throws Exception {
        // Initialize the database
        shoppingOrderRepository.saveAndFlush(shoppingOrder);

        // Get the shoppingOrder
        restShoppingOrderMockMvc
            .perform(get(ENTITY_API_URL_ID, shoppingOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(shoppingOrder.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.totalAmount").value(DEFAULT_TOTAL_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.ordered").value(DEFAULT_ORDERED.toString()));
    }

    @Test
    @Transactional
    void getNonExistingShoppingOrder() throws Exception {
        // Get the shoppingOrder
        restShoppingOrderMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewShoppingOrder() throws Exception {
        // Initialize the database
        shoppingOrderRepository.saveAndFlush(shoppingOrder);

        int databaseSizeBeforeUpdate = shoppingOrderRepository.findAll().size();

        // Update the shoppingOrder
        ShoppingOrder updatedShoppingOrder = shoppingOrderRepository.findById(shoppingOrder.getId()).get();
        // Disconnect from session so that the updates on updatedShoppingOrder are not directly saved in db
        em.detach(updatedShoppingOrder);
        updatedShoppingOrder.name(UPDATED_NAME).totalAmount(UPDATED_TOTAL_AMOUNT).ordered(UPDATED_ORDERED);
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(updatedShoppingOrder);

        restShoppingOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, shoppingOrderDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO))
            )
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
    void putNonExistingShoppingOrder() throws Exception {
        int databaseSizeBeforeUpdate = shoppingOrderRepository.findAll().size();
        shoppingOrder.setId(count.incrementAndGet());

        // Create the ShoppingOrder
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShoppingOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, shoppingOrderDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchShoppingOrder() throws Exception {
        int databaseSizeBeforeUpdate = shoppingOrderRepository.findAll().size();
        shoppingOrder.setId(count.incrementAndGet());

        // Create the ShoppingOrder
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShoppingOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamShoppingOrder() throws Exception {
        int databaseSizeBeforeUpdate = shoppingOrderRepository.findAll().size();
        shoppingOrder.setId(count.incrementAndGet());

        // Create the ShoppingOrder
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShoppingOrderMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateShoppingOrderWithPatch() throws Exception {
        // Initialize the database
        shoppingOrderRepository.saveAndFlush(shoppingOrder);

        int databaseSizeBeforeUpdate = shoppingOrderRepository.findAll().size();

        // Update the shoppingOrder using partial update
        ShoppingOrder partialUpdatedShoppingOrder = new ShoppingOrder();
        partialUpdatedShoppingOrder.setId(shoppingOrder.getId());

        partialUpdatedShoppingOrder.ordered(UPDATED_ORDERED);

        restShoppingOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShoppingOrder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShoppingOrder))
            )
            .andExpect(status().isOk());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeUpdate);
        ShoppingOrder testShoppingOrder = shoppingOrderList.get(shoppingOrderList.size() - 1);
        assertThat(testShoppingOrder.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testShoppingOrder.getTotalAmount()).isEqualTo(DEFAULT_TOTAL_AMOUNT);
        assertThat(testShoppingOrder.getOrdered()).isEqualTo(UPDATED_ORDERED);
    }

    @Test
    @Transactional
    void fullUpdateShoppingOrderWithPatch() throws Exception {
        // Initialize the database
        shoppingOrderRepository.saveAndFlush(shoppingOrder);

        int databaseSizeBeforeUpdate = shoppingOrderRepository.findAll().size();

        // Update the shoppingOrder using partial update
        ShoppingOrder partialUpdatedShoppingOrder = new ShoppingOrder();
        partialUpdatedShoppingOrder.setId(shoppingOrder.getId());

        partialUpdatedShoppingOrder.name(UPDATED_NAME).totalAmount(UPDATED_TOTAL_AMOUNT).ordered(UPDATED_ORDERED);

        restShoppingOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShoppingOrder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShoppingOrder))
            )
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
    void patchNonExistingShoppingOrder() throws Exception {
        int databaseSizeBeforeUpdate = shoppingOrderRepository.findAll().size();
        shoppingOrder.setId(count.incrementAndGet());

        // Create the ShoppingOrder
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShoppingOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, shoppingOrderDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchShoppingOrder() throws Exception {
        int databaseSizeBeforeUpdate = shoppingOrderRepository.findAll().size();
        shoppingOrder.setId(count.incrementAndGet());

        // Create the ShoppingOrder
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShoppingOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamShoppingOrder() throws Exception {
        int databaseSizeBeforeUpdate = shoppingOrderRepository.findAll().size();
        shoppingOrder.setId(count.incrementAndGet());

        // Create the ShoppingOrder
        ShoppingOrderDTO shoppingOrderDTO = shoppingOrderMapper.toDto(shoppingOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShoppingOrderMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shoppingOrderDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ShoppingOrder in the database
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteShoppingOrder() throws Exception {
        // Initialize the database
        shoppingOrderRepository.saveAndFlush(shoppingOrder);

        int databaseSizeBeforeDelete = shoppingOrderRepository.findAll().size();

        // Delete the shoppingOrder
        restShoppingOrderMockMvc
            .perform(delete(ENTITY_API_URL_ID, shoppingOrder.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ShoppingOrder> shoppingOrderList = shoppingOrderRepository.findAll();
        assertThat(shoppingOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
