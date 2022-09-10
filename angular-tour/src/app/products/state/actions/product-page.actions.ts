import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

export const toggleProductCode = createAction('[Product Page] Toggle Product Code');

export const setCurrentProduct = createAction(
  '[Product Page] Set Current Product',
  props<{ currentProductId: Readonly<number | null> }>()
);

export const clearCurrentProduct = createAction('[Product Page] Clear Current Product');

export const initializeCurrentProduct = createAction('[Product Page] Initialize Current Product');

export const loadProducts = createAction('[Product Page] Load');

export const createProduct = createAction(
  '[Product Page] Create Product',
  props<{ product: Readonly<Product> }>()
);

export const updateProduct = createAction(
  '[Product Page] Update Product',
  props<{ product: Readonly<Product> }>()
);

export const deleteProduct = createAction(
  '[Product Page] Delete Product',
  props<{ productId: Readonly<number> }>()
);


