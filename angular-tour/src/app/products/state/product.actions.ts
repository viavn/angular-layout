import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode = createAction('[Product] Toggle Product Code');

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ currentProductId: Readonly<number | null> }>()
);

export const clearCurrentProduct = createAction('[Product] Clear Current Product');

export const initializeCurrentProduct = createAction('[Product] Initialize Current Product');

export const loadProducts = createAction('[Product] Load');

export const loadProductsSuccess = createAction(
  '[Product] Loaded Success',
  props<{ products: ReadonlyArray<Product> }>()
);

export const loadProductsFailure = createAction('[Product] Load Fail',
  props<{ error: Readonly<string> }>());

export const createProduct = createAction(
  '[Product] Create Product',
  props<{ product: Readonly<Product> }>()
);

export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ product: Readonly<Product> }>()
);

export const createProductFailure = createAction(
  '[Product] Create Product Fail',
  props<{ error: Readonly<string> }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Readonly<Product> }>()
);

export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Readonly<Product> }>()
);

export const updateProductFailure = createAction(
  '[Product] Update Product Fail',
  props<{ error: Readonly<string> }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ productId: Readonly<number> }>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ productId: Readonly<number> }>()
);

export const deleteProductFailure = createAction(
  '[Product] Delete Product Fail',
  props<{ error: Readonly<string> }>()
);
