import { Injectable } from '@angular/core';
import { Job } from '../user/model/Job';
import { Subject } from 'rxjs';
import { Product } from '../user/model/Product';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }

  /*
  private searchResultsSource = new Subject<Job[]>();
  searchResults$ = this.searchResultsSource.asObservable();

  setSearchResults(results: Job[]) {
    this.searchResultsSource.next(results);
  }
  */
 
  //store the search results
  private privateSearchResults: Product[] = [];  
  private searchResultsSource = new Subject<Product[]>();
  searchResults$ = this.searchResultsSource.asObservable();

  private hasSearchResults: boolean = false;
  setSearchResults(results: Product[]) {
    this.privateSearchResults = results; // update the private variable
    this.hasSearchResults = results.length > 0;
    this.searchResultsSource.next(results);
    
  }

  getSearchResults(): Product[] {
    // return the search results from the private variable
    return this.privateSearchResults;
  }

  getHasSearchResults(): boolean {
    return this.hasSearchResults;
  }

  

  

}
