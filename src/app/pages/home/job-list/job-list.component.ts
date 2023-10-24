import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faLocationDot,faList, faTableCellsLarge, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faBuilding, faCopyright } from '@fortawesome/free-regular-svg-icons';
import{faSuitcase} from '@fortawesome/free-solid-svg-icons';
import { JobService } from 'src/app/services/jobs/job.service';
import { Job, JobType, Sector } from 'src/app/services/user/model/Job';
import { SharedService } from 'src/app/services/shared/shared.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/services/user/model/Product';
import { Brand } from 'src/app/services/user/model/Brand';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  fallback =
  'data:image/png;base64,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';

  myLocationIcon=faLocationDot;
  myJob=faSuitcase;
  listIcon=faList;
  gridIcon=faTableCellsLarge;
  myBuildingIcon=faCopyright;
  jobLevelIcon=faUserTie;
  
  //active btn
  isGridActive:boolean=true;

  constructor(private jobService:JobService , private sharedService:SharedService ,private route: ActivatedRoute, private fb:FormBuilder, private productService:ProductService) { }

  jobs:Product[]=[];
  numJobs!:number;

  searchResults!:Product[];
  hasSearchResults!:boolean;

  /*serach */
  searchForm!:FormGroup;

  jobSector = Object.values(Sector);
  jobType=Object.values(JobType);


  selectedJobTypeValue: any=null;
  selectedJobLevelValue: any=null;
  selectedExperienceValue: any=null;

  checkSearch!:boolean;

  brands:Brand[]=[];
  ngOnInit(): void {

    this.searchForm = this.fb.group({
      selectedJobType: new FormControl(''),
      selectedJobLevel:new FormControl(''),
      experience: new FormControl('null')
    });

    this.route.queryParams.subscribe((queryParams)=>{
      if(queryParams['fromHome'] === 'true'){
        this.searchResults = this.sharedService.getSearchResults();
        console.log('search reasult intially', this.searchResults);
    
        this.hasSearchResults = this.sharedService.getHasSearchResults();
        console.log('has search result ', this.hasSearchResults);
        console.log('checkSearch intially', this.checkSearch);

        if (this.searchResults.length > 0) {
          console.log(this.searchResults, 'getting the result from the search: LIST');
          this.checkSearch=true;
          this.totalItemsSearch=this.searchResults.length; 
        }
      }
    });


    //from brands 

    this.route.queryParams.subscribe((queryParams)=>{
      if(queryParams['fromBrands'] === 'true'){
        this.searchResults = this.sharedService.getSearchResults();
        console.log('search reasult intially', this.searchResults);
    
        this.hasSearchResults = this.sharedService.getHasSearchResults();
        console.log('has search result ', this.hasSearchResults);
        console.log('checkSearch intially', this.checkSearch);

        if (this.searchResults.length > 0) {
          console.log(this.searchResults, 'getting the result from the search: LIST');
          this.checkSearch=true;
          this.totalItemsSearch=this.searchResults.length; 
        }
      }
    });

    //end from brands
   
   
    
    this.productService.getProducts().subscribe((response) => {
      console.log('products', response);
      this.jobs = response as Product[];
      this.numJobs = this.jobs.length;
      this.totalItems = this.jobs.length;
      
      //this.totalItemsSearch=this.jobs.length;

     
    });


    this.productService.getBrands().subscribe((response)=>{
      this.brands=response as Brand[];
    });
    

   

    

    /*search */



    this.searchForm.get('selectedJobType')?.valueChanges.subscribe((value) => {
      this.selectedJobTypeValue = value;
      console.log('selected category', this.selectedJobTypeValue);
      this.searchJob();
    });


    this.searchForm.get('selectedJobLevel')?.valueChanges.subscribe((value) => {
      this.selectedJobLevelValue = value;
      console.log('selected brand', this.selectedJobLevelValue);
      this.searchJob();
    });

    this.searchForm.get('experience')?.valueChanges.subscribe((value) => {
      this.selectedExperienceValue = value;
      console.log('selected experience', this.selectedExperienceValue);
      this.searchJob();
    });


    /*end search*/

  }

  //formatting the date
  formatDate(created_at: string): string {
    const timestamp = new Date(created_at);
    const now = new Date();
    const elapsed = now.getTime() - timestamp.getTime();
  
    if (elapsed < 60000) {
      return 'Just now';
    } else if (elapsed < 3600000) {
      const minutes = Math.floor(elapsed / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (elapsed < 86400000) {
      const hours = Math.floor(elapsed / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const dateFormatter = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const [{ value: day },,{ value: month },,{ value: year }] = dateFormatter.formatToParts(timestamp);
      return `${day}-${month}-${year}`;
    }
  }

  //pagination
  currentPage = 1; // Initialize to the first page
  itemsPerPage = 6; // Number of items to display per page
  totalItems!:number; // Total number of items (adjust as needed)

  changePage(page: number) {
    this.currentPage = page;
  }

  get startIndex() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex() {
    return this.currentPage * this.itemsPerPage;
  }

  //pagination search 
  currentPageSearch = 1; // Initialize to the first page
  itemsPerPageSearch = 6; // Number of items to display per page
  totalItemsSearch!:number; // Total number of items (adjust as needed)

  changePageSearch(page: number) {
    this.currentPageSearch = page;
  }

  get startIndexSearch() {
    return (this.currentPageSearch - 1) * this.itemsPerPageSearch;
  }

  get endIndexSearch() {
    return this.currentPageSearch * this.itemsPerPageSearch;
  }

  //pagination search bar 
  currentPageSearchBar = 1; // Initialize to the first page
  itemsPerPageSearchBar = 6; // Number of items to display per page
  totalItemsSearchBar!:number; // Total number of items (adjust as needed)
 
  changePageSearchBar(page: number) {
    this.currentPageSearchBar = page;
  }
 
  get startIndexSearchBar() {
    return (this.currentPageSearchBar - 1) * this. itemsPerPageSearchBar;
  }
 
  get endIndexSearchBar() {
    return this.currentPageSearchBar * this. itemsPerPageSearchBar;
  }


  
  findBrand(id:number){
    this.productService.getBrandById(id).subscribe((response)=>{
      var brand!:Brand;
      brand=response as Brand;

      return brand.photo;
    });
  }



  //price range 

 rangeValue = [20, 50];

  onChange(value: number): void {
    console.log(`onChange: ${value}`);
  }

  onAfterChange(value: number[] | number): void {
    console.log(`onAfterChange: ${value}`);
  }






   

/*search*/


  searchBarResults!:Product[];
  private searchJob(){
    console.log("starting sreachJob");
    
      console.log('calling the API');
      this.productService.search(undefined,undefined,this.selectedJobLevelValue,undefined,undefined).subscribe((response)=>{
        console.log("search jobs from search side bar", response);
        this.searchBarResults=response;
        this.totalItemsSearchBar=this.searchBarResults.length;
      },
      (error:HttpErrorResponse)=>{
        if(error.status===302){
          console.log('error test ', error.error);  

        }
    });
    
  }

 
  

  jobTypeSearch(value: string[]): void {
    console.log('checked values',value);
  }

  experienceSearch(value: string[]){
    console.log('checked values experience',value);

  }


/*search end*/








}
