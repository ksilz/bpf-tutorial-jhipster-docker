package com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ShoppingOrder} entity.
 */
public class ShoppingOrderDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 2, max = 90)
    private String name;

    @DecimalMin(value = "0")
    private Float totalAmount;

    private LocalDate ordered;

    private UserDTO buyer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDate getOrdered() {
        return ordered;
    }

    public void setOrdered(LocalDate ordered) {
        this.ordered = ordered;
    }

    public UserDTO getBuyer() {
        return buyer;
    }

    public void setBuyer(UserDTO buyer) {
        this.buyer = buyer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShoppingOrderDTO)) {
            return false;
        }

        ShoppingOrderDTO shoppingOrderDTO = (ShoppingOrderDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, shoppingOrderDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ShoppingOrderDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", totalAmount=" + getTotalAmount() +
            ", ordered='" + getOrdered() + "'" +
            ", buyer=" + getBuyer() +
            "}";
    }
}
