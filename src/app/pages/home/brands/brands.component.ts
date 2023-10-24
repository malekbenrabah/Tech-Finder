import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Brand } from 'src/app/services/user/model/Brand';
import { Product } from 'src/app/services/user/model/Product';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor(private productService:ProductService, private sharedService:SharedService, private router:Router) { }

  brands:Brand[]=[]
  ngOnInit(): void {
    this.productService.getBrands().subscribe((response)=>{
      this.brands=response as Brand[];
      this.totalItemsSearch=this.brands.length;
      this.serachBrands=this.brands;

    });

  }



  /*search companies*/
  search:string='';
  serachBrands:Brand[]=[];
  searchCompany(){
    if(this.brands.length===0 || this.search===''){
      this.serachBrands=this.brands;
      console.log('serachBrands', this.serachBrands);
      console.log('brands', this.brands);
    }else{
      
     console.log('search starts');
     console.log('brands', this.brands);
     console.log('search:',this.search);
     const searchText=this.search.toLocaleLowerCase();

      this.serachBrands = this.brands.filter((brand) => {
        const brandNameMatch = brand.name.toLowerCase().includes(searchText);
        

        return brandNameMatch  ;
      });

      this.totalItemsSearch=this.serachBrands.length;

      console.log('search companies filter', this.serachBrands);
    }
    
  }

  //pagination search 
  currentPageSearch = 1; 
  itemsPerPageSearch = 12;
  totalItemsSearch!:number; 
 
  changePageSearch(page: number) {
    this.currentPageSearch = page;
  }
 
  get startIndexSearch() {
    return (this.currentPageSearch - 1) * this.itemsPerPageSearch;
  }
 
  get endIndexSearch() {
    return this.currentPageSearch * this.itemsPerPageSearch;
  }

  /*store id*/
  storeCompanyId(id:number){
    localStorage.setItem('brandId',id.toString());
  }


  searchResult:Product[]=[];
  searchJob(id:number){
   
    this.productService.search(undefined,undefined,id.toString(),undefined,undefined)
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
      this.router.navigate(['/job-list'], { queryParams: { fromBrands: 'true' } });
    });
  
  }


}
