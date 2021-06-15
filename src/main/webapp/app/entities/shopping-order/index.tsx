import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ShoppingOrder from './shopping-order';
import ShoppingOrderDetail from './shopping-order-detail';
import ShoppingOrderUpdate from './shopping-order-update';
import ShoppingOrderDeleteDialog from './shopping-order-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ShoppingOrderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ShoppingOrderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ShoppingOrderDetail} />
      <ErrorBoundaryRoute path={match.url} component={ShoppingOrder} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ShoppingOrderDeleteDialog} />
  </>
);

export default Routes;
