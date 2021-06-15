package com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ShipmentMapperTest {

    private ShipmentMapper shipmentMapper;

    @BeforeEach
    public void setUp() {
        shipmentMapper = new ShipmentMapperImpl();
    }
}
