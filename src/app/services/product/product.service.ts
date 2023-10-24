import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../user/model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private shouldAllowPublicAccess = true;

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get("http://localhost:8086/api/products/getProducts");
  }

  getProduct(id:number){
    
   // return this.http.get("http://localhost:8086/api/products/findById?id="+id);
   
    return this.http.get(`http://localhost:8086/api/products/findById`, {
      params: { id: id.toString() } 
    });
   

    /*
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.get<Product>("http://localhost:8086/api/products/findById",{params});
    */

  }

  similarProducts(id:number){
    return this.http.get("http://localhost:8086/api/products/similarProducts?id="+id);
  }


  search(name?:string, description?:string, brand?:string, maxPrice?:number,
    minPrice?:number){
    
    let params = new HttpParams();

    if (name) {
    params = params.set('name', name);
    }
    if (description) {
    params = params.set('description', description);
    }
    if (brand) {
    params = params.set('brand', brand);
    }
    if (maxPrice) {
    params = params.set('maxPrice', maxPrice);
    }
    
    return this.http.get<Product[]>("http://localhost:8086/api/products/search",{params});

  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:8086/api/products/delete`, {
      params: { id: id.toString() } 
    });
  }

  addProduct(product:Product, photo:any[]){

    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    if (photo) {
      for (let i = 0; i < photo.length; i++) {
        formData.append('photo', photo[i]);
      }
    }
    return this.http.post("http://localhost:8086/api/products/addProduct",formData);
  }

  deleteProductPhoto(id:number,idPhoto:number){
    
    let params = new HttpParams();
    params = params.set('productId', id);
    params = params.set('photoId',idPhoto);
    return this.http.delete("http://localhost:8086/api/products/deletePhoto",{params});

    
  }

  addPhoto(id:number, file:any){
    const formData = new FormData();
    formData.append('id', id.toString());
    if (file) {
      formData.append('photo', file);
    }
    return this.http.put("http://localhost:8086/api/products/updatePhoto",formData)
  }

  similarProduct(id:number){
    return this.http.get(`http://localhost:8086/api/products/similarProducts`, {
      params: { id: id.toString() } 
    });

  }

  getProductsByMonth(){
    return this.http.get("http://localhost:8086/api/products/getProdByMonth")
  }

  getBrandsProducts(id:number){
    return this.http.get("http://localhost:8090/api/brands/getProducts/"+id)
  }

  getAllBrandsProducts(){
    return this.http.get("http://localhost:8090/api/brands/getAllBrandsProducts");
  }

  getBrands(){
    return this.http.get("http://localhost:8090/api/brands/getBrands");
  }

  getBrandById(id:number){
   
    return this.http.get(`http://localhost:8090/api/brands/findById`, {
      params: { id: id.toString() } 
    });
  }

 
}
