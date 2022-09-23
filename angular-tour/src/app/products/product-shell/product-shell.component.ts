import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Asset, Product } from '../product';
import { getAssets, getCurrentProduct, getError, getOrders, getProducts, getShowProductCode, State } from '../state';
import { ProductPageActions } from '../state/actions';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-shell',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.scss']
})
export class ProductShellComponent implements OnInit {
  products$!: Observable<Product[]>;
  selectedProduct$!: Observable<Product | null>;
  displayCode$!: Observable<boolean>;
  errorMessage$!: Observable<string>;

  assets$: Observable<Asset[]> = this.store.select(getAssets);
  orders$ = this.store.select(getOrders);
  combineAssetsAndOrders$ = combineLatest([this.assets$, this.orders$]).pipe(
    map(([as, os]) => as.length > 0 && os.length > 0),
  );

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.store.dispatch(ProductPageActions.loadProducts());
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
  }

  clearProduct(): void {
    this.store.dispatch(ProductPageActions.clearCurrentProduct());
  }

  deleteProduct(product: Product): void {
    if (product.id) {
      this.store.dispatch(ProductPageActions.deleteProduct({ productId: product.id }));
    }
  }

  createProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.createProduct({ product }));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.updateProduct({ product }));
  }

  dispatchCombineLatestAction(): void {
    this.store.dispatch(ProductPageActions.clearAssetsAndOrders());
    this.store.dispatch(ProductPageActions.loadAssets());
    this.store.dispatch(ProductPageActions.loadOrders());
  }

  dispatchExhaustMapAction(): void {
    this.store.dispatch(ProductPageActions.loadAssets());
  }

  clear(): void {
    this.store.dispatch(ProductPageActions.clearAssetsAndOrders());
  }
}
