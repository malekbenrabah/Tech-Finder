import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from 'src/app/services/guards/auth.guard';
import { JobListComponent } from './job-list/job-list.component';
import { JobGridComponent } from './job-grid/job-grid.component';
import { JobDetail2Component } from './job-detail2/job-detail2.component';
import { LoggedInGuard } from 'src/app/services/guards/loggedIn/logged-in.guard';
import { AdminGuard } from 'src/app/services/guards/admin/admin.guard';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { BrandsComponent } from './brands/brands.component';
import { JobList2Component } from './job-list2/job-list2.component';

const routes: Routes = [
   
  { path:'', component : LayoutComponent, children:[
    {path:'',component:HomeComponent},
    {path:"job-detail/:id",component:JobDetail2Component},
    {path:"job-list",component:JobListComponent},
    {path:"job-grid",component:JobGridComponent},
    {path:"companies",component:CompaniesComponent},
    {path:"brands",component:BrandsComponent},
    {path:"company-detail",component:CompanyDetailComponent},
    {path:"account" , loadChildren:()=>import("../account/account.module").then(module=>module.AccountModule)},

  ]},
  
  
  /*{path:'admin',loadChildren:()=>import("./../../admin/admin.module").then(module=>module.AdminModule),canActivate:[AdminGuard]},*/
  {path:'auth',loadChildren:()=>import("./../../auth/auth.module").then(module=>module.AuthModule)},

  /*{ path: '**', redirectTo: 'not-found' }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
