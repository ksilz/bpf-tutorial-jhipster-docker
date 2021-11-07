package com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ShoppingOrder;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.ShoppingOrderDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ShoppingOrder} and its DTO {@link ShoppingOrderDTO}.
 */
@Mapper(componentModel = "spring", uses = { UserMapper.class })
public interface ShoppingOrderMapper extends EntityMapper<ShoppingOrderDTO, ShoppingOrder> {
    @Mapping(target = "buyer", source = "buyer", qualifiedByName = "login")
    ShoppingOrderDTO toDto(ShoppingOrder s);

    @Named("name")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    ShoppingOrderDTO toDtoName(ShoppingOrder shoppingOrder);
}
