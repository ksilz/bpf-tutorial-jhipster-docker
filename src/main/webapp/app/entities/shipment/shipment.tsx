import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './shipment.reducer';
import { IShipment } from 'app/shared/model/shipment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Shipment = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const shipmentList = useAppSelector(state => state.shipment.entities);
  const loading = useAppSelector(state => state.shipment.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="shipment-heading" data-cy="ShipmentHeading">
        <Translate contentKey="mySimpleShopApp.shipment.home.title">Shipments</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="mySimpleShopApp.shipment.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="mySimpleShopApp.shipment.home.createLabel">Create new Shipment</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {shipmentList && shipmentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="mySimpleShopApp.shipment.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.shipment.shippedAt">Shipped At</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.shipment.order">Order</Translate>
                </th>
                <th>
                  <Translate contentKey="mySimpleShopApp.shipment.shippedBy">Shipped By</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shipmentList.map((shipment, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${shipment.id}`} color="link" size="sm">
                      {shipment.id}
                    </Button>
                  </td>
                  <td>
                    {shipment.shippedAt ? <TextFormat type="date" value={shipment.shippedAt} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{shipment.order ? <Link to={`shopping-order/${shipment.order.id}`}>{shipment.order.name}</Link> : ''}</td>
                  <td>{shipment.shippedBy ? shipment.shippedBy.login : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${shipment.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${shipment.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${shipment.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="mySimpleShopApp.shipment.home.notFound">No Shipments found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Shipment;
