import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Asset, Order, Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements AfterViewInit, OnChanges {
  @Input() assets: Asset[] | null = [];

  @ViewChild(MatSort) sort!: MatSort;

  pageTitle = 'Products';
  displayedColumns: string[] = ['id', 'name', 'code'];
  dataSource = new MatTableDataSource<Asset>([]);

  // @Input() errorMessage!: string | null;
  // @Input() products!: Product[] | null;
  // @Input() displayCode!: boolean | null;
  // @Input() selectedProduct!: Product | null;
  // @Output() displayCodeChanged = new EventEmitter<void>();
  // @Output() initializeNewProduct = new EventEmitter<void>();
  // @Output() productWasSelected = new EventEmitter<Product>();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges', changes);

    if (changes['assets']?.currentValue) {
      // console.log('ngOnChanges -> assets', this.assets);
      this.dataSource.data = this.assets ?? [];
      // this.dataSource = new MatTableDataSource<Asset>(this.assets ?? []);
      // this.dataSource.sort = this.sort;
    }
  }

  checkChanged(): void {
    // this.displayCodeChanged.emit();
  }

  newProduct(): void {
    // this.initializeNewProduct.emit();
  }

  productSelected(product: Product): void {
    // this.productWasSelected.emit(product);
  }
}
