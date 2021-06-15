import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IShoppingOrder, defaultValue } from 'app/shared/model/shopping-order.model';

export const ACTION_TYPES = {
  FETCH_SHOPPINGORDER_LIST: 'shoppingOrder/FETCH_SHOPPINGORDER_LIST',
  FETCH_SHOPPINGORDER: 'shoppingOrder/FETCH_SHOPPINGORDER',
  CREATE_SHOPPINGORDER: 'shoppingOrder/CREATE_SHOPPINGORDER',
  UPDATE_SHOPPINGORDER: 'shoppingOrder/UPDATE_SHOPPINGORDER',
  PARTIAL_UPDATE_SHOPPINGORDER: 'shoppingOrder/PARTIAL_UPDATE_SHOPPINGORDER',
  DELETE_SHOPPINGORDER: 'shoppingOrder/DELETE_SHOPPINGORDER',
  RESET: 'shoppingOrder/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IShoppingOrder>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ShoppingOrderState = Readonly<typeof initialState>;

// Reducer

export default (state: ShoppingOrderState = initialState, action): ShoppingOrderState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SHOPPINGORDER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SHOPPINGORDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SHOPPINGORDER):
    case REQUEST(ACTION_TYPES.UPDATE_SHOPPINGORDER):
    case REQUEST(ACTION_TYPES.DELETE_SHOPPINGORDER):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_SHOPPINGORDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SHOPPINGORDER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SHOPPINGORDER):
    case FAILURE(ACTION_TYPES.CREATE_SHOPPINGORDER):
    case FAILURE(ACTION_TYPES.UPDATE_SHOPPINGORDER):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_SHOPPINGORDER):
    case FAILURE(ACTION_TYPES.DELETE_SHOPPINGORDER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHOPPINGORDER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHOPPINGORDER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SHOPPINGORDER):
    case SUCCESS(ACTION_TYPES.UPDATE_SHOPPINGORDER):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_SHOPPINGORDER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SHOPPINGORDER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/shopping-orders';

// Actions

export const getEntities: ICrudGetAllAction<IShoppingOrder> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SHOPPINGORDER_LIST,
  payload: axios.get<IShoppingOrder>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IShoppingOrder> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SHOPPINGORDER,
    payload: axios.get<IShoppingOrder>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IShoppingOrder> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SHOPPINGORDER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IShoppingOrder> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SHOPPINGORDER,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IShoppingOrder> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_SHOPPINGORDER,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IShoppingOrder> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SHOPPINGORDER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
