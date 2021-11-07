package com.betterprojectsfaster.tutorial.jhipsterdocker.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ProductOrder.
 */
@Entity
@Table(name = "product_order")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProductOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Min(value = 0)
    @Max(value = 5)
    @Column(name = "amount", nullable = false)
    private Integer amount;

    @ManyToOne(optional = false)
    @NotNull
    private User buyer;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "productOrders" }, allowSetters = true)
    private Product product;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "orders", "buyer", "shipment" }, allowSetters = true)
    private ShoppingOrder overallOrder;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ProductOrder id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAmount() {
        return this.amount;
    }

    public ProductOrder amount(Integer amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public User getBuyer() {
        return this.buyer;
    }

    public void setBuyer(User user) {
        this.buyer = user;
    }

    public ProductOrder buyer(User user) {
        this.setBuyer(user);
        return this;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ProductOrder product(Product product) {
        this.setProduct(product);
        return this;
    }

    public ShoppingOrder getOverallOrder() {
        return this.overallOrder;
    }

    public void setOverallOrder(ShoppingOrder shoppingOrder) {
        this.overallOrder = shoppingOrder;
    }

    public ProductOrder overallOrder(ShoppingOrder shoppingOrder) {
        this.setOverallOrder(shoppingOrder);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductOrder{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            "}";
    }
}
