package com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.Shipment} entity.
 */
public class ShipmentDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate shippedAt;

    private ShoppingOrderDTO order;

    private UserDTO shippedBy;

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

    public ShoppingOrderDTO getOrder() {
        return order;
    }

    public void setOrder(ShoppingOrderDTO order) {
        this.order = order;
    }

    public UserDTO getShippedBy() {
        return shippedBy;
    }

    public void setShippedBy(UserDTO shippedBy) {
        this.shippedBy = shippedBy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShipmentDTO)) {
            return false;
        }

        ShipmentDTO shipmentDTO = (ShipmentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, shipmentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ShipmentDTO{" +
            "id=" + getId() +
            ", shippedAt='" + getShippedAt() + "'" +
            ", order=" + getOrder() +
            ", shippedBy=" + getShippedBy() +
            "}";
    }
}
