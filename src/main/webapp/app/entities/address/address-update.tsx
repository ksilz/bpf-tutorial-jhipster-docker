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
import { getEntity, updateEntity, createEntity, reset } from './address.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAddressUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AddressUpdate = (props: IAddressUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { addressEntity, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/address');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...addressEntity,
        ...values,
        user: users.find(it => it.id.toString() === values.userId.toString()),
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
          <h2 id="mySimpleShopApp.address.home.createOrEditLabel" data-cy="AddressCreateUpdateHeading">
            <Translate contentKey="mySimpleShopApp.address.home.createOrEditLabel">Create or edit a Address</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : addressEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="address-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="address-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="addressLine1Label" for="address-addressLine1">
                  <Translate contentKey="mySimpleShopApp.address.addressLine1">Address Line 1</Translate>
                </Label>
                <AvField
                  id="address-addressLine1"
                  data-cy="addressLine1"
                  type="text"
                  name="addressLine1"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                    maxLength: { value: 80, errorMessage: translate('entity.validation.maxlength', { max: 80 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine2Label" for="address-addressLine2">
                  <Translate contentKey="mySimpleShopApp.address.addressLine2">Address Line 2</Translate>
                </Label>
                <AvField
                  id="address-addressLine2"
                  data-cy="addressLine2"
                  type="text"
                  name="addressLine2"
                  validate={{
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                    maxLength: { value: 80, errorMessage: translate('entity.validation.maxlength', { max: 80 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="address-city">
                  <Translate contentKey="mySimpleShopApp.address.city">City</Translate>
                </Label>
                <AvField
                  id="address-city"
                  data-cy="city"
                  type="text"
                  name="city"
                  validate={{
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                    maxLength: { value: 80, errorMessage: translate('entity.validation.maxlength', { max: 80 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="address-postalCode">
                  <Translate contentKey="mySimpleShopApp.address.postalCode">Postal Code</Translate>
                </Label>
                <AvField
                  id="address-postalCode"
                  data-cy="postalCode"
                  type="text"
                  name="postalCode"
                  validate={{
                    minLength: { value: 5, errorMessage: translate('entity.validation.minlength', { min: 5 }) },
                    maxLength: { value: 5, errorMessage: translate('entity.validation.maxlength', { max: 5 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="address-user">
                  <Translate contentKey="mySimpleShopApp.address.user">User</Translate>
                </Label>
                <AvInput id="address-user" data-cy="user" type="select" className="form-control" name="userId" required>
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
              <Button tag={Link} id="cancel-save" to="/address" replace color="info">
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
  addressEntity: storeState.address.entity,
  loading: storeState.address.loading,
  updating: storeState.address.updating,
  updateSuccess: storeState.address.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressUpdate);
