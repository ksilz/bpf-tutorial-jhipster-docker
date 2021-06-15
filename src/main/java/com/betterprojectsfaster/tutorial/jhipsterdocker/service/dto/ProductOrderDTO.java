package com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ProductOrder} entity.
 */
public class ProductOrderDTO implements Serializable {

    private Long id;

    @NotNull
    @Min(value = 0)
    @Max(value = 5)
    private Integer amount;

    private UserDTO buyer;

    private ProductDTO product;

    private ShoppingOrderDTO overallOrder;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public UserDTO getBuyer() {
        return buyer;
    }

    public void setBuyer(UserDTO buyer) {
        this.buyer = buyer;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public ShoppingOrderDTO getOverallOrder() {
        return overallOrder;
    }

    public void setOverallOrder(ShoppingOrderDTO overallOrder) {
        this.overallOrder = overallOrder;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductOrderDTO)) {
            return false;
        }

        ProductOrderDTO productOrderDTO = (ProductOrderDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, productOrderDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductOrderDTO{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", buyer=" + getBuyer() +
            ", product=" + getProduct() +
            ", overallOrder=" + getOverallOrder() +
            "}";
    }
}
