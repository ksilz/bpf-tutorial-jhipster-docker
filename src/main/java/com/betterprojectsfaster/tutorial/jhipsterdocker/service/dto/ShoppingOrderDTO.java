package com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

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

    private ZonedDateTime ordered;


    private Long buyerId;

    private String buyerLogin;

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

    public ZonedDateTime getOrdered() {
        return ordered;
    }

    public void setOrdered(ZonedDateTime ordered) {
        this.ordered = ordered;
    }

    public Long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Long userId) {
        this.buyerId = userId;
    }

    public String getBuyerLogin() {
        return buyerLogin;
    }

    public void setBuyerLogin(String userLogin) {
        this.buyerLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ShoppingOrderDTO shoppingOrderDTO = (ShoppingOrderDTO) o;
        if (shoppingOrderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shoppingOrderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ShoppingOrderDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", totalAmount=" + getTotalAmount() +
            ", ordered='" + getOrdered() + "'" +
            ", buyer=" + getBuyerId() +
            ", buyer='" + getBuyerLogin() + "'" +
            "}";
    }
}
