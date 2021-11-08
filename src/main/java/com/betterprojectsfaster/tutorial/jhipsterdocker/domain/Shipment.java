package com.betterprojectsfaster.tutorial.jhipsterdocker.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Shipment.
 */
@Entity
@Table(name = "shipment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Shipment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "shipped_at", nullable = false)
    private LocalDate shippedAt;

    @JsonIgnoreProperties(value = { "orders", "buyer", "shipment" }, allowSetters = true)
    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private ShoppingOrder order;

    @ManyToOne(optional = false)
    @NotNull
    private User shippedBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Shipment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getShippedAt() {
        return this.shippedAt;
    }

    public Shipment shippedAt(LocalDate shippedAt) {
        this.setShippedAt(shippedAt);
        return this;
    }

    public void setShippedAt(LocalDate shippedAt) {
        this.shippedAt = shippedAt;
    }

    public ShoppingOrder getOrder() {
        return this.order;
    }

    public void setOrder(ShoppingOrder shoppingOrder) {
        this.order = shoppingOrder;
    }

    public Shipment order(ShoppingOrder shoppingOrder) {
        this.setOrder(shoppingOrder);
        return this;
    }

    public User getShippedBy() {
        return this.shippedBy;
    }

    public void setShippedBy(User user) {
        this.shippedBy = user;
    }

    public Shipment shippedBy(User user) {
        this.setShippedBy(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Shipment{" +
            "id=" + getId() +
            ", shippedAt='" + getShippedAt() + "'" +
            "}";
    }
}
