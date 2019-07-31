package com.betterprojectsfaster.tutorial.jhipsterdocker.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.enumeration.ProductCategory;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 2, max = 90)
    @Column(name = "name", length = 90, nullable = false, unique = true)
    private String name;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "price", nullable = false)
    private Float price;

    
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "description", nullable = false)
    private String description;

    
    @Lob
    @Column(name = "picture", nullable = false)
    private byte[] picture;

    @Column(name = "picture_content_type", nullable = false)
    private String pictureContentType;

    @Lob
    @Column(name = "specification")
    private byte[] specification;

    @Column(name = "specification_content_type")
    private String specificationContentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private ProductCategory category;

    @NotNull
    @Min(value = 0)
    @Column(name = "inventory", nullable = false)
    private Integer inventory;

    @OneToMany(mappedBy = "product")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProductOrder> productOrders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return price;
    }

    public Product price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPicture() {
        return picture;
    }

    public Product picture(byte[] picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public Product pictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
        return this;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public byte[] getSpecification() {
        return specification;
    }

    public Product specification(byte[] specification) {
        this.specification = specification;
        return this;
    }

    public void setSpecification(byte[] specification) {
        this.specification = specification;
    }

    public String getSpecificationContentType() {
        return specificationContentType;
    }

    public Product specificationContentType(String specificationContentType) {
        this.specificationContentType = specificationContentType;
        return this;
    }

    public void setSpecificationContentType(String specificationContentType) {
        this.specificationContentType = specificationContentType;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public Product category(ProductCategory category) {
        this.category = category;
        return this;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public Integer getInventory() {
        return inventory;
    }

    public Product inventory(Integer inventory) {
        this.inventory = inventory;
        return this;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public Set<ProductOrder> getProductOrders() {
        return productOrders;
    }

    public Product productOrders(Set<ProductOrder> productOrders) {
        this.productOrders = productOrders;
        return this;
    }

    public Product addProductOrder(ProductOrder productOrder) {
        this.productOrders.add(productOrder);
        productOrder.setProduct(this);
        return this;
    }

    public Product removeProductOrder(ProductOrder productOrder) {
        this.productOrders.remove(productOrder);
        productOrder.setProduct(null);
        return this;
    }

    public void setProductOrders(Set<ProductOrder> productOrders) {
        this.productOrders = productOrders;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", description='" + getDescription() + "'" +
            ", picture='" + getPicture() + "'" +
            ", pictureContentType='" + getPictureContentType() + "'" +
            ", specification='" + getSpecification() + "'" +
            ", specificationContentType='" + getSpecificationContentType() + "'" +
            ", category='" + getCategory() + "'" +
            ", inventory=" + getInventory() +
            "}";
    }
}
