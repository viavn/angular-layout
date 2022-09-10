import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from "rxjs";
import { ProductService } from "../product.service";
import { ProductApiActions, ProductPageActions } from "./actions";

@Injectable()
export class ProductEffects {

  loadProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductPageActions.loadProducts),
    mergeMap(() => this.productService.getProducts().pipe(
      map(products => ProductApiActions.loadProductsSuccess({ products })),
      catchError(error => of(ProductApiActions.loadProductsFailure({ error })))
    ))
  ));

  createProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductPageActions.createProduct),
    concatMap(action =>
      this.productService.createProduct(action.product).pipe(
        map(product => ProductApiActions.createProductSuccess({ product })),
        catchError(error => of(ProductApiActions.createProductFailure({ error })))
      )
    )
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductPageActions.updateProduct),
    concatMap(action =>
      this.productService.updateProduct(action.product).pipe(
        map(product => ProductApiActions.updateProductSuccess({ product })),
        catchError(error => of(ProductApiActions.updateProductFailure({ error })))
      )
    )
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductPageActions.deleteProduct),
    concatMap(action =>
      this.productService.deleteProduct(action.productId).pipe(
        map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
        catchError(error => of(ProductApiActions.deleteProductFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) { }
}
