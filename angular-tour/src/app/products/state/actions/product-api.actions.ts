import { createAction, props } from "@ngrx/store";
import { Asset, Order, Product } from "../../product";

export const loadProductsSuccess = createAction(
  '[Product API] Loaded Success',
  props<{ products: ReadonlyArray<Product> }>()
);

export const loadProductsFailure = createAction('[Product API] Load Fail',
  props<{ error: Readonly<string> }>());

export const createProductSuccess = createAction(
  '[Product API] Create Product Success',
  props<{ product: Readonly<Product> }>()
);

export const createProductFailure = createAction(
  '[Product API] Create Product Fail',
  props<{ error: Readonly<string> }>()
);

export const updateProductSuccess = createAction(
  '[Product API] Update Product Success',
  props<{ product: Readonly<Product> }>()
);

export const updateProductFailure = createAction(
  '[Product API] Update Product Fail',
  props<{ error: Readonly<string> }>()
);

export const deleteProductSuccess = createAction(
  '[Product API] Delete Product Success',
  props<{ productId: Readonly<number> }>()
);

export const deleteProductFailure = createAction(
  '[Product API] Delete Product Fail',
  props<{ error: Readonly<string> }>()
);

export const loadAssetsSuccess = createAction(
  '[Product API] Load Assets Success',
  props<{ assets: ReadonlyArray<Asset> }>()
);

export const loadOrdersSuccess = createAction(
  '[Product API] Load Orders Success',
  props<{ orders: ReadonlyArray<Order> }>()
);
