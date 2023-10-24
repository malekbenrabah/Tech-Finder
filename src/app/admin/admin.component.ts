import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user/user-service.service';
import { Router } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isCollapsed=false;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('http://localhost:4200');
  }

 

}
