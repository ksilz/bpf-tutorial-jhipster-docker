package com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.*;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ShipmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Shipment} and its DTO {@link ShipmentDTO}.
 */
@Mapper(componentModel = "spring", uses = {ShoppingOrderMapper.class, UserMapper.class})
public interface ShipmentMapper extends EntityMapper<ShipmentDTO, Shipment> {

    @Mapping(source = "order.id", target = "orderId")
    @Mapping(source = "order.name", target = "orderName")
    @Mapping(source = "shippedBy.id", target = "shippedById")
    @Mapping(source = "shippedBy.login", target = "shippedByLogin")
    ShipmentDTO toDto(Shipment shipment);

    @Mapping(source = "orderId", target = "order")
    @Mapping(source = "shippedById", target = "shippedBy")
    Shipment toEntity(ShipmentDTO shipmentDTO);

    default Shipment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Shipment shipment = new Shipment();
        shipment.setId(id);
        return shipment;
    }
}
