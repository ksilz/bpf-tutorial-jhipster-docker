package com.betterprojectsfaster.tutorial.jhipsterdocker.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A ShoppingOrder.
 */
@Entity
@Table(name = "shopping_order")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ShoppingOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 2, max = 90)
    @Column(name = "name", length = 90, nullable = false, unique = true)
    private String name;

    @DecimalMin(value = "0")
    @Column(name = "total_amount")
    private Float totalAmount;

    @Column(name = "ordered")
    private LocalDate ordered;

    @OneToMany(mappedBy = "overallOrder")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProductOrder> orders = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "shoppingOrders", allowSetters = true)
    private User buyer;

    @OneToOne(mappedBy = "order")
    @JsonIgnore
    private Shipment shipment;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ShoppingOrder name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getTotalAmount() {
        return totalAmount;
    }

    public ShoppingOrder totalAmount(Float totalAmount) {
        this.totalAmount = totalAmount;
        return this;
    }

    public void setTotalAmount(Float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDate getOrdered() {
        return ordered;
    }

    public ShoppingOrder ordered(LocalDate ordered) {
        this.ordered = ordered;
        return this;
    }

    public void setOrdered(LocalDate ordered) {
        this.ordered = ordered;
    }

    public Set<ProductOrder> getOrders() {
        return orders;
    }

    public ShoppingOrder orders(Set<ProductOrder> productOrders) {
        this.orders = productOrders;
        return this;
    }

    public ShoppingOrder addOrders(ProductOrder productOrder) {
        this.orders.add(productOrder);
        productOrder.setOverallOrder(this);
        return this;
    }

    public ShoppingOrder removeOrders(ProductOrder productOrder) {
        this.orders.remove(productOrder);
        productOrder.setOverallOrder(null);
        return this;
    }

    public void setOrders(Set<ProductOrder> productOrders) {
        this.orders = productOrders;
    }

    public User getBuyer() {
        return buyer;
    }

    public ShoppingOrder buyer(User user) {
        this.buyer = user;
        return this;
    }

    public void setBuyer(User user) {
        this.buyer = user;
    }

    public Shipment getShipment() {
        return shipment;
    }

    public ShoppingOrder shipment(Shipment shipment) {
        this.shipment = shipment;
        return this;
    }

    public void setShipment(Shipment shipment) {
        this.shipment = shipment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShoppingOrder)) {
            return false;
        }
        return id != null && id.equals(((ShoppingOrder) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ShoppingOrder{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", totalAmount=" + getTotalAmount() +
            ", ordered='" + getOrdered() + "'" +
            "}";
    }
}
