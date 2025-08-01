import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {  CountryService } from 'ngx-countries-dropdown';
import { ActionBean } from 'src/app/model/actionBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { LanguageServiceService } from 'src/app/services/helpers/languageService/language-service.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { LocalizedDatePipe } from 'src/app/services/pipes/localizedDatePipe/localized-date-pipe';
import { ActionService } from '../services/action.service';
import { WsSysAdminActionService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.action.service';
import { Utils } from 'src/app/util/utils';


@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css']
})
export class ActionFormComponent implements OnInit {

  
    panelOpenState = true;
    @Input() action: ActionBean | any;
    actionInfoForm = this.formBuilder.group({
      idAction: [{ value: '', disabled: false }],
      action: [{ value: '', disabled: false }, Validators.required],
      createAt: [{ value: new Date(), disabled: false }, Validators.required],
      enabled: [{ value: true, disabled: false }, Validators.required],
      lastModif: [{ value: new Date(), disabled: false }, Validators.required],
      lastModifUser: [{value:this.userLoggedServiceService.getUserName(), disabled: false }, Validators.required],
      createUser: [{value:this.userLoggedServiceService.getUserName() , disabled: false }, Validators.required]
  
    });
  
    existActionFlag = false;
    private intervalo: any;
    type: any;
    message: any;
    mode: string = 'add'; // Por defecto, modo agregar


      constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private wsSysAdminActionService: WsSysAdminActionService, private utils: Utils,public datePipe: LocalizedDatePipe
        , private languageServiceService: LanguageServiceService,
        private router: Router, private messageService: MessageService, private translate: TranslateService
        , private route: ActivatedRoute, private actionService: ActionService, private countryService: CountryService,
        private snackBar: MatSnackBar,private userLoggedServiceService:UserLoggedServiceService) {
    
      }
      ngOnInit() {
        this.route.queryParams.subscribe(params => {
          this.mode = params['mode'] || 'add'; // Detecta si es "edit" o "add"
    
          if (this.mode === 'edit') {
            this.action = this.actionService.getAction();
          } else {
            this.actionService.clearAction(); // Limpia el usuario en modo agregar
            this.actualizarHora();
            this.intervalo = setInterval(() => {
              this.actualizarHora();
            }, 1000);
          }
          debugger;
          if (this.action) {
            this.actionInfoForm.patchValue({
              idAction: this.action.idAction,
              action: this.action.action,
              createAt:this.action.createAt,
              enabled: this.action.enabled,
              lastModif: this.action.lastModif,
              createUser:this.action.createUser,
              lastModifUser: this.action.lastModifUser,
            });
            this.actionInfoForm.get('idAction')?.disable({ emitEvent: false });
            this.actionInfoForm.get('enabled')?.enable({ emitEvent: false });
            this.actionInfoForm.get('hidden')?.enable({ emitEvent: false });
              
            
          }
        });
      }

  // ngOnInit(): void {
  //   this.actionForm = this.fb.action({
  //     name: ['', Validators.required],
  //     description: [''],
  //     enabled: [true],
  //     hidden: [false],
  //     permissions: [[]],
  //   });
  // }

  // onCheckboxChange(permission: string, checked: boolean): void {
  //   const current = this.actionForm.value.permissions || [];
  //   if (checked) {
  //     this.actionForm.patchValue({ permissions: [...current, permission] });
  //   } else {
  //     this.actionForm.patchValue({ permissions: current.filter((p: string) => p !== permission) });
  //   }
  // }


  validAction(component: any, result: any) {
    component.existActionFlag = result;

  }


  existAction() {
    let action = this.actionInfoForm.value.action;
    if (action !== undefined && action !== "") {
      this.wsSysAdminActionService.existAction(action, this.utils).subscribe(this.utils.subscribeHandler(this, this.validAction));

    }

  }

  closeAction() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  onSubmit() {
    debugger;
    // TODO: Use EventEmitter with form value   
    if (this.existActionFlag) {
      this.messageService.showDangerMessage("ACTION_FORM.ACTION_EXIST");
      return;
    }

    let action: ActionBean | any = this.actionInfoForm.getRawValue();
    if (!this.actionInfoForm.valid) {
      this.messageService.showDangerMessage(this.actionInfoForm.status);
      return;
    }
    if (this.companyService.getCompany().idCompany === undefined) {
      this.messageService.showDangerMessage("ACTION_FORM.COMPANY_REQUIRED");
      return;
    }

   
  
    action.createAt = this.utils.getDateToISO(action.createAt);
    action.lastModif = this.utils.getDateToISO(action.lastModif);
    if (this.mode === "edit") {
      action.lastModifUser = this.userLoggedServiceService.getUserName();
      this.wsSysAdminActionService.updateActions(this.utils, action).subscribe(this.utils.subscribeHandler(this, () => {
        this.type = 'success';
        this.message = this.translate.instant('ACTION_FORM.EDIT_SUCCESS', {
          action: this.action.action
        });
        let element = document.getElementById("modalSuccess") as HTMLElement;
        element.click();
      }));

       }   else {
        action.createUser = this.userLoggedServiceService.getUserName();
        this.wsSysAdminActionService.addAction(this.utils, action).subscribe(this.utils.subscribeHandler(this, () => {
          this.type = 'success';
          this.message = this.translate.instant('ACTION_FORM.ADD_SUCCESS', {
            action: action.action
          });
          let element = document.getElementById("modalSuccess") as HTMLElement;
          element.click(); 
        }));
  
      }
  }

  actualizarHora(): void {
    const ahora = new Date();
    this.actionInfoForm.patchValue({
      createAt:ahora,
      lastModif: ahora,
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); // Limpia el intervalo al destruir el componente
  }
 
  getCompany() {
    return this.companyService.getCompany().commercialName;
  }
}