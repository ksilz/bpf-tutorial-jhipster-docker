package com.betterprojectsfaster.tutorial.jhipsterdocker.service.impl;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ProductOrder;
import com.betterprojectsfaster.tutorial.jhipsterdocker.repository.ProductOrderRepository;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.ProductOrderService;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ProductOrderDTO;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper.ProductOrderMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ProductOrder}.
 */
@Service
@Transactional
public class ProductOrderServiceImpl implements ProductOrderService {

    private final Logger log = LoggerFactory.getLogger(ProductOrderServiceImpl.class);

    private final ProductOrderRepository productOrderRepository;

    private final ProductOrderMapper productOrderMapper;

    public ProductOrderServiceImpl(ProductOrderRepository productOrderRepository, ProductOrderMapper productOrderMapper) {
        this.productOrderRepository = productOrderRepository;
        this.productOrderMapper = productOrderMapper;
    }

    @Override
    public ProductOrderDTO save(ProductOrderDTO productOrderDTO) {
        log.debug("Request to save ProductOrder : {}", productOrderDTO);
        ProductOrder productOrder = productOrderMapper.toEntity(productOrderDTO);
        productOrder = productOrderRepository.save(productOrder);
        return productOrderMapper.toDto(productOrder);
    }

    @Override
    public Optional<ProductOrderDTO> partialUpdate(ProductOrderDTO productOrderDTO) {
        log.debug("Request to partially update ProductOrder : {}", productOrderDTO);

        return productOrderRepository
            .findById(productOrderDTO.getId())
            .map(
                existingProductOrder -> {
                    productOrderMapper.partialUpdate(existingProductOrder, productOrderDTO);
                    return existingProductOrder;
                }
            )
            .map(productOrderRepository::save)
            .map(productOrderMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductOrderDTO> findAll() {
        log.debug("Request to get all ProductOrders");
        return productOrderRepository.findAll().stream().map(productOrderMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProductOrderDTO> findOne(Long id) {
        log.debug("Request to get ProductOrder : {}", id);
        return productOrderRepository.findById(id).map(productOrderMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductOrder : {}", id);
        productOrderRepository.deleteById(id);
    }
}
