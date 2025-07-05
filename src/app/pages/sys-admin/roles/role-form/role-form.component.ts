import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICountry, CountryService } from 'ngx-countries-dropdown';
import { AuthorityBean } from 'src/app/model/authorityBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { LanguageServiceService } from 'src/app/services/helpers/languageService/language-service.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { LocalizedDatePipe } from 'src/app/services/pipes/localizedDatePipe/localized-date-pipe';
import { AuthorityService } from '../services/authority.service';
import { WsAuthenticateAuthorityService } from 'src/app/services/ws-authenticate/ws-authenticate.authority.service';
import { Utils } from 'src/app/util/utils';


@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {

  
    panelOpenState = true;
    @Input() authority: AuthorityBean | any;
    authorityInfoForm = this.formBuilder.group({
      authority: [{ value: '', disabled: false }, Validators.required],
      description: [{ value: '', disabled: false }, Validators.required],
      createAt: [{ value: new Date(), disabled: false }, Validators.required],
      enabled: [{ value: true, disabled: false }, Validators.required],
      lastModif: [{ value: new Date(), disabled: false }, Validators.required],
      hidden: [{ value: false, disabled: false }, Validators.required],
      lastModifUser: [{value:this.userLoggedServiceService.getUserName(), disabled: false }, Validators.required],
      createUser: [{value:this.userLoggedServiceService.getUserName() , disabled: false }, Validators.required]
  
    });
  
    existAuthorityFlag = false;
    private intervalo: any;
    type: any;
    message: any;
    mode: string = 'add'; // Por defecto, modo agregar


      constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private wsAuthenticateService: WsAuthenticateAuthorityService, private utils: Utils,public datePipe: LocalizedDatePipe
        , private languageServiceService: LanguageServiceService,
        private router: Router, private messageService: MessageService, private translate: TranslateService
        , private route: ActivatedRoute, private authorityService: AuthorityService, private countryService: CountryService,
        private snackBar: MatSnackBar,private userLoggedServiceService:UserLoggedServiceService) {
    
      }
      ngOnInit() {
        this.route.queryParams.subscribe(params => {
          this.mode = params['mode'] || 'add'; // Detecta si es "edit" o "add"
    
          if (this.mode === 'edit') {
            this.authority = this.authorityService.getAuthority();
          } else {
            this.authorityService.clearAuthority(); // Limpia el usuario en modo agregar
            this.actualizarHora();
            this.intervalo = setInterval(() => {
              this.actualizarHora();
            }, 1000);
          }
          debugger;
          if (this.authority) {
            this.authorityInfoForm.patchValue({
              authority: this.authority.authority.replace('ROLE_', ''),
              description: this.authority.description,
              createAt:this.authority.createAt,
              enabled: this.authority.enabled,
              lastModif: this.authority.lastModif,
              hidden: this.authority.hidden,
              createUser:this.authority.createUser,
              lastModifUser: this.authority.lastModifUser,
            });
            this.authorityInfoForm.get('authority')?.disable({ emitEvent: false });
            this.authorityInfoForm.get('enabled')?.enable({ emitEvent: false });
            this.authorityInfoForm.get('hidden')?.enable({ emitEvent: false });
              
            
          }
        });
      }

  // ngOnInit(): void {
  //   this.roleForm = this.fb.group({
  //     name: ['', Validators.required],
  //     description: [''],
  //     enabled: [true],
  //     hidden: [false],
  //     permissions: [[]],
  //   });
  // }

  // onCheckboxChange(permission: string, checked: boolean): void {
  //   const current = this.roleForm.value.permissions || [];
  //   if (checked) {
  //     this.roleForm.patchValue({ permissions: [...current, permission] });
  //   } else {
  //     this.roleForm.patchValue({ permissions: current.filter((p: string) => p !== permission) });
  //   }
  // }


  validAuthority(component: any, result: any) {
    component.existAuthorityFlag = result;

  }


  existAuthority() {
    let authority = this.authorityInfoForm.value.authority;
    if (authority !== undefined && authority !== "") {
      let idCompany = this.companyService.getCompany().idCompany;
      this.wsAuthenticateService.existAuthority("ROLE_" + authority?.toUpperCase(),idCompany, this.utils).subscribe(this.utils.subscribeHandler(this, this.validAuthority));

    }

  }

  closeAction() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  onSubmit() {
    debugger;
    // TODO: Use EventEmitter with form value   
    if (this.existAuthorityFlag) {
      this.messageService.showDangerMessage("ROLE_FORM.AUTHORITY_EXIST");
      return;
    }

    let authority: AuthorityBean | any = this.authorityInfoForm.getRawValue();
    if (!this.authorityInfoForm.valid) {
      this.messageService.showDangerMessage(this.authorityInfoForm.status);
      return;
    }
    if (this.companyService.getCompany().idCompany === undefined) {
      this.messageService.showDangerMessage("ROLE_FORM.COMPANY_REQUIRED");
      return;
    }

    authority.idCompany = this.companyService.getCompany().idCompany;
  
    authority.createAt = this.utils.getDateToISO(authority.createAt);
    authority.lastModif = this.utils.getDateToISO(authority.lastModif);
    authority.authority = "ROLE_" +   authority.authority.toUpperCase();
    if (this.mode === "edit") {
      authority.lastModifUser = this.userLoggedServiceService.getUserName();
      this.wsAuthenticateService.updateAuthorities(this.utils, authority).subscribe(this.utils.subscribeHandler(this, () => {
        this.type = 'success';
        this.message = this.translate.instant('ROLE_FORM.EDIT_SUCCESS', {
          authority: this.authority.authority.replace('ROLE_', '')
        });
        let element = document.getElementById("modalSuccess") as HTMLElement;
        element.click();
      }));

       }   else {
        authority.createUser = this.userLoggedServiceService.getUserName();
        this.wsAuthenticateService.addAuthority(this.utils, authority).subscribe(this.utils.subscribeHandler(this, () => {
          this.type = 'success';
          this.message = this.translate.instant('ROLE_FORM.ADD_SUCCESS', {
            authority: authority.authority.replace('ROLE_', '')
          });
          let element = document.getElementById("modalSuccess") as HTMLElement;
          element.click(); 
        }));
  
      }
  }

  actualizarHora(): void {
    const ahora = new Date();
    this.authorityInfoForm.patchValue({
      createAt:ahora,
      lastModif: ahora,
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); // Limpia el intervalo al destruir el componente
  }
 
  getCompany() {
    return this.companyService.getCompany().name;
  }
}