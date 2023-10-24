import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faLocationDot, faAward, faUserTie, faHourglassEnd, faSuitcase , faAt , faPhone, faUsers, faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import { faBuilding, faClock, faCopyright} from '@fortawesome/free-regular-svg-icons';
import { JobService } from 'src/app/services/jobs/job.service';
import { Job } from 'src/app/services/user/model/Job';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as L from'leaflet';
import { LocationService } from 'src/app/services/location/location.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/services/user/model/Product';
import { Brand } from 'src/app/services/user/model/Brand';
import { NzImageService } from 'ng-zorro-antd/image';
import { Photo } from 'src/app/services/user/model/Photo';
@Component({
  selector: 'app-job-detail2',
  templateUrl: './job-detail2.component.html',
  styleUrls: ['./job-detail2.component.css']
})
export class JobDetail2Component implements OnInit {

  

  fallback =
  'data:image/png;base64,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';

  myLocationIcon=faLocationDot;
  myBuildingIcon=faCopyright;
  experienceIcon=faAward;
  jobLevelIcon=faUserTie;
  deadlineIcon=faHourglassEnd;
  myJob=faMoneyBill;
  cretedatIcon=faClock;
  companyEmailIcon=faAt;
  companyPhoneIcon=faPhone;
  usersIcon=faUsers;

  selected: string = 'jobDesc';
  constructor(private route: ActivatedRoute, private productServie:ProductService, private nzImageService: NzImageService) { }

  job:Job=new Job();
 

  nbApplicants!:number;

  similarJobs:Job[]=[];
  openJobs:Job[]=[];
  companyOpenJobs!:number;
  product:Product=new Product();
  similarProducts:Product[]=[];
  ngOnInit(): void {
    const id=Number(this.route.snapshot.params['id']);
    console.log('id',id);
    this.productServie.getProduct(id).subscribe((response)=>{
      console.log('product details', response);
      this.product=response as Product;
      console.log('product',this.product.brandId);


      this.productServie.getBrandById(this.product.brandId).subscribe((response)=>{
        console.log('brand by id', response);
        var brand:Brand= response as Brand;
        this.product.brandName=brand.name;
        this.product.brandPhoto=brand.photo;
      });

      this.productServie.similarProduct(this.product.id).subscribe((response)=>{
        console.log('similar product',response);
        this.similarProducts=response as Product[];
      });

    });

  
  }

  //view photos

  selectedProduct!:Product;
  onClick(id:number): void {
     
    this.productServie.getProduct(id).subscribe((response) => {
       
      this.selectedProduct = response as Product;

      var images=[];
      if(this.selectedProduct.photos===null){
         images = [
          {
            src: 'https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg',
            width: '200px',
            height: '200px',
            alt: 'ng-zorro'
          }
        ];
        
      }else{
        images = this.selectedProduct.photos.map((photo: Photo) => ({
          src: photo.path,
          width: '200px',
          height: '200px',
          alt: 'Product Image'
        }));
     
       
      }

      this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
    
    });
  }

  //buttons 
  isbtnActive=true;





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

  onClickImg(): void {

    const imagesProduct = this.product.photos.map((photo: Photo) => ({
      src: photo.path,
      width: '200px',
      height: '200px',
      alt: 'Product Image'
    }));
    this.nzImageService.preview(imagesProduct, { nzZoom: 1.5, nzRotate: 0 });
  }


   
  
      

 


}
