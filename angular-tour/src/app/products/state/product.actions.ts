import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode = createAction('[Product] Toggle Product Code');

export const setCurrentProduct = createAction('[Product] Set Current Product',
  props<{ product: Readonly<Product> }>());

export const clearCurrentProduct = createAction('[Product] Clear Current Product');

export const initializeCurrentProduct = createAction('[Product] Initialize Current Product');

export const loadProducts = createAction('[Product] Load');

export const loadProductsSuccess = createAction('[Product] Loaded Success',
  props<{ products: ReadonlyArray<Product> }>());

export const loadProductsFailure = createAction('[Product] Load Fail',
  props<{ error: Readonly<string> }>());
