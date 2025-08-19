import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICountry, CountryService } from 'ngx-countries-dropdown';
import { PrivilegyBean } from 'src/app/model/privilegyBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { LanguageServiceService } from 'src/app/services/helpers/languageService/language-service.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { LocalizedDatePipe } from 'src/app/services/pipes/localizedDatePipe/localized-date-pipe';
import { PrivilegyService } from '../services/privilegy.service';
import { WsSysAdminPrivilegyService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.privilegy.service';
import { Utils } from 'src/app/util/utils';
import { AuthorityBean } from 'src/app/model/authorityBean';
import { MenuBean } from 'src/app/model/menuBean';
import { ScreenBean } from 'src/app/model/screenBean';
import { ActionBean } from 'src/app/model/actionBean';
import { GrupoBean } from 'src/app/model/grupoBean';



@Component({
  selector: 'app-privilegy-form',
  templateUrl: './privilegy-form.component.html',
  styleUrls: ['./privilegy-form.component.css']
})
export class PrivilegyFormComponent implements OnInit {


  panelOpenState = true;
  @Input() privilegy: PrivilegyBean | any;
  privilegyInfoForm = this.formBuilder.group({
    idPrivilegy: [{ value: '', disabled: false }, Validators.required],
    authority: [{ value: '', disabled: false }, Validators.required],
    idScreen: [{ value: '', disabled: false }, Validators.required],
    idAction: [{ value: '', disabled: false }, Validators.required],
    idGrupo: [{ value: '', disabled: false }, Validators.required],
    grupo: [{ value: '', disabled: false }, Validators.required],
    screen: [{ value: null as ScreenBean | null, disabled: false }],
    action: [{ value: null as ActionBean | null, disabled: false }],
    // redirectTo: [{ value: '', disabled: false }, Validators.required],
    // pathMatch: [{ value: '', disabled: false }, Validators.required],

    // order: [0, Validators.required],
    createAt: [{ value: new Date(), disabled: false }, Validators.required],
    enabled: [{ value: true, disabled: false }, Validators.required],
    // skip: [{ value: false, disabled: false }, Validators.required],
    lastModif: [{ value: new Date(), disabled: false }, Validators.required],
    lastModifUser: [{ value: this.userLoggedServiceService.getUserName(), disabled: false }, Validators.required],
    createUser: [{ value: this.userLoggedServiceService.getUserName(), disabled: false }, Validators.required],
    //  order: [{ value: 999, disabled: false }, Validators.required]

  });

  existPrivilegyFlag = false;
  private intervalo: any;
  type: any;
  message: any;
  mode: string = 'add'; // Por defecto, modo agregar
  selectedFile!: File | null;
  fileAsByteArray!: string;
  previewUrl!: string;





  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private wsSysAdminPrivilegyService: WsSysAdminPrivilegyService, private utils: Utils, public datePipe: LocalizedDatePipe
    , private languageServiceService: LanguageServiceService,
    private router: Router, private messageService: MessageService, private translate: TranslateService
    , private route: ActivatedRoute, private privilegyService: PrivilegyService, private countryService: CountryService,
    private snackBar: MatSnackBar, private userLoggedServiceService: UserLoggedServiceService) {

  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'add'; // Detecta si es "edit" o "add"

      if (this.mode === 'edit') {
        this.privilegy = this.privilegyService.getPrivilegy();
      } else {
        this.privilegyService.clearPrivilegy(); // Limpia el usuario en modo agregar
        this.actualizarHora();
        this.intervalo = setInterval(() => {
          this.actualizarHora();
        }, 1000);
      }
      if (this.privilegy) {

         


        //  const file = this.base64ToFile(image.data, image.fileName, image.contentType);
        // this.privilegyInfoForm.get('image')?.setValue(file)
        this.privilegyInfoForm.patchValue({
          idPrivilegy: this.privilegy.idPrivilegy,
          //  / image: this.selectedFile,
          authority: this.privilegy.authority,
          // redirectTo: this.privilegy.redirectTo,
          // pathMatch: this.privilegy.pathMatch,
          idAction: this.privilegy.idAction,
          idScreen: this.privilegy.idScreen,
          idGrupo: this.privilegy.idGrupo,
          grupo: this.privilegy.grupo,
          createAt: this.privilegy.createAt,
          enabled: this.privilegy.enabled,
          // skip: this.privilegy.skip,
          lastModif: this.privilegy.lastModif,
          createUser: this.privilegy.createUser,
          lastModifUser: this.privilegy.lastModifUser,
          // order: this.privilegy.order,
          //     order: this.privilegy.order
        });
        this.privilegyInfoForm.get('enabled')?.enable({ emitEvent: false });

      }
      this.privilegyInfoForm.get('idPrivilegy')?.disable({ emitEvent: true });
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


  valprivilegy(component: any, result: any) {
    component.existPrivilegyFlag = result;
    component.crearComponente();
    component.crearAlias();
    component.crearPath();

  }


  existPrivilegy() {
    let idPrivilegy = this.privilegyInfoForm.value.idPrivilegy;
    if (idPrivilegy !== undefined && idPrivilegy !== "") {
      // let idCompany = this.companyService.getCompany().idCompany;
      this.wsSysAdminPrivilegyService.existPrivilegy(idPrivilegy?.toUpperCase(), this.utils).subscribe(this.utils.subscribeHandler(this, this.valprivilegy));

    }

  }





  closeAction() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }






  onSubmit() {
     
    // TODO: Use EventEmitter with form value   
    if (this.existPrivilegyFlag) {
      this.messageService.showDangerMessage("PRIVILEGY_FORM.PRIVILEGY_EXIST");
      return;
    }

    let privilegy: PrivilegyBean | any = this.privilegyInfoForm.getRawValue();
    if (!this.privilegyInfoForm.valid) {
      this.messageService.showDangerMessage(this.privilegyInfoForm.status);
      return;
    }
    if (this.companyService.getCompany().idCompany === undefined) {
      this.messageService.showDangerMessage("PRIVILEGY_FORM.COMPANY_REQUIRED");
      return;
    }
     


    // privilegy.idCompany = this.companyService.getCompany().idCompany;

    privilegy.createAt = this.utils.getDateToISO(privilegy.createAt);
    privilegy.lastModif = this.utils.getDateToISO(privilegy.lastModif);
    if (this.mode === "edit") {

      privilegy.lastModifUser = this.userLoggedServiceService.getUserName();
      this.wsSysAdminPrivilegyService.updatePrivilegy(this.utils, privilegy).subscribe(this.utils.subscribeHandler(this, () => {
        this.type = 'success';
        this.message = this.translate.instant('PRIVILEGY_FORM.EDIT_SUCCESS', {
          idPrivilegy: this.privilegy.idPrivilegy
        });
        let element = document.getElementById("modalSuccess") as HTMLElement;
        element.click();
      }));

    } else {
      privilegy.createUser = this.userLoggedServiceService.getUserName();
      this.wsSysAdminPrivilegyService.addPrivilegy(this.utils, privilegy).subscribe(this.utils.subscribeHandler(this, () => {
        this.type = 'success';
        this.message = this.translate.instant('PRIVILEGY_FORM.ADD_SUCCESS', {
          idPrivilegy: privilegy.idPrivilegy
        });
        let element = document.getElementById("modalSuccess") as HTMLElement;
        element.click();
      }));

    }
  }

  actualizarHora(): void {
    const ahora = new Date();
    this.privilegyInfoForm.patchValue({
      createAt: ahora,
      lastModif: ahora,
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); // Limpia el intervalo al destruir el componente
  }

  getCompany() {
    return this.companyService.getCompany().commercialName;
  }

  onActionSelected(action: ActionBean): void {
     
    if (!action) return;
    const idAction: any = action.idAction;
    this.privilegyInfoForm.get('idAction')?.setValue(idAction);
    this.privilegyInfoForm.get('action')?.setValue(action);
  }

  onScreenSelected(screen: ScreenBean): void {
     
    if (!screen) return;
    const idScreen: any = screen.idScreen;
    this.privilegyInfoForm.get('idScreen')?.setValue(idScreen);
    this.privilegyInfoForm.get('screen')?.setValue(screen);
  }

  onRoleSelected(authority: AuthorityBean): void {
     
    if (!authority) return;
    const authorityAux: any = authority.authority;
    this.privilegyInfoForm.get('authority')?.setValue(authorityAux);
  }

  onGrupoSelected(grupo: GrupoBean): void {
     
    if (!grupo) return;
    const idGrupo: any = grupo.idGrupo;
    const grupoName: any = grupo.grupo;
    this.privilegyInfoForm.get('idGrupo')?.setValue(idGrupo);
    this.privilegyInfoForm.get('grupo')?.setValue(grupoName);
  }
}