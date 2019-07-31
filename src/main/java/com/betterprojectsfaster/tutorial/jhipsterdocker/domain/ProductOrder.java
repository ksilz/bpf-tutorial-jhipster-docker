package com.betterprojectsfaster.tutorial.jhipsterdocker.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A ProductOrder.
 */
@Entity
@Table(name = "product_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Min(value = 0)
    @Max(value = 5)
    @Column(name = "amount", nullable = false)
    private Integer amount;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("productOrders")
    private User buyer;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("productOrders")
    private Product product;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("orders")
    private ShoppingOrder overallOrder;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAmount() {
        return amount;
    }

    public ProductOrder amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public User getBuyer() {
        return buyer;
    }

    public ProductOrder buyer(User user) {
        this.buyer = user;
        return this;
    }

    public void setBuyer(User user) {
        this.buyer = user;
    }

    public Product getProduct() {
        return product;
    }

    public ProductOrder product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ShoppingOrder getOverallOrder() {
        return overallOrder;
    }

    public ProductOrder overallOrder(ShoppingOrder shoppingOrder) {
        this.overallOrder = shoppingOrder;
        return this;
    }

    public void setOverallOrder(ShoppingOrder shoppingOrder) {
        this.overallOrder = shoppingOrder;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductOrder)) {
            return false;
        }
        return id != null && id.equals(((ProductOrder) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProductOrder{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            "}";
    }
}
