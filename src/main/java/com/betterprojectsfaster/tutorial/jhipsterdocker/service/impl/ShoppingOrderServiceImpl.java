package com.betterprojectsfaster.tutorial.jhipsterdocker.service.impl;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ShoppingOrder;
import com.betterprojectsfaster.tutorial.jhipsterdocker.repository.ShoppingOrderRepository;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.ShoppingOrderService;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ShoppingOrderDTO;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper.ShoppingOrderMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ShoppingOrder}.
 */
@Service
@Transactional
public class ShoppingOrderServiceImpl implements ShoppingOrderService {

    private final Logger log = LoggerFactory.getLogger(ShoppingOrderServiceImpl.class);

    private final ShoppingOrderRepository shoppingOrderRepository;

    private final ShoppingOrderMapper shoppingOrderMapper;

    public ShoppingOrderServiceImpl(ShoppingOrderRepository shoppingOrderRepository, ShoppingOrderMapper shoppingOrderMapper) {
        this.shoppingOrderRepository = shoppingOrderRepository;
        this.shoppingOrderMapper = shoppingOrderMapper;
    }

    @Override
    public ShoppingOrderDTO save(ShoppingOrderDTO shoppingOrderDTO) {
        log.debug("Request to save ShoppingOrder : {}", shoppingOrderDTO);
        ShoppingOrder shoppingOrder = shoppingOrderMapper.toEntity(shoppingOrderDTO);
        shoppingOrder = shoppingOrderRepository.save(shoppingOrder);
        return shoppingOrderMapper.toDto(shoppingOrder);
    }

    @Override
    public Optional<ShoppingOrderDTO> partialUpdate(ShoppingOrderDTO shoppingOrderDTO) {
        log.debug("Request to partially update ShoppingOrder : {}", shoppingOrderDTO);

        return shoppingOrderRepository
            .findById(shoppingOrderDTO.getId())
            .map(existingShoppingOrder -> {
                shoppingOrderMapper.partialUpdate(existingShoppingOrder, shoppingOrderDTO);

                return existingShoppingOrder;
            })
            .map(shoppingOrderRepository::save)
            .map(shoppingOrderMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShoppingOrderDTO> findAll() {
        log.debug("Request to get all ShoppingOrders");
        return shoppingOrderRepository.findAll().stream().map(shoppingOrderMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get all the shoppingOrders where Shipment is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ShoppingOrderDTO> findAllWhereShipmentIsNull() {
        log.debug("Request to get all shoppingOrders where Shipment is null");
        return StreamSupport
            .stream(shoppingOrderRepository.findAll().spliterator(), false)
            .filter(shoppingOrder -> shoppingOrder.getShipment() == null)
            .map(shoppingOrderMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ShoppingOrderDTO> findOne(Long id) {
        log.debug("Request to get ShoppingOrder : {}", id);
        return shoppingOrderRepository.findById(id).map(shoppingOrderMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ShoppingOrder : {}", id);
        shoppingOrderRepository.deleteById(id);
    }
}
