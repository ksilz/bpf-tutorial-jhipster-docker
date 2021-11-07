import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './product.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProductDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const productEntity = useAppSelector(state => state.product.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productDetailsHeading">
          <Translate contentKey="mySimpleShopApp.product.detail.title">Product</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="mySimpleShopApp.product.name">Name</Translate>
            </span>
          </dt>
          <dd>{productEntity.name}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="mySimpleShopApp.product.price">Price</Translate>
            </span>
          </dt>
          <dd>{productEntity.price}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="mySimpleShopApp.product.description">Description</Translate>
            </span>
          </dt>
          <dd>{productEntity.description}</dd>
          <dt>
            <span id="picture">
              <Translate contentKey="mySimpleShopApp.product.picture">Picture</Translate>
            </span>
          </dt>
          <dd>
            {productEntity.picture ? (
              <div>
                {productEntity.pictureContentType ? (
                  <a onClick={openFile(productEntity.pictureContentType, productEntity.picture)}>
                    <img src={`data:${productEntity.pictureContentType};base64,${productEntity.picture}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {productEntity.pictureContentType}, {byteSize(productEntity.picture)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="specification">
              <Translate contentKey="mySimpleShopApp.product.specification">Specification</Translate>
            </span>
          </dt>
          <dd>
            {productEntity.specification ? (
              <div>
                {productEntity.specificationContentType ? (
                  <a onClick={openFile(productEntity.specificationContentType, productEntity.specification)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {productEntity.specificationContentType}, {byteSize(productEntity.specification)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="category">
              <Translate contentKey="mySimpleShopApp.product.category">Category</Translate>
            </span>
          </dt>
          <dd>{productEntity.category}</dd>
          <dt>
            <span id="inventory">
              <Translate contentKey="mySimpleShopApp.product.inventory">Inventory</Translate>
            </span>
          </dt>
          <dd>{productEntity.inventory}</dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductDetail;
