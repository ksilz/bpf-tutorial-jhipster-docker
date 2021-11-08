import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Product = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const productList = useAppSelector(state => state.product.entities);
  const loading = useAppSelector(state => state.product.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="product-heading" data-cy="ProductHeading">
        <Translate contentKey="mySimpleShopApp.product.home.title">Products</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="mySimpleShopApp.product.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="mySimpleShopApp.product.home.createLabel">Create new Product</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {productList && productList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="mySimpleShopApp.product.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.product.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.product.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.product.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.product.picture">Picture</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.product.specification">Specification</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.product.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.product.inventory">Inventory</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productList.map((product, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${product.id}`} color="link" size="sm">
                      {product.id}
                    </Button>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    {product.picture ? (
                      <div>
                        {product.pictureContentType ? (
                          <a onClick={openFile(product.pictureContentType, product.picture)}>
                            <img src={`data:${product.pictureContentType};base64,${product.picture}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {product.pictureContentType}, {byteSize(product.picture)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {product.specification ? (
                      <div>
                        {product.specificationContentType ? (
                          <a onClick={openFile(product.specificationContentType, product.specification)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {product.specificationContentType}, {byteSize(product.specification)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <Translate contentKey={`mySimpleShopApp.ProductCategory.${product.category}`} />
                  </td>
                  <td>{product.inventory}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${product.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${product.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${product.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="mySimpleShopApp.product.home.notFound">No Products found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Product;
