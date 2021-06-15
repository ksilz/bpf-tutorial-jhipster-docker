import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Product from './product';
import Address from './address';
import ShoppingOrder from './shopping-order';
import ProductOrder from './product-order';
import Shipment from './shipment';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}address`} component={Address} />
      <ErrorBoundaryRoute path={`${match.url}shopping-order`} component={ShoppingOrder} />
      <ErrorBoundaryRoute path={`${match.url}product-order`} component={ProductOrder} />
      <ErrorBoundaryRoute path={`${match.url}shipment`} component={Shipment} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
