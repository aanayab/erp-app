import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyBean } from 'src/app/model/companyBean';
import { CompanyBeanService } from '../services/companyBean.service';

@Component({
  selector: 'app-companies-home',
  templateUrl: './companies-home.component.html',
  styleUrls: ['./companies-home.component.css']
})
export class CompaniesHomeComponent {

  company!: CompanyBean;
  

constructor(private router:Router,private activatedRoute:ActivatedRoute,private companyBeanService:CompanyBeanService){
  
  }
  
    getRouter(): Router {
      return this.router;
    }
  
    getActiveRouter(): ActivatedRoute {
       
      return this.activatedRoute;
    }
  
    editCompany(company:CompanyBean){
      
      this.company = company;
      this.companyBeanService.setCompany(company); // Guarda el usuario en el servicio
      this.router.navigate(["EditCompany"], { relativeTo: this.activatedRoute, queryParams: { mode: 'edit' }  });
    }

}