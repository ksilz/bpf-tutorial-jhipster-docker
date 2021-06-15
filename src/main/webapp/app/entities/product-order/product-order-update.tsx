import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { getEntities as getShoppingOrders } from 'app/entities/shopping-order/shopping-order.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product-order.reducer';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductOrderUpdate = (props: IProductOrderUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { productOrderEntity, users, products, shoppingOrders, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/product-order');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getProducts();
    props.getShoppingOrders();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...productOrderEntity,
        ...values,
        buyer: users.find(it => it.id.toString() === values.buyerId.toString()),
        product: products.find(it => it.id.toString() === values.productId.toString()),
        overallOrder: shoppingOrders.find(it => it.id.toString() === values.overallOrderId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="mySimpleShopApp.productOrder.home.createOrEditLabel" data-cy="ProductOrderCreateUpdateHeading">
            <Translate contentKey="mySimpleShopApp.productOrder.home.createOrEditLabel">Create or edit a ProductOrder</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : productOrderEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="product-order-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="product-order-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="amountLabel" for="product-order-amount">
                  <Translate contentKey="mySimpleShopApp.productOrder.amount">Amount</Translate>
                </Label>
                <AvField
                  id="product-order-amount"
                  data-cy="amount"
                  type="string"
                  className="form-control"
                  name="amount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 5, errorMessage: translate('entity.validation.max', { max: 5 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="product-order-buyer">
                  <Translate contentKey="mySimpleShopApp.productOrder.buyer">Buyer</Translate>
                </Label>
                <AvInput id="product-order-buyer" data-cy="buyer" type="select" className="form-control" name="buyerId" required>
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="product-order-product">
                  <Translate contentKey="mySimpleShopApp.productOrder.product">Product</Translate>
                </Label>
                <AvInput id="product-order-product" data-cy="product" type="select" className="form-control" name="productId" required>
                  <option value="" key="0" />
                  {products
                    ? products.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="product-order-overallOrder">
                  <Translate contentKey="mySimpleShopApp.productOrder.overallOrder">Overall Order</Translate>
                </Label>
                <AvInput
                  id="product-order-overallOrder"
                  data-cy="overallOrder"
                  type="select"
                  className="form-control"
                  name="overallOrderId"
                  required
                >
                  <option value="" key="0" />
                  {shoppingOrders
                    ? shoppingOrders.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/product-order" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  products: storeState.product.entities,
  shoppingOrders: storeState.shoppingOrder.entities,
  productOrderEntity: storeState.productOrder.entity,
  loading: storeState.productOrder.loading,
  updating: storeState.productOrder.updating,
  updateSuccess: storeState.productOrder.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getProducts,
  getShoppingOrders,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrderUpdate);
