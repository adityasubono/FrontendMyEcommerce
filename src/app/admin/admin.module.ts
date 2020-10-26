import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { AsidebarComponent } from './asidebar/asidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminComponent, ProductsComponent, SidebarComponent, TopbarComponent, FooterComponent, AsidebarComponent],
  exports: [
    TopbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AdminModule { }
