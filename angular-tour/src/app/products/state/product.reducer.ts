import { createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import * as ProductActions from "./product.actions"

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
  on(ProductActions.createProductSuccess, (state, { product }) => {
    return {
      ...state,
      products: [...state.products, product],
      currentProductId: product.id,
      error: ''
    }
  }),
  on(ProductActions.createProductFailure, (state, { error }) => {
    return {
      ...state,
      error
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
  on(ProductActions.deleteProductSuccess, (state, { productId }) => {
    const notDeletedProducts = state.products.filter(p => p.id !== productId);
    return {
      ...state,
      products: notDeletedProducts,
      currentProductId: null,
      error: ''
    }
  }),
  on(ProductActions.deleteProductFailure, (state, { error }) => {
    return {
      ...state,
      error
    }
  }),
);
