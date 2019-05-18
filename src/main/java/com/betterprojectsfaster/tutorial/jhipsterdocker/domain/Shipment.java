package com.betterprojectsfaster.tutorial.jhipsterdocker.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Shipment.
 */
@Entity
@Table(name = "shipment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Shipment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "shipped_at", nullable = false)
    private ZonedDateTime shippedAt;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private ShoppingOrder order;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("shipments")
    private User shippedBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getShippedAt() {
        return shippedAt;
    }

    public Shipment shippedAt(ZonedDateTime shippedAt) {
        this.shippedAt = shippedAt;
        return this;
    }

    public void setShippedAt(ZonedDateTime shippedAt) {
        this.shippedAt = shippedAt;
    }

    public ShoppingOrder getOrder() {
        return order;
    }

    public Shipment order(ShoppingOrder shoppingOrder) {
        this.order = shoppingOrder;
        return this;
    }

    public void setOrder(ShoppingOrder shoppingOrder) {
        this.order = shoppingOrder;
    }

    public User getShippedBy() {
        return shippedBy;
    }

    public Shipment shippedBy(User user) {
        this.shippedBy = user;
        return this;
    }

    public void setShippedBy(User user) {
        this.shippedBy = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Shipment)) {
            return false;
        }
        return id != null && id.equals(((Shipment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Shipment{" +
            "id=" + getId() +
            ", shippedAt='" + getShippedAt() + "'" +
            "}";
    }
}
