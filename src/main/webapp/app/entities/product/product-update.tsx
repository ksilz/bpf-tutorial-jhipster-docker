import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { setFileData, openFile, byteSize, Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductUpdate = (props: IProductUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { productEntity, loading, updating } = props;

  const { description, picture, pictureContentType, specification, specificationContentType } = productEntity;

  const handleClose = () => {
    props.history.push('/product');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...productEntity,
        ...values,
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
          <h2 id="mySimpleShopApp.product.home.createOrEditLabel" data-cy="ProductCreateUpdateHeading">
            <Translate contentKey="mySimpleShopApp.product.home.createOrEditLabel">Create or edit a Product</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : productEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="product-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="product-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="product-name">
                  <Translate contentKey="mySimpleShopApp.product.name">Name</Translate>
                </Label>
                <AvField
                  id="product-name"
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
                <Label id="priceLabel" for="product-price">
                  <Translate contentKey="mySimpleShopApp.product.price">Price</Translate>
                </Label>
                <AvField
                  id="product-price"
                  data-cy="price"
                  type="string"
                  className="form-control"
                  name="price"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="product-description">
                  <Translate contentKey="mySimpleShopApp.product.description">Description</Translate>
                </Label>
                <AvInput
                  id="product-description"
                  data-cy="description"
                  type="textarea"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="pictureLabel" for="picture">
                    <Translate contentKey="mySimpleShopApp.product.picture">Picture</Translate>
                  </Label>
                  <br />
                  {picture ? (
                    <div>
                      {pictureContentType ? (
                        <a onClick={openFile(pictureContentType, picture)}>
                          <img src={`data:${pictureContentType};base64,${picture}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {pictureContentType}, {byteSize(picture)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('picture')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_picture" data-cy="picture" type="file" onChange={onBlobChange(true, 'picture')} accept="image/*" />
                  <AvInput
                    type="hidden"
                    name="picture"
                    value={picture}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="specificationLabel" for="specification">
                    <Translate contentKey="mySimpleShopApp.product.specification">Specification</Translate>
                  </Label>
                  <br />
                  {specification ? (
                    <div>
                      {specificationContentType ? (
                        <a onClick={openFile(specificationContentType, specification)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {specificationContentType}, {byteSize(specification)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('specification')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_specification" data-cy="specification" type="file" onChange={onBlobChange(false, 'specification')} />
                  <AvInput type="hidden" name="specification" value={specification} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="categoryLabel" for="product-category">
                  <Translate contentKey="mySimpleShopApp.product.category">Category</Translate>
                </Label>
                <AvInput
                  id="product-category"
                  data-cy="category"
                  type="select"
                  className="form-control"
                  name="category"
                  value={(!isNew && productEntity.category) || 'Laptop'}
                >
                  <option value="Laptop">{translate('mySimpleShopApp.ProductCategory.Laptop')}</option>
                  <option value="Desktop">{translate('mySimpleShopApp.ProductCategory.Desktop')}</option>
                  <option value="Phone">{translate('mySimpleShopApp.ProductCategory.Phone')}</option>
                  <option value="Tablet">{translate('mySimpleShopApp.ProductCategory.Tablet')}</option>
                  <option value="Accessory">{translate('mySimpleShopApp.ProductCategory.Accessory')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="inventoryLabel" for="product-inventory">
                  <Translate contentKey="mySimpleShopApp.product.inventory">Inventory</Translate>
                </Label>
                <AvField
                  id="product-inventory"
                  data-cy="inventory"
                  type="string"
                  className="form-control"
                  name="inventory"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/product" replace color="info">
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
  productEntity: storeState.product.entity,
  loading: storeState.product.loading,
  updating: storeState.product.updating,
  updateSuccess: storeState.product.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdate);
