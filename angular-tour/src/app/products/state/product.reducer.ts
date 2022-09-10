import { createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import { ProductApiActions, ProductPageActions } from "./actions"

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
  on(ProductPageActions.toggleProductCode, state => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductPageActions.setCurrentProduct, (state, { currentProductId }) => {
    return {
      ...state,
      currentProductId
    }
  }),
  on(ProductPageActions.clearCurrentProduct, state => {
    return {
      ...state,
      currentProductId: null
    }
  }),
  on(ProductPageActions.initializeCurrentProduct, state => {
    return {
      ...state,
      currentProductId: 0
    }
  }),
  on(ProductApiActions.loadProductsSuccess, (state, { products }) => {
    return {
      ...state,
      // products
      products: [...products],
      error: ''
    }
  }),
  on(ProductApiActions.loadProductsFailure, (state, { error }) => {
    return {
      ...state,
      products: [],
      error: error
    }
  }),
  on(ProductApiActions.createProductSuccess, (state, { product }) => {
    return {
      ...state,
      products: [...state.products, product],
      currentProductId: product.id,
      error: ''
    }
  }),
  on(ProductApiActions.createProductFailure, (state, { error }) => {
    return {
      ...state,
      error
    }
  }),
  on(ProductApiActions.updateProductSuccess, (state, { product }) => {
    const updatedProducts = state.products.map(
      item => item.id === product.id ? product : item);
    return {
      ...state,
      products: updatedProducts,
      currentProductId: product.id,
      error: ''
    }
  }),
  on(ProductApiActions.updateProductFailure, (state, { error }) => {
    return {
      ...state,
      error
    }
  }),
  on(ProductApiActions.deleteProductSuccess, (state, { productId }) => {
    const notDeletedProducts = state.products.filter(p => p.id !== productId);
    return {
      ...state,
      products: notDeletedProducts,
      currentProductId: null,
      error: ''
    }
  }),
  on(ProductApiActions.deleteProductFailure, (state, { error }) => {
    return {
      ...state,
      error
    }
  }),
);
