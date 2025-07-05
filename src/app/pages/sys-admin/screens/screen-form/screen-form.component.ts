import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICountry, CountryService } from 'ngx-countries-dropdown';
import { ScreenBean } from 'src/app/model/screenBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { LanguageServiceService } from 'src/app/services/helpers/languageService/language-service.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { LocalizedDatePipe } from 'src/app/services/pipes/localizedDatePipe/localized-date-pipe';
import { ScreenService } from '../services/screen.service';
import { WsSysAdminScreenService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.screen.service';
import { Utils } from 'src/app/util/utils';
import { ScreenImageBean } from 'src/app/model/screenImageBean';


@Component({
  selector: 'app-screen-form',
  templateUrl: './screen-form.component.html',
  styleUrls: ['./screen-form.component.css']
})
export class ScreenFormComponent implements OnInit {


  panelOpenState = true;
  @Input() screen: ScreenBean | any;
  screenInfoForm = this.formBuilder.group({
    screen: [{ value: '', disabled: false }, Validators.required],
    path: [{ value: '', disabled: false }, Validators.required],
    // redirectTo: [{ value: '', disabled: false }, Validators.required],
    // pathMatch: [{ value: '', disabled: false }, Validators.required],
    image: new FormControl<File | null>(null),
    // order: [0, Validators.required],
    componente: [{ value: '', disabled: false }, Validators.required],
    alias: [{ value: '', disabled: false }, Validators.required],
    createAt: [{ value: new Date(), disabled: false }, Validators.required],
    enabled: [{ value: true, disabled: false }, Validators.required],
    // skip: [{ value: false, disabled: false }, Validators.required],
    lastModif: [{ value: new Date(), disabled: false }, Validators.required],
    lastModifUser: [{ value: this.userLoggedServiceService.getUserName(), disabled: false }, Validators.required],
    createUser: [{ value: this.userLoggedServiceService.getUserName(), disabled: false }, Validators.required],
     order: [{ value: 999, disabled: false }, Validators.required]

  });

  existScreenFlag = false;
  private intervalo: any;
  type: any;
  message: any;
  mode: string = 'add'; // Por defecto, modo agregar
  selectedFile!: File | null;
  fileAsByteArray!: string;
  previewUrl!: string;
  image: any;





  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private wsSysAdminScreenService: WsSysAdminScreenService, private utils: Utils, public datePipe: LocalizedDatePipe
    , private languageServiceService: LanguageServiceService,
    private router: Router, private messageService: MessageService, private translate: TranslateService
    , private route: ActivatedRoute, private screenService: ScreenService, private countryService: CountryService,
    private snackBar: MatSnackBar, private userLoggedServiceService: UserLoggedServiceService) {

  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'add'; // Detecta si es "edit" o "add"

      if (this.mode === 'edit') {
        this.screen = this.screenService.getScreen();
      } else {
        this.screenService.clearScreen(); // Limpia el usuario en modo agregar
        this.actualizarHora();
        this.intervalo = setInterval(() => {
          this.actualizarHora();
        }, 1000);
      }
      if (this.screen) {

        debugger;
        this.image = this.screen.image;
        if (this.image) {
          this.loadFromBackend(this.image); // <<== Aquí cargas la imagen
        }

        //  const file = this.base64ToFile(image.data, image.fileName, image.contentType);
        // this.screenInfoForm.get('image')?.setValue(file)
        this.screenInfoForm.patchValue({
          screen: this.screen.screen,
          //  / image: this.selectedFile,
          path: this.screen.path,
          // redirectTo: this.screen.redirectTo,
          // pathMatch: this.screen.pathMatch,
          componente: this.screen.componente,
          createAt: this.screen.createAt,
          enabled: this.screen.enabled,
          // skip: this.screen.skip,
          lastModif: this.screen.lastModif,
          createUser: this.screen.createUser,
          lastModifUser: this.screen.lastModifUser,
          // order: this.screen.order,
          alias: this.screen.alias,
          order: this.screen.order
        });
        this.screenInfoForm.get('enabled')?.enable({ emitEvent: false });
        this.screenInfoForm.get('order')?.disable({ emitEvent: true });

      }
      this.screenInfoForm.get('componente')?.disable({ emitEvent: true });
      this.screenInfoForm.get('alias')?.disable({ emitEvent: true });
      this.screenInfoForm.get('path')?.disable({ emitEvent: true });
    });
  }

  loadFromBackend(imageDto: any) {
    const file = this.base64ToFile(imageDto.data, imageDto.fileName, imageDto.contentType);
    this.selectedFile = file;
    this.screenInfoForm.get('image')?.setValue(file);
    const reader = new FileReader();
    reader.onload = () => {
      debugger;
      this.previewUrl = reader.result as string;
      // const arrayBuffer = reader.result as ArrayBuffer;
      // const uint8Array = new Uint8Array(arrayBuffer);
      // const binary = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
      this.fileAsByteArray = this.image.data;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected(event: Event): void {
    debugger;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        debugger;

        const uint8Array = new Uint8Array(arrayBuffer);
        const binary = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        this.fileAsByteArray = btoa(binary);
        this.previewUrl = "data:image/jpeg;base64," + this.fileAsByteArray;

        // Puedes usar fileAsByteArray como equivalente a byte[] en Java
        console.log('Bytes:', this.fileAsByteArray);
      };

      reader.readAsArrayBuffer(this.selectedFile);


      // this.screenInfoForm.get('image')?.setValue(file as unknown as never);
    }
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


  valscreen(component: any, result: any) {
    component.existScreenFlag = result;
    component.crearComponente();
    component.crearAlias();
    component.crearPath();

  }


  existScreen() {
    let screen = this.screenInfoForm.value.screen;
    if (screen !== undefined && screen !== "") {
      // let idCompany = this.companyService.getCompany().idCompany;
      this.wsSysAdminScreenService.existScreen(screen?.toUpperCase(), this.utils).subscribe(this.utils.subscribeHandler(this, this.valscreen));

    }

  }

  crearComponente() {

    let screen = this.screenInfoForm.value.screen;
    if (screen !== undefined && screen !== "") {
      this.screenInfoForm.patchValue({ componente: screen + "Componente" });

    }

  }

  crearAlias() {
    let screen = this.screenInfoForm.value.screen;
    if (screen !== undefined && screen !== "") {
      this.screenInfoForm.patchValue({ alias: "BREADCRUMP." + screen?.toUpperCase() });

    }

  }

  crearPath() {

    let screen = this.screenInfoForm.value.screen;
    if (screen !== undefined && screen !== "") {
      this.screenInfoForm.patchValue({ path: screen });

    }

  }



  closeAction() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  base64ToFile(base64: string, fileName: string, mimeType: string): File {
    const byteString = atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([intArray], { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
  }




  onSubmit() {
    debugger;
    // TODO: Use EventEmitter with form value   
    if (this.existScreenFlag) {
      this.messageService.showDangerMessage("SCREEN_FORM.SCREEN_EXIST");
      return;
    }

    let screen: ScreenBean | any = this.screenInfoForm.getRawValue();
    if (!this.screenInfoForm.valid) {
      this.messageService.showDangerMessage(this.screenInfoForm.status);
      return;
    }
    if (this.companyService.getCompany().idCompany === undefined) {
      this.messageService.showDangerMessage("SCREEN_FORM.COMPANY_REQUIRED");
      return;
    }
    debugger;
    if (this.selectedFile !== undefined && this.selectedFile !== null) {
      this.image = {
        ...this.image,
        fileName: this.selectedFile.name,
        contentType: this.selectedFile.type,
        size: this.selectedFile.size,
        data: this.fileAsByteArray

      }
      screen.image = this.image;

    }

    // screen.idCompany = this.companyService.getCompany().idCompany;

    screen.createAt = this.utils.getDateToISO(screen.createAt);
    screen.lastModif = this.utils.getDateToISO(screen.lastModif);
    if (this.mode === "edit") {
      if (this.image !== null && this.image != undefined) {
        screen.image.id = this.image.id;
      }
      screen.lastModifUser = this.userLoggedServiceService.getUserName();
      this.wsSysAdminScreenService.updateScreen(this.utils, screen).subscribe(this.utils.subscribeHandler(this, () => {
        this.type = 'success';
        this.message = this.translate.instant('SCREEN_FORM.EDIT_SUCCESS', {
          screen: this.screen.screen
        });
        let element = document.getElementById("modalSuccess") as HTMLElement;
        element.click();
      }));

    } else {
      screen.createUser = this.userLoggedServiceService.getUserName();
      this.wsSysAdminScreenService.addScreen(this.utils, screen).subscribe(this.utils.subscribeHandler(this, () => {
        this.type = 'success';
        this.message = this.translate.instant('SCREEN_FORM.ADD_SUCCESS', {
          screen: screen.screen
        });
        let element = document.getElementById("modalSuccess") as HTMLElement;
        element.click();
      }));

    }
  }

  actualizarHora(): void {
    const ahora = new Date();
    this.screenInfoForm.patchValue({
      createAt: ahora,
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