import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { getEntities as getShoppingOrders } from 'app/entities/shopping-order/shopping-order.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './shipment.reducer';
import { IShipment } from 'app/shared/model/shipment.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IShipmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ShipmentUpdate = (props: IShipmentUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { shipmentEntity, shoppingOrders, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/shipment');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getShoppingOrders();
    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...shipmentEntity,
        ...values,
        order: shoppingOrders.find(it => it.id.toString() === values.orderId.toString()),
        shippedBy: users.find(it => it.id.toString() === values.shippedById.toString()),
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
          <h2 id="mySimpleShopApp.shipment.home.createOrEditLabel" data-cy="ShipmentCreateUpdateHeading">
            <Translate contentKey="mySimpleShopApp.shipment.home.createOrEditLabel">Create or edit a Shipment</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : shipmentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="shipment-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="shipment-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="shippedAtLabel" for="shipment-shippedAt">
                  <Translate contentKey="mySimpleShopApp.shipment.shippedAt">Shipped At</Translate>
                </Label>
                <AvField
                  id="shipment-shippedAt"
                  data-cy="shippedAt"
                  type="date"
                  className="form-control"
                  name="shippedAt"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="shipment-order">
                  <Translate contentKey="mySimpleShopApp.shipment.order">Order</Translate>
                </Label>
                <AvInput id="shipment-order" data-cy="order" type="select" className="form-control" name="orderId" required>
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
              <AvGroup>
                <Label for="shipment-shippedBy">
                  <Translate contentKey="mySimpleShopApp.shipment.shippedBy">Shipped By</Translate>
                </Label>
                <AvInput id="shipment-shippedBy" data-cy="shippedBy" type="select" className="form-control" name="shippedById" required>
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
              <Button tag={Link} id="cancel-save" to="/shipment" replace color="info">
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
  shoppingOrders: storeState.shoppingOrder.entities,
  users: storeState.userManagement.users,
  shipmentEntity: storeState.shipment.entity,
  loading: storeState.shipment.loading,
  updating: storeState.shipment.updating,
  updateSuccess: storeState.shipment.updateSuccess,
});

const mapDispatchToProps = {
  getShoppingOrders,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentUpdate);
