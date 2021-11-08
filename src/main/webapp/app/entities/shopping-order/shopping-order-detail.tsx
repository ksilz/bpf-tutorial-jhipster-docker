import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './shopping-order.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ShoppingOrderDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const shoppingOrderEntity = useAppSelector(state => state.shoppingOrder.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="shoppingOrderDetailsHeading">
          <Translate contentKey="mySimpleShopApp.shoppingOrder.detail.title">ShoppingOrder</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{shoppingOrderEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="mySimpleShopApp.shoppingOrder.name">Name</Translate>
            </span>
          </dt>
          <dd>{shoppingOrderEntity.name}</dd>
          <dt>
            <span id="totalAmount">
              <Translate contentKey="mySimpleShopApp.shoppingOrder.totalAmount">Total Amount</Translate>
            </span>
          </dt>
          <dd>{shoppingOrderEntity.totalAmount}</dd>
          <dt>
            <span id="ordered">
              <Translate contentKey="mySimpleShopApp.shoppingOrder.ordered">Ordered</Translate>
            </span>
          </dt>
          <dd>
            {shoppingOrderEntity.ordered ? (
              <TextFormat value={shoppingOrderEntity.ordered} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="mySimpleShopApp.shoppingOrder.buyer">Buyer</Translate>
          </dt>
          <dd>{shoppingOrderEntity.buyer ? shoppingOrderEntity.buyer.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/shopping-order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/shopping-order/${shoppingOrderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ShoppingOrderDetail;
