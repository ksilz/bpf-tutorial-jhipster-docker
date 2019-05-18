package com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.Shipment} entity.
 */
public class ShipmentDTO implements Serializable {

    private Long id;

    @NotNull
    private ZonedDateTime shippedAt;


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

    public ZonedDateTime getShippedAt() {
        return shippedAt;
    }

    public void setShippedAt(ZonedDateTime shippedAt) {
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
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ShipmentDTO shipmentDTO = (ShipmentDTO) o;
        if (shipmentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shipmentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ShipmentDTO{" +
            "id=" + getId() +
            ", shippedAt='" + getShippedAt() + "'" +
            ", order=" + getOrderId() +
            ", order='" + getOrderName() + "'" +
            ", shippedBy=" + getShippedById() +
            ", shippedBy='" + getShippedByLogin() + "'" +
            "}";
    }
}
