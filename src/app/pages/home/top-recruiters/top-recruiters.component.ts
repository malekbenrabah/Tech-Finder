import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/services/user/model/user';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import{faChevronRight, faChevronLeft,faLocationDot, faLocationPinLock} from '@fortawesome/free-solid-svg-icons';
import { JobService } from 'src/app/services/jobs/job.service';
import { Job } from 'src/app/services/user/model/Job';
import { CompanySlide } from 'src/app/services/user/model/CompanySlide';

@Component({
  selector: 'app-top-recruiters',
  templateUrl: './top-recruiters.component.html',
  styleUrls: ['./top-recruiters.component.css']
})


export class TopRecruitersComponent implements OnInit {

  rightIcon=faChevronRight;
  leftIcon=faChevronLeft;
  locationIcon=faLocationDot;
  noLocationIcon=faLocationPinLock;

  constructor(private userService:UserServiceService, private jobService:JobService) { }

  //companies:User[]=[];

  numSlides!:number;
  companieSlides:CompanySlide[][]=[];

  topRecruiters:any[]=[{"title":"aaa", "price":"aaa","brand":"aaaa"}];
  ngOnInit(): void {

    /*
    this.userService.getTopRecuiters().subscribe((response)=>{
      console.log('top recuiters',response);
      this.topRecruiters=response as any[];


      for (let i = 0; i < this.topRecruiters.length; i += 6) {
        const slide = this.topRecruiters.slice(i, i + 6).map(companyData => {
          return {
            nbJob: companyData[0],
            company: companyData[1] as User,
          };
        });
        this.companieSlides.push(slide);
      }
      console.log('top recruiters carousel',this.companieSlides);

      
    });

    */


    for (let i = 0; i < this.topRecruiters.length; i += 6) {
      const slide = this.topRecruiters.slice(i, i + 6).map(companyData => {
        return {
          nbJob: companyData[0],
          company: companyData[1] as User,
        };
      });
      this.companieSlides.push(slide);
    }
    console.log('top recruiters carousel',this.companieSlides);




    

  }

  storeCompanyId(id:number){
    localStorage.setItem('companyId',id.toString());
  }

  @ViewChild('carousel') carousel: any;

  
  handlePrev(){
    this.carousel.pre();
  }

  handleNext(){
    this.carousel.next();
  }

  

  

 
}
