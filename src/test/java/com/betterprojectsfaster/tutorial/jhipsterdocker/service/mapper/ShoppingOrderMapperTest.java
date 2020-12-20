package com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ShoppingOrderMapperTest {

    private ShoppingOrderMapper shoppingOrderMapper;

    @BeforeEach
    public void setUp() {
        shoppingOrderMapper = new ShoppingOrderMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(shoppingOrderMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(shoppingOrderMapper.fromId(null)).isNull();
    }
}
