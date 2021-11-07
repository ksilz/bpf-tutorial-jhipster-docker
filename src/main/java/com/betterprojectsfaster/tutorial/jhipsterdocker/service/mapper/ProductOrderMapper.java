package com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ProductOrder;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ProductOrderDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProductOrder} and its DTO {@link ProductOrderDTO}.
 */
@Mapper(componentModel = "spring", uses = { UserMapper.class, ProductMapper.class, ShoppingOrderMapper.class })
public interface ProductOrderMapper extends EntityMapper<ProductOrderDTO, ProductOrder> {
    @Mapping(target = "buyer", source = "buyer", qualifiedByName = "login")
    @Mapping(target = "product", source = "product", qualifiedByName = "name")
    @Mapping(target = "overallOrder", source = "overallOrder", qualifiedByName = "name")
    ProductOrderDTO toDto(ProductOrder s);
}
