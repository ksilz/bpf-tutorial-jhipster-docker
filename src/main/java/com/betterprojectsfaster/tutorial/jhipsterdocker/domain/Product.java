package com.betterprojectsfaster.tutorial.jhipsterdocker.domain;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.enumeration.ProductCategory;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
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

    @NotNull
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
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "buyer", "product", "overallOrder" }, allowSetters = true)
    private Set<ProductOrder> productOrders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Product id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Product name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return this.price;
    }

    public Product price(Float price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getDescription() {
        return this.description;
    }

    public Product description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPicture() {
        return this.picture;
    }

    public Product picture(byte[] picture) {
        this.setPicture(picture);
        return this;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return this.pictureContentType;
    }

    public Product pictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
        return this;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public byte[] getSpecification() {
        return this.specification;
    }

    public Product specification(byte[] specification) {
        this.setSpecification(specification);
        return this;
    }

    public void setSpecification(byte[] specification) {
        this.specification = specification;
    }

    public String getSpecificationContentType() {
        return this.specificationContentType;
    }

    public Product specificationContentType(String specificationContentType) {
        this.specificationContentType = specificationContentType;
        return this;
    }

    public void setSpecificationContentType(String specificationContentType) {
        this.specificationContentType = specificationContentType;
    }

    public ProductCategory getCategory() {
        return this.category;
    }

    public Product category(ProductCategory category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public Integer getInventory() {
        return this.inventory;
    }

    public Product inventory(Integer inventory) {
        this.setInventory(inventory);
        return this;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public Set<ProductOrder> getProductOrders() {
        return this.productOrders;
    }

    public void setProductOrders(Set<ProductOrder> productOrders) {
        if (this.productOrders != null) {
            this.productOrders.forEach(i -> i.setProduct(null));
        }
        if (productOrders != null) {
            productOrders.forEach(i -> i.setProduct(this));
        }
        this.productOrders = productOrders;
    }

    public Product productOrders(Set<ProductOrder> productOrders) {
        this.setProductOrders(productOrders);
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

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
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
