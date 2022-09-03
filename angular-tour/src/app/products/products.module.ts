import { NgModule } from '@angular/core';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const productRoutes: Routes = [
  { path: '', component: ProductShellComponent },
];

@NgModule({
  declarations: [
    ProductEditComponent,
    ProductListComponent,
    ProductShellComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
  ]
})
export class ProductsModule { }
