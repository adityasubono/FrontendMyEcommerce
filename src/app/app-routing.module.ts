import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./default/default.module').then( m => m.DefaultModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)},
];

@NgModule({
  declarations: [],
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
