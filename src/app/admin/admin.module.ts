import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { JobsComponent } from './jobs/jobs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CompaniesComponent } from './companies/companies.component';
import { UsersComponent } from './users/users.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import{ FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountComponent } from './account/account.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ProductsComponent } from './products/products.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BrandsComponent } from './brands/brands.component';

@NgModule({
  declarations: [
    AdminComponent,
    JobsComponent,
    DashboardComponent,
    CompaniesComponent,
    UsersComponent,
    AccountComponent,
    ProductsComponent,
    BrandsComponent
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzResultModule,
    NzButtonModule,
    NzDropDownModule,
    NzAvatarModule,
    IconsProviderModule,
    NzIconModule,
    NzGridModule,
    FontAwesomeModule,
    NzAlertModule,
    NzFormModule,
    ReactiveFormsModule,
    NzModalModule,
    NzCardModule,
    NzTabsModule,
    NzInputModule,
    NzTableModule,
    NzDividerModule,
    NzToolTipModule,
    NzDescriptionsModule,
    NzDatePickerModule,
    NzTagModule,
    NzListModule,
    NzDrawerModule,
    NzStepsModule,
    NzUploadModule,
    NzSelectModule
   
  ]
})
export class AdminModule { }
