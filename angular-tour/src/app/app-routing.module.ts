import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { ShellComponent } from './home/shell/shell.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'products',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
