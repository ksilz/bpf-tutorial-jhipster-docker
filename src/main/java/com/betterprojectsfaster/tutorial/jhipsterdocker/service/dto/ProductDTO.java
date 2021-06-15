package com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.enumeration.ProductCategory;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.Product} entity.
 */
public class ProductDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 2, max = 90)
    private String name;

    @NotNull
    @DecimalMin(value = "0")
    private Float price;

    @Lob
    private String description;

    @Lob
    private byte[] picture;

    private String pictureContentType;

    @Lob
    private byte[] specification;

    private String specificationContentType;
    private ProductCategory category;

    @NotNull
    @Min(value = 0)
    private Integer inventory;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public byte[] getSpecification() {
        return specification;
    }

    public void setSpecification(byte[] specification) {
        this.specification = specification;
    }

    public String getSpecificationContentType() {
        return specificationContentType;
    }

    public void setSpecificationContentType(String specificationContentType) {
        this.specificationContentType = specificationContentType;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductDTO)) {
            return false;
        }

        ProductDTO productDTO = (ProductDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, productDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", description='" + getDescription() + "'" +
            ", picture='" + getPicture() + "'" +
            ", specification='" + getSpecification() + "'" +
            ", category='" + getCategory() + "'" +
            ", inventory=" + getInventory() +
            "}";
    }
}
