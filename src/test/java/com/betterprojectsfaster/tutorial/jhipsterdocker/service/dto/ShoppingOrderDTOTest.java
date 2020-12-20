package com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.betterprojectsfaster.tutorial.jhipsterdocker.web.rest.TestUtil;

public class ShoppingOrderDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
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
