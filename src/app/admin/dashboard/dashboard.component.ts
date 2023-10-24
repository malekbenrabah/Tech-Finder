import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBuilding} from '@fortawesome/free-regular-svg-icons';
import { faBox, faBoxOpen, faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'chart.js/auto';
import { AuthService } from 'src/app/services/auth-service';
import { JobService } from 'src/app/services/jobs/job.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Brand } from 'src/app/services/user/model/Brand';
import { Job } from 'src/app/services/user/model/Job';
import { Product } from 'src/app/services/user/model/Product';
import { User } from 'src/app/services/user/model/user';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jobsIcon=faBoxOpen;
  userIcon=faUser;
  companyIcon=faBuilding;
  constructor(private userService:UserServiceService, private jobService:JobService, private authService:AuthService, private router:Router, private prodictService:ProductService) { }

  companies:User[]=[];
  nbCompanies!:number;
  nbUsers!:number;
  nbJobs!:number;
  jobsMonth:any[]=[];
  jobTypeJobs:any[]=[];
  monthMapping = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  jobs:Product[]=[];
  ngOnInit(): void {
    if(!this.authService.isAuthenticated()) {
      this.authService.login();
    }

    this.prodictService.getProducts().subscribe((res)=>{
      var products:Product[]=[];
      products = res as Product[];
      this.nbJobs=products.length;
    });

    this.prodictService.getBrands().subscribe((res)=>{
      var brands:Brand[]=[];
      brands = res as Brand[];
      this.nbUsers=brands.length;
    });
    
    this.userService.getCompanies().subscribe((response)=>{
      console.log('companies',response);
      this.companies=response as User[];
      this.nbCompanies=this.companies.length;
    });

   

   

    

    /*monthly jobs chart*/

    this.prodictService.getProductsByMonth().subscribe((response)=>{
      console.log('jobs by month', response);
      this.jobsMonth=response as any[];
      const months = this.monthMapping;
      const jobData = Array(12).fill(0); 
      for (const item of this.jobsMonth) {
        const monthIndex = item[0] - 1;
        jobData[monthIndex] = item[1];
      }


      new Chart("jobsChart2", {
        type: 'bar',
        data: {
          labels: months,
          datasets: [{
            label: 'nb.Products',
            data: jobData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              "rgba(40,199,111,.12)",
              '#1d4fd826',
              'rgb(199 40 187 / 12%)'

              
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
              '#28c76f',
              '#355fd5',
              '#eb2f96'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  

      new Chart("jobsChart", {
        type: 'line',
        data: {
          labels: months,
          datasets: [{
            label: 'nb.Jobs',
            data: jobData,
            fill: false,
            borderColor: '#1677cb',

          }]
        },
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
          scales: {
            y: { 
              min: 0,
              max: this.nbJobs
            }
          }
        }
      });

    });



    /*products by brand*/
    /*
    this.jobService.getJobsByJobtype().subscribe((response)=>{
      console.log('jobs by job type', response);
      this.jobTypeJobs=response as any[];
      const jobType = this.jobTypeJobs.map(item => item[0]);
      const jobTypeCount = this.jobTypeJobs.map(item => item[1]);

      console.log('job type', jobType);
      console.log('job type count', jobTypeCount);

      new Chart("jobTypeChart", {
        type: 'polarArea',
        data: {
          labels: jobType,
          datasets: [{
            label: 'nb.Jobs',
            data: jobTypeCount,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)'
            ]
          }]
        }
      });
  
    });
    */

    this.prodictService.getAllBrandsProducts().subscribe((response)=>{
      console.log('all brand products', response);

      const data = response as Array<{ name: string, productCount: number }>;
      const brandNames = data.map(item => item.name);
      const productCounts = data.map(item => item.productCount);

      new Chart('jobTypeChart',{
        type:'bar',
        data: {
          labels: brandNames,
          datasets: [
            {
              label: 'nb.Products',
              data: productCounts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    });

  

   /*recent jobs*/
    this.prodictService.getProducts().subscribe((response)=>{
      console.log("jobs listings", response);
      this.jobs=response as Product[];
    });


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
}
