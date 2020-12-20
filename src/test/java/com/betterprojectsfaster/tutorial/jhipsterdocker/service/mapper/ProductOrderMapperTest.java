package com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ProductOrderMapperTest {

    private ProductOrderMapper productOrderMapper;

    @BeforeEach
    public void setUp() {
        productOrderMapper = new ProductOrderMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(productOrderMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(productOrderMapper.fromId(null)).isNull();
    }
}
