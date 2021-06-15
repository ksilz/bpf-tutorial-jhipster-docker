package com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProductOrderMapperTest {

    private ProductOrderMapper productOrderMapper;

    @BeforeEach
    public void setUp() {
        productOrderMapper = new ProductOrderMapperImpl();
    }
}
