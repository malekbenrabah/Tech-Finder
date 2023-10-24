import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCommenting,faCopyright } from '@fortawesome/free-regular-svg-icons';
import {  faLocationDot, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs';
import { JobService } from 'src/app/services/jobs/job.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Job } from 'src/app/services/user/model/Job';
import { Product } from 'src/app/services/user/model/Product';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  myLocationIcon:IconDefinition=faCopyright;

  validateForm!: FormGroup;

  filteredOptions: string[] = [];
 
  constructor(private fb: FormBuilder, private productService:ProductService ,private jobService:JobService, private sharedService:SharedService, private router:Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null],
      location: [null]  
    });
  }

  searchResult:Product[]=[];
  searchJob(){
    console.log('search', this.validateForm.value);
    this.productService.search(this.validateForm.value['title'],undefined,this.validateForm.value['location'],undefined,undefined)
    .pipe(
      tap((response) => {
        console.log('search response', response);
        // emitting the results into the shared service
        this.sharedService.setSearchResults(response);
        // setting the search results in the search component as well
        this.searchResult = response;
      })
    )
    .subscribe((response)=>{
      console.log("search response", response);
      //emit the results into the shared service
      //this.sharedService.setSearchResults(this.searchResult);

      /*old */
      //this.router.navigateByUrl('/job-list');
      this.router.navigate(['/job-list'], { queryParams: { fromHome: 'true' } });

      //this.router.navigate(['/job-list'], { queryParams: { searchResults: true } });

    });
  
  }

  //screen size:
   isSmallScreen = false;
 
   @HostListener('window:resize', ['$event'])
   onResize(event: any): void {
     this.checkScreenSize();
   }
 
   //check screen size
   checkScreenSize(): void {
     this.isSmallScreen = window.innerWidth <= 768;
   }

}
