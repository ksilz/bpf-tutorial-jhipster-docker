import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IShipment } from 'app/shared/model/shipment.model';
import { getEntities as getShipments } from 'app/entities/shipment/shipment.reducer';
import { getEntity, updateEntity, createEntity, reset } from './shopping-order.reducer';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ShoppingOrderUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const users = useAppSelector(state => state.userManagement.users);
  const shipments = useAppSelector(state => state.shipment.entities);
  const shoppingOrderEntity = useAppSelector(state => state.shoppingOrder.entity);
  const loading = useAppSelector(state => state.shoppingOrder.loading);
  const updating = useAppSelector(state => state.shoppingOrder.updating);
  const updateSuccess = useAppSelector(state => state.shoppingOrder.updateSuccess);
  const handleClose = () => {
    props.history.push('/shopping-order');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getUsers({}));
    dispatch(getShipments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...shoppingOrderEntity,
      ...values,
      buyer: users.find(it => it.id.toString() === values.buyer.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...shoppingOrderEntity,
          buyer: shoppingOrderEntity?.buyer?.id,
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
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="shopping-order-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('mySimpleShopApp.shoppingOrder.name')}
                id="shopping-order-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                  maxLength: { value: 90, message: translate('entity.validation.maxlength', { max: 90 }) },
                }}
              />
              <ValidatedField
                label={translate('mySimpleShopApp.shoppingOrder.totalAmount')}
                id="shopping-order-totalAmount"
                name="totalAmount"
                data-cy="totalAmount"
                type="text"
                validate={{
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('mySimpleShopApp.shoppingOrder.ordered')}
                id="shopping-order-ordered"
                name="ordered"
                data-cy="ordered"
                type="date"
              />
              <ValidatedField
                id="shopping-order-buyer"
                name="buyer"
                data-cy="buyer"
                label={translate('mySimpleShopApp.shoppingOrder.buyer')}
                type="select"
                required
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/shopping-order" replace color="info">
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
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ShoppingOrderUpdate;
