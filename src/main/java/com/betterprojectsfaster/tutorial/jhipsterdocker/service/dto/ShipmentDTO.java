package com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.Shipment} entity.
 */
public class ShipmentDTO implements Serializable {
    
    private Long id;

    @NotNull
    private LocalDate shippedAt;


    private Long orderId;

    private String orderName;

    private Long shippedById;

    private String shippedByLogin;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getShippedAt() {
        return shippedAt;
    }

    public void setShippedAt(LocalDate shippedAt) {
        this.shippedAt = shippedAt;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long shoppingOrderId) {
        this.orderId = shoppingOrderId;
    }

    public String getOrderName() {
        return orderName;
    }

    public void setOrderName(String shoppingOrderName) {
        this.orderName = shoppingOrderName;
    }

    public Long getShippedById() {
        return shippedById;
    }

    public void setShippedById(Long userId) {
        this.shippedById = userId;
    }

    public String getShippedByLogin() {
        return shippedByLogin;
    }

    public void setShippedByLogin(String userLogin) {
        this.shippedByLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShipmentDTO)) {
            return false;
        }

        return id != null && id.equals(((ShipmentDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ShipmentDTO{" +
            "id=" + getId() +
            ", shippedAt='" + getShippedAt() + "'" +
            ", orderId=" + getOrderId() +
            ", orderName='" + getOrderName() + "'" +
            ", shippedById=" + getShippedById() +
            ", shippedByLogin='" + getShippedByLogin() + "'" +
            "}";
    }
}
