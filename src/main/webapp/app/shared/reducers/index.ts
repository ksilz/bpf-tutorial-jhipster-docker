import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from 'app/modules/administration/user-management/user-management.reducer';
import register from 'app/modules/account/register/register.reducer';
import activate from 'app/modules/account/activate/activate.reducer';
import password from 'app/modules/account/password/password.reducer';
import settings from 'app/modules/account/settings/settings.reducer';
import passwordReset from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import product from 'app/entities/product/product.reducer';
// prettier-ignore
import address from 'app/entities/address/address.reducer';
// prettier-ignore
import shoppingOrder from 'app/entities/shopping-order/shopping-order.reducer';
// prettier-ignore
import productOrder from 'app/entities/product-order/product-order.reducer';
// prettier-ignore
import shipment from 'app/entities/shipment/shipment.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  product,
  address,
  shoppingOrder,
  productOrder,
  shipment,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
};

export default rootReducer;
