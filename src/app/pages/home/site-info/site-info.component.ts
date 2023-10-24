import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { User } from 'src/app/services/user/model/user';
import { NgIf } from '@angular/common';
import { JobService } from 'src/app/services/jobs/job.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/services/user/model/Product';

@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html',
  styleUrls: ['./site-info.component.css'],
})
export class SiteInfoComponent implements OnInit {


  constructor( private productService:ProductService) { }


  companies:User[]=[];
  nbMaxCompanies:number=100;
  nbCompanies:number=0;

  nbMaxUsers:number=100;
  nbUsers:number=0;

  nbMaxJobs:number=100;
  nbJobs:number=0;
  products:Product[]=[];
  ngOnInit(): void {
   this.productService.getProducts().subscribe(response=>{
    this.products=response as Product[];
    this.nbMaxJobs=this.products.length;
   });
  }


  nbCompaniesStop:any=setInterval(()=>{
   
    //stop
    if(this.nbCompanies==this.nbMaxCompanies){
      clearInterval(this.nbCompaniesStop)
    }else{
      this.nbCompanies++;
    }
  },20);

  nbUsersStop:any=setInterval(()=>{
    if(this.nbUsers==this.nbMaxUsers){
      clearInterval(this.nbUsersStop)
    }else{
      this.nbUsers++;
    }
     
  },20); //100ms


  nbJobsStop:any=setInterval(()=>{
    if(this.nbJobs==this.nbMaxJobs){
      clearInterval(this.nbJobsStop)
    }else{
      this.nbJobs++;
    }
     
  },20); //100ms


}
