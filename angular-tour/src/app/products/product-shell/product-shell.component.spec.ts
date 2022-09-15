import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Product } from '../product';
import { ProductListComponent } from '../product-list/product-list.component';
import * as fromProduct from '../state';
import { ProductPageActions } from '../state/actions';
import { ProductShellComponent } from './product-shell.component';

describe('User Greeting Component', () => {
  let fixture: ComponentFixture<ProductShellComponent>;
  let component: ProductShellComponent;
  let mockStore: MockStore<fromProduct.State>;

  const initialState: fromProduct.State = {
    products: {
      showProductCode: true,
      currentProductId: null,
      products: [],
      error: '',
    },
    user: {
      currentUser: null,
      maskUserName: false
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [ProductShellComponent, ProductListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductShellComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(mockStore, 'dispatch').and.callFake(() => { });
  }));

  describe('checkChanged', () => {
    it('should dispatch toggleProductCode action', () => {
      component.checkChanged();
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        ProductPageActions.toggleProductCode()
      );
    });
  });

  describe('selectors', () => {
    let mockGetProductsSelector: MemoizedSelector<fromProduct.State, Product[]>;

    beforeEach(() => {
      mockGetProductsSelector = mockStore.overrideSelector(fromProduct.getProducts, [{
        description: 'description',
        id: 1,
        productCode: 'productCode',
        productName: 'productName',
        starRating: 4,
      }]);
      mockStore.refreshState();
      fixture.detectChanges();
    });

    it('should render all products', () => {
      expect(fixture.debugElement.queryAll(By.css('button.list-group-item.list-group-item-action.rounded-0')).length).toBe(1);
    });

    it('should update the UI when the selector changes', () => {
      mockGetProductsSelector.setResult([
        {
          description: 'description1',
          id: 1,
          productCode: 'productCode1',
          productName: 'productName1',
          starRating: 1,
        },
        {
          description: 'description2',
          id: 2,
          productCode: 'productCode2',
          productName: 'productName2',
          starRating: 2,
        }
      ]);
      mockStore.refreshState();
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('button.list-group-item.list-group-item-action.rounded-0')).length).toBe(2);
    });
  });
});
