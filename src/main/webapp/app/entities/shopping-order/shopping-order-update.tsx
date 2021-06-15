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
import { IShipment } from 'app/shared/model/shipment.model';
import { getEntities as getShipments } from 'app/entities/shipment/shipment.reducer';
import { getEntity, updateEntity, createEntity, reset } from './shopping-order.reducer';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IShoppingOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ShoppingOrderUpdate = (props: IShoppingOrderUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { shoppingOrderEntity, users, shipments, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/shopping-order');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getShipments();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...shoppingOrderEntity,
        ...values,
        buyer: users.find(it => it.id.toString() === values.buyerId.toString()),
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
          <h2 id="mySimpleShopApp.shoppingOrder.home.createOrEditLabel" data-cy="ShoppingOrderCreateUpdateHeading">
            <Translate contentKey="mySimpleShopApp.shoppingOrder.home.createOrEditLabel">Create or edit a ShoppingOrder</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : shoppingOrderEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="shopping-order-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="shopping-order-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="shopping-order-name">
                  <Translate contentKey="mySimpleShopApp.shoppingOrder.name">Name</Translate>
                </Label>
                <AvField
                  id="shopping-order-name"
                  data-cy="name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                    maxLength: { value: 90, errorMessage: translate('entity.validation.maxlength', { max: 90 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="totalAmountLabel" for="shopping-order-totalAmount">
                  <Translate contentKey="mySimpleShopApp.shoppingOrder.totalAmount">Total Amount</Translate>
                </Label>
                <AvField
                  id="shopping-order-totalAmount"
                  data-cy="totalAmount"
                  type="string"
                  className="form-control"
                  name="totalAmount"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="orderedLabel" for="shopping-order-ordered">
                  <Translate contentKey="mySimpleShopApp.shoppingOrder.ordered">Ordered</Translate>
                </Label>
                <AvField id="shopping-order-ordered" data-cy="ordered" type="date" className="form-control" name="ordered" />
              </AvGroup>
              <AvGroup>
                <Label for="shopping-order-buyer">
                  <Translate contentKey="mySimpleShopApp.shoppingOrder.buyer">Buyer</Translate>
                </Label>
                <AvInput id="shopping-order-buyer" data-cy="buyer" type="select" className="form-control" name="buyerId" required>
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
              <Button tag={Link} id="cancel-save" to="/shopping-order" replace color="info">
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
  shipments: storeState.shipment.entities,
  shoppingOrderEntity: storeState.shoppingOrder.entity,
  loading: storeState.shoppingOrder.loading,
  updating: storeState.shoppingOrder.updating,
  updateSuccess: storeState.shoppingOrder.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getShipments,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingOrderUpdate);
