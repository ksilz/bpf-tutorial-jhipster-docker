package com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.betterprojectsfaster.tutorial.jhipsterdocker.domain.ProductOrder} entity.
 */
public class ProductOrderDTO implements Serializable {
    
    private Long id;

    @NotNull
    @Min(value = 0)
    @Max(value = 5)
    private Integer amount;


    private Long buyerId;

    private String buyerLogin;

    private Long productId;

    private String productName;

    private Long overallOrderId;

    private String overallOrderName;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Long userId) {
        this.buyerId = userId;
    }

    public String getBuyerLogin() {
        return buyerLogin;
    }

    public void setBuyerLogin(String userLogin) {
        this.buyerLogin = userLogin;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getOverallOrderId() {
        return overallOrderId;
    }

    public void setOverallOrderId(Long shoppingOrderId) {
        this.overallOrderId = shoppingOrderId;
    }

    public String getOverallOrderName() {
        return overallOrderName;
    }

    public void setOverallOrderName(String shoppingOrderName) {
        this.overallOrderName = shoppingOrderName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductOrderDTO)) {
            return false;
        }

        return id != null && id.equals(((ProductOrderDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductOrderDTO{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", buyerId=" + getBuyerId() +
            ", buyerLogin='" + getBuyerLogin() + "'" +
            ", productId=" + getProductId() +
            ", productName='" + getProductName() + "'" +
            ", overallOrderId=" + getOverallOrderId() +
            ", overallOrderName='" + getOverallOrderName() + "'" +
            "}";
    }
}
