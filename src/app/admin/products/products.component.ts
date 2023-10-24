import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product/product.service';
import { Brand } from 'src/app/services/user/model/Brand';
import { Product } from 'src/app/services/user/model/Product';
import Swal from 'sweetalert2';
import { NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  deleteIcon=faTrash;
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService:ProductService, private router:Router, private http:HttpClient) { 
    this.productForm=this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      price: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      selectedBrand: new FormControl(''),
      selectedCategory:new FormControl(''),
    });

  }

  products:Product[]=[];
  brands:Brand[]=[];
  ngOnInit(): void {
    this.productService.getProducts().subscribe((response)=>{
      console.log('products', response);
      this.products=response as Product[]
      this.searchProducts=this.products;
    });

    this.productService.getBrands().subscribe((response)=>{
      this.brands=response as Brand[];
    });
  }

  /*search users*/
  searchProducts:Product[]=[];
  search:string='';
  searchUser(){
    if(this.products.length===0 || this.search===''){
      this.searchProducts=this.products;
      console.log('search products', this.searchProducts);
      console.log('products', this.products);
    }else{
      
      console.log('search starts');
      console.log('products', this.products);
      console.log('search:',this.search);
      const searchText=this.search.toLocaleLowerCase();

      this.searchProducts = this.products.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(searchText);
        const descriptionMatch = product.description.toLowerCase().includes(searchText);
        const idMatch=product.id.toString().includes(searchText);
        const priceMatch=product.price.toString().includes(searchText);
        const created_atMatch=product.created_at.includes(searchText);

        return nameMatch  || descriptionMatch || idMatch ||priceMatch || created_atMatch;
      });

      this.totalProducts=this.searchProducts.length;

      console.log('search productq filter', this.searchProducts);
    }
    
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
  currentPageprod = 1; 
  itemsPerPageprod = 6; 
  totalProducts!:number; 

  /*view more modal*/
  viewModal = false;

  product:Product=new Product();
  viewMoreModal(id:number){
    this.viewModal=true;
    this.productService.getProduct(id).subscribe((response)=>{
      this.product=response as Product;
      this.productService.getBrandById(this.product.brandId).subscribe((resp)=>{
        var brand:Brand=new Brand();
        brand=resp as Brand;
        this.productForm.patchValue({
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          selectedBrand: brand.id, 
          selectedCategory: brand.id, 
        });
      });

      

    });



  } 



  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  uploadedPhoto: any | null = null;
  file!: File;
  onFileSelected(event: any, id:number) {
    this.file = event.target.files[0];

    if (this.file) {
      // display the selected image in the UI
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedPhoto = e.target.result;
        console.log('selected photo', this.uploadedPhoto);

        //confirmation sweet alert
        localStorage.setItem('productId',id.toString());
        this.openConfirmation();
      };

      reader.readAsDataURL(this.file);
    }
  }

  triggerFileInputClick(){
    const fileInput = this.fileInput.nativeElement as HTMLInputElement;
    fileInput.click();
        
  }

  openConfirmation(){
    if(this.uploadedPhoto){
      Swal.fire({
        title: 'Proceed adding  picture ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'No, cancel',
        confirmButtonColor:"#05264E"
        }).then((result) => {
        if (result.isConfirmed) {
          
          this.updateImg();
        } else {
          //cancel, reset the file input
          const fileInput = this.fileInput.nativeElement as HTMLInputElement;
          fileInput.value = ''; // clearing the selected file
          this.uploadedPhoto = null; // reset the uploaded photo
          this.router.navigateByUrl('/admin/products');
        }
      }); 
    } else {
      console.warn('No file selected for update.');
    }
   
  }

 
  profileUpdatedSucc:string="";
  updateImg(){

    console.log('update img start');
    console.log('the file to update ', this.file);
      const id=localStorage.getItem('productId');
      this.productService.addPhoto(Number(id),this.file)
        .subscribe(
          (response) => {
            
            console.log('Image updated successfully:', response);
            this.profileUpdatedSucc="Product photo added successfully";
            //this.handleCanceViewlModal();
          },
          (error) => {
            console.error('Error updating image:', error);
          }
        );
   
  }


  

  
  
  updateProduct(){

  }

  deletePhoto(id:number,idPhoto:number){
    this.productService.deleteProductPhoto(id,idPhoto).subscribe((res)=>{
      console.log('photo deleted', res);
    });
  }



    

  handleOkViewModal(): void {
    this.viewModal = false;
  }

  handleCanceViewlModal(): void {
    this.viewModal = false;
  }

  /*delete Product*/
  deleteProduct(id:number){
    console.log('id',id);
    Swal.fire({
      title: 'Proceed deleting this product ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe((response)=>{
          console.log('Delete successflly', response);
          Swal.fire(
            'Deleted!',
            'Product has been deleted.',
            'success'
          );
          this.ngOnInit();

        });
        
      }
    })
  }

  //add product 

  jobModal = false;

  addJobModal(){
    this.jobModal=true;
  } 
  handleOkJobModal(): void {
    this.jobModal = false;
  }

  handleCancelJobModal(): void {
    this.jobModal = false;
  }

  //photo

  defaultFileList: NzUploadFile[] = [];

  handleFileChange(info: NzUploadChangeParam): void {
    const status = info.file.status;
    if (status === 'done') {
        // File has been successfully uploaded
        console.log(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
        // File upload failed
        console.log(`${info.file.name} file upload failed.`);
    }

    // Update the fileList2 array with the selected files
    this.fileList2 = [...info.fileList];
  }
  fileList2 = [...this.defaultFileList];

  selectedBrandValue: any=null;
  addProduct(): void {
    console.log('add begin');
    if(this.productForm.valid){
      console.log('valid');

      const product=new Product();
      product.name=this.productForm.value['name'];
      product.description=this.productForm.value['description'];
      product.price=this.productForm.value['price'];
      product.brandId=this.productForm.get('selectedBrand')?.value;
      //getting the file objects
      const selectedFiles = this.fileList2
      .filter(file => !!file.originFileObj)
      .map(file => file.originFileObj);

      this.productService.addProduct(product, selectedFiles).subscribe((response) => {
        console.log('Product added successfully', response);
        this.handleCancelJobModal();
        this.ngOnInit();
      });
    }else {
      Object.values(this.productForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    

   

  }

  


}
