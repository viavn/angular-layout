import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";

import * as AppState from "../../state/app.state"
import * as ProductActions from "./product.actions"

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: Readonly<ProductState> = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
};

const getProductFeatureState = createFeatureSelector<Readonly<ProductState>>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    } else {
      if (currentProductId) {
        const product = state.products.find(p => p.id === currentProductId);
        return product ? product : null;
      }
      return null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProductCode, state => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductActions.setCurrentProduct, (state, { currentProductId }) => {
    return {
      ...state,
      currentProductId
    }
  }),
  on(ProductActions.clearCurrentProduct, state => {
    return {
      ...state,
      currentProductId: null
    }
  }),
  on(ProductActions.initializeCurrentProduct, state => {
    return {
      ...state,
      currentProductId: 0
    }
  }),
  on(ProductActions.loadProductsSuccess, (state, { products }) => {
    return {
      ...state,
      // products
      products: [...products],
      error: ''
    }
  }),
  on(ProductActions.loadProductsFailure, (state, { error }) => {
    return {
      ...state,
      products: [],
      error: error
    }
  }),
  on(ProductActions.updateProductSuccess, (state, { product }) => {
    const updatedProducts = state.products.map(
      item => item.id === product.id ? product : item);
    return {
      ...state,
      products: updatedProducts,
      currentProductId: product.id,
      error: ''
    }
  }),
  on(ProductActions.updateProductFailure, (state, { error }) => {
    return {
      ...state,
      error
    }
  }),
);
