package com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.Shipment;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ShipmentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Shipment} and its DTO {@link ShipmentDTO}.
 */
@Mapper(componentModel = "spring", uses = { ShoppingOrderMapper.class, UserMapper.class })
public interface ShipmentMapper extends EntityMapper<ShipmentDTO, Shipment> {
    @Mapping(target = "order", source = "order", qualifiedByName = "name")
    @Mapping(target = "shippedBy", source = "shippedBy", qualifiedByName = "login")
    ShipmentDTO toDto(Shipment s);
}
