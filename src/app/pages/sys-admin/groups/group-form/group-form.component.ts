import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICountry, CountryService } from 'ngx-countries-dropdown';
import { GrupoBean } from 'src/app/model/grupoBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { LanguageServiceService } from 'src/app/services/helpers/languageService/language-service.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { LocalizedDatePipe } from 'src/app/services/pipes/localizedDatePipe/localized-date-pipe';
import { GroupService } from '../services/group.service';
import { WsSysAdminGroupService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.group.service';
import { Utils } from 'src/app/util/utils';


@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  
    panelOpenState = true;
    @Input() group: GrupoBean | any;
    groupInfoForm = this.formBuilder.group({
      idGrupo: [{ value: '', disabled: false }],
      grupo: [{ value: '', disabled: false }, Validators.required],
      createAt: [{ value: new Date(), disabled: false }, Validators.required],
      enabled: [{ value: true, disabled: false }, Validators.required],
      lastModif: [{ value: new Date(), disabled: false }, Validators.required],
      hidden: [{ value: false, disabled: false }, Validators.required],
      lastModifUser: [{value:this.userLoggedServiceService.getUserName(), disabled: false }, Validators.required],
      createUser: [{value:this.userLoggedServiceService.getUserName() , disabled: false }, Validators.required]
  
    });
  
    existGroupFlag = false;
    private intervalo: any;
    type: any;
    message: any;
    mode: string = 'add'; // Por defecto, modo agregar


      constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private wsSysAdminGroupService: WsSysAdminGroupService, private utils: Utils,public datePipe: LocalizedDatePipe
        , private languageServiceService: LanguageServiceService,
        private router: Router, private messageService: MessageService, private translate: TranslateService
        , private route: ActivatedRoute, private groupService: GroupService, private countryService: CountryService,
        private snackBar: MatSnackBar,private userLoggedServiceService:UserLoggedServiceService) {
    
      }
      ngOnInit() {
        this.route.queryParams.subscribe(params => {
          this.mode = params['mode'] || 'add'; // Detecta si es "edit" o "add"
    
          if (this.mode === 'edit') {
            this.group = this.groupService.getGroup();
          } else {
            this.groupService.clearGroup(); // Limpia el usuario en modo agregar
            this.actualizarHora();
            this.intervalo = setInterval(() => {
              this.actualizarHora();
            }, 1000);
          }
          debugger;
          if (this.group) {
            this.groupInfoForm.patchValue({
              idGrupo: this.group.idGrupo,
              grupo: this.group.grupo,
              createAt:this.group.createAt,
              enabled: this.group.enabled,
              lastModif: this.group.lastModif,
              hidden: this.group.hidden,
              createUser:this.group.createUser,
              lastModifUser: this.group.lastModifUser,
            });
            this.groupInfoForm.get('idGrupo')?.disable({ emitEvent: false });
            this.groupInfoForm.get('enabled')?.enable({ emitEvent: false });
            this.groupInfoForm.get('hidden')?.enable({ emitEvent: false });
              
            
          }
        });
      }

  // ngOnInit(): void {
  //   this.groupForm = this.fb.group({
  //     name: ['', Validators.required],
  //     description: [''],
  //     enabled: [true],
  //     hidden: [false],
  //     permissions: [[]],
  //   });
  // }

  // onCheckboxChange(permission: string, checked: boolean): void {
  //   const current = this.groupForm.value.permissions || [];
  //   if (checked) {
  //     this.groupForm.patchValue({ permissions: [...current, permission] });
  //   } else {
  //     this.groupForm.patchValue({ permissions: current.filter((p: string) => p !== permission) });
  //   }
  // }


  validGroup(component: any, result: any) {
    component.existGroupFlag = result;

  }


  existGroup() {
    let group = this.groupInfoForm.value.grupo;
    if (group !== undefined && group !== "") {
      let idCompany = this.companyService.getCompany().idCompany;
      this.wsSysAdminGroupService.existGroup(group,idCompany, this.utils).subscribe(this.utils.subscribeHandler(this, this.validGroup));

    }

  }

  closeAction() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  onSubmit() {
    debugger;
    // TODO: Use EventEmitter with form value   
    if (this.existGroupFlag) {
      this.messageService.showDangerMessage("GROUP_FORM.GROUP_EXIST");
      return;
    }

    let group: GrupoBean | any = this.groupInfoForm.getRawValue();
    if (!this.groupInfoForm.valid) {
      this.messageService.showDangerMessage(this.groupInfoForm.status);
      return;
    }
    if (this.companyService.getCompany().idCompany === undefined) {
      this.messageService.showDangerMessage("GROUP_FORM.COMPANY_REQUIRED");
      return;
    }

    group.idCompany = this.companyService.getCompany().idCompany;
  
    group.createAt = this.utils.getDateToISO(group.createAt);
    group.lastModif = this.utils.getDateToISO(group.lastModif);
    if (this.mode === "edit") {
      group.lastModifUser = this.userLoggedServiceService.getUserName();
      this.wsSysAdminGroupService.updateGroups(this.utils, group).subscribe(this.utils.subscribeHandler(this, () => {
        this.type = 'success';
        this.message = this.translate.instant('GROUP_FORM.EDIT_SUCCESS', {
          grupo: this.group.grupo
        });
        let element = document.getElementById("modalSuccess") as HTMLElement;
        element.click();
      }));

       }   else {
        group.createUser = this.userLoggedServiceService.getUserName();
        this.wsSysAdminGroupService.addGroup(this.utils, group).subscribe(this.utils.subscribeHandler(this, () => {
          this.type = 'success';
          this.message = this.translate.instant('GROUP_FORM.ADD_SUCCESS', {
            grupo: group.grupo
          });
          let element = document.getElementById("modalSuccess") as HTMLElement;
          element.click(); 
        }));
  
      }
  }

  actualizarHora(): void {
    const ahora = new Date();
    this.groupInfoForm.patchValue({
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