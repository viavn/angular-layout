import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";

import * as AppState from "../../state/app.state"
import * as ProductActions from "./product.actions"

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product | null;
  products: Product[];
  error: string;
}

const initialState: Readonly<ProductState> = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: '',
};

const getProductFeatureState = createFeatureSelector<Readonly<ProductState>>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
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
  on(ProductActions.setCurrentProduct, (state, { product }) => {
    return {
      ...state,
      currentProduct: product
    }
  }),
  on(ProductActions.clearCurrentProduct, state => {
    return {
      ...state,
      currentProduct: null
    }
  }),
  on(ProductActions.initializeCurrentProduct, state => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
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
  })
);
