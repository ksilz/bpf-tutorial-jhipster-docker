import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './product-order.reducer';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductOrderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ProductOrder = (props: IProductOrderProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { productOrderList, match, loading } = props;
  return (
    <div>
      <h2 id="product-order-heading" data-cy="ProductOrderHeading">
        <Translate contentKey="mySimpleShopApp.productOrder.home.title">Product Orders</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="mySimpleShopApp.productOrder.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="mySimpleShopApp.productOrder.home.createLabel">Create new Product Order</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {productOrderList && productOrderList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="mySimpleShopApp.productOrder.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.productOrder.amount">Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.productOrder.buyer">Buyer</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.productOrder.product">Product</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.productOrder.overallOrder">Overall Order</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productOrderList.map((productOrder, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${productOrder.id}`} color="link" size="sm">
                      {productOrder.id}
                    </Button>
                  </td>
                  <td>{productOrder.amount}</td>
                  <td>{productOrder.buyer ? productOrder.buyer.login : ''}</td>
                  <td>{productOrder.product ? <Link to={`product/${productOrder.product.id}`}>{productOrder.product.name}</Link> : ''}</td>
                  <td>
                    {productOrder.overallOrder ? (
                      <Link to={`shopping-order/${productOrder.overallOrder.id}`}>{productOrder.overallOrder.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${productOrder.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productOrder.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${productOrder.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
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
              <Translate contentKey="mySimpleShopApp.productOrder.home.notFound">No Product Orders found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ productOrder }: IRootState) => ({
  productOrderList: productOrder.entities,
  loading: productOrder.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrder);
