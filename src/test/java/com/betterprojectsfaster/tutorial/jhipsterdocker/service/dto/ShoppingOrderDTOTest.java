package com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.betterprojectsfaster.tutorial.jhipsterdocker.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ShoppingOrderDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShoppingOrderDTO.class);
        ShoppingOrderDTO shoppingOrderDTO1 = new ShoppingOrderDTO();
        shoppingOrderDTO1.setId(1L);
        ShoppingOrderDTO shoppingOrderDTO2 = new ShoppingOrderDTO();
        assertThat(shoppingOrderDTO1).isNotEqualTo(shoppingOrderDTO2);
        shoppingOrderDTO2.setId(shoppingOrderDTO1.getId());
        assertThat(shoppingOrderDTO1).isEqualTo(shoppingOrderDTO2);
        shoppingOrderDTO2.setId(2L);
        assertThat(shoppingOrderDTO1).isNotEqualTo(shoppingOrderDTO2);
        shoppingOrderDTO1.setId(null);
        assertThat(shoppingOrderDTO1).isNotEqualTo(shoppingOrderDTO2);
    }
}
