import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './shopping-order.reducer';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IShoppingOrderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ShoppingOrder = (props: IShoppingOrderProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { shoppingOrderList, match, loading } = props;
  return (
    <div>
      <h2 id="shopping-order-heading" data-cy="ShoppingOrderHeading">
        <Translate contentKey="mySimpleShopApp.shoppingOrder.home.title">Shopping Orders</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="mySimpleShopApp.shoppingOrder.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="mySimpleShopApp.shoppingOrder.home.createLabel">Create new Shopping Order</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {shoppingOrderList && shoppingOrderList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="mySimpleShopApp.shoppingOrder.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.shoppingOrder.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.shoppingOrder.totalAmount">Total Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.shoppingOrder.ordered">Ordered</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.shoppingOrder.buyer">Buyer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shoppingOrderList.map((shoppingOrder, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${shoppingOrder.id}`} color="link" size="sm">
                      {shoppingOrder.id}
                    </Button>
                  </td>
                  <td>{shoppingOrder.name}</td>
                  <td>{shoppingOrder.totalAmount}</td>
                  <td>
                    {shoppingOrder.ordered ? <TextFormat type="date" value={shoppingOrder.ordered} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{shoppingOrder.buyer ? shoppingOrder.buyer.login : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${shoppingOrder.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${shoppingOrder.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${shoppingOrder.id}/delete`}
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
              <Translate contentKey="mySimpleShopApp.shoppingOrder.home.notFound">No Shopping Orders found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ shoppingOrder }: IRootState) => ({
  shoppingOrderList: shoppingOrder.entities,
  loading: shoppingOrder.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingOrder);
