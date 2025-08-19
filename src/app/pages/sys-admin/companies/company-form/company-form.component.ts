import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICountry, CountryService, IConfig } from 'ngx-countries-dropdown';
import { CompanyBean } from 'src/app/model/companyBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { LanguageServiceService } from 'src/app/services/helpers/languageService/language-service.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { LocalizedDatePipe } from 'src/app/services/pipes/localizedDatePipe/localized-date-pipe';
import { CompanyBeanService } from '../services/companyBean.service';
import { WsSysAdminCompanyService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.company.service';
import { Utils } from 'src/app/util/utils';
import { CompanyImageBean } from 'src/app/model/companyImageBean';
import { ValidatorService } from 'src/app/services/helpers/validator/validator.service';
import { bankAccountValidator } from 'src/app/services/helpers/validator/bank-account.validator';

import * as ct from 'countries-and-timezones';






@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {


  selectedCountryConfig: IConfig = {
    hideCode: false,
    hideName: false

  };
  countryListConfig: IConfig = {
    hideCode: false,
    hideName: false

  };

  existMobileFlag = false;
  existEmailFlag = false;
  existLegalNameFlag = false;
  existTaxIdFlag = false;
  country: ICountry | any;

  panelOpenState = true;
  @Input() company: CompanyBean | any;


  companyInfoForm = this.formBuilder.group({
    idCompany: [{ value: '', disabled: true }],
    legalName: ['', [Validators.required, Validators.maxLength(255)]],
    commercialName: ['', [Validators.maxLength(255)]],
    taxId: ['', [Validators.required, Validators.maxLength(20)]],
    fiscalRegime: ['', [Validators.maxLength(100)]],

    countryCodeIso3: [{ value: '484', disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    stateProvince: ['', [Validators.maxLength(150)]],
    city: ['', [Validators.maxLength(150)]],
    postalCode: ['', [Validators.maxLength(20)]],
    street: ['', [Validators.maxLength(255)]],
    addressComplement: ['', [Validators.maxLength(255)]],

    contactName: ['', [Validators.maxLength(150)]],
    position: ['', [Validators.maxLength(100)]],
    email: ['', [Validators.email, Validators.maxLength(150)]],
    phoneNumber: ['', [Validators.maxLength(50)], ValidatorService.phoneValidator],
    mobileNumber: ['', [Validators.maxLength(50)], ValidatorService.phoneValidator],
    language: [{ value: 'es', disabled: true }, [Validators.maxLength(10)]],

    timezone: [{ value: 'America/Mexico_City', disabled: true }, [Validators.maxLength(50)]],
    currency: [{ value: 'MXN', disabled: true }, [Validators.maxLength(3)]],
    websiteUrl: ['', [Validators.maxLength(255)], ValidatorService.urlValidator],
    logoUrl: ['', [Validators.maxLength(255)], ValidatorService.urlValidator],
    industry: ['', [Validators.maxLength(100)]],
    employeeCount: [null],

    billingEmail: ['', [Validators.email, Validators.maxLength(150)]],
    billingAddress: ['', [Validators.maxLength(255)]],
    paymentTerms: ['', [Validators.maxLength(100)]],
    paymentMethod: ['', [Validators.maxLength(100)]],
    bankAccount: ['', [Validators.maxLength(255)]],

    classification: ['', [Validators.maxLength(100)]],
    integrationType: ['', [Validators.maxLength(100)]],
    contractSigned: [false],
    notes: [''],

    enabled: [true, Validators.required],
    image: new FormControl<File | null>(null),

    createAt: [new Date(), Validators.required],
    lastModif: [new Date(), Validators.required],
    createUser: [this.userLoggedServiceService.getUserName(), Validators.required],
    lastModifUser: [this.userLoggedServiceService.getUserName(), Validators.required],
    contacts: this.formBuilder.array([]) // contactos adicionales
  });



  existCompanyFlag = false;
  private intervalo: any;
  type: any;
  message: any;
  mode: string = 'add'; // Por defecto, modo agregar
  selectedFile!: File | null;
  fileAsByteArray!: string;
  previewUrl!: string;
  image: any;
  timezones: string[] | any;
  fb: any;





  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private wsSysAdminCompanyService: WsSysAdminCompanyService, private utils: Utils, public datePipe: LocalizedDatePipe
    , private languageServiceService: LanguageServiceService,
    private router: Router, private messageService: MessageService, private translate: TranslateService
    , private route: ActivatedRoute, private companyBeanService: CompanyBeanService, private countryService: CountryService,
    private snackBar: MatSnackBar, private userLoggedServiceService: UserLoggedServiceService) {

  }



  get contacts(): FormArray {
    return this.companyInfoForm.get('contacts') as FormArray;
  }

  newcontacts(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(50)], ValidatorService.phoneValidator],
      mobileNumber: ['', [Validators.required, Validators.maxLength(50)], ValidatorService.phoneValidator],
      createdAt: [new Date(), Validators.required],
      updatedAt: [new Date(), Validators.required],
      idCompany: [this.companyInfoForm.get('idCompany')?.value],

    });
  }

  addContact(): void {
    this.contacts.push(this.newcontacts());
  }

  removeContact(index: number): void {
    this.contacts.removeAt(index);
  }



  ngOnInit() {
     
    this.companyInfoForm.get('taxId')?.setValidators([
      Validators.required,
      ValidatorService.rfcValidatorIfMexico(() => this.companyInfoForm.get('countryCodeIso3')?.value)
    ]);
    // Aquí se configura el validador dinámico
    this.companyInfoForm.get('paymentMethod')!.valueChanges.subscribe(method => {
      const bankAccount = this.companyInfoForm.get('bankAccount');

      if (method && method !== 'Efectivo') {
        bankAccount?.setValidators([
          Validators.required,
          bankAccountValidator(method)
        ]);
      } else {
        bankAccount?.clearValidators(); // No es requerido para EFECTIVO
        bankAccount?.setValue(null); // opcional: limpia el valor
      }
      bankAccount?.updateValueAndValidity();
    });

    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'add'; // Detecta si es "edit" o "add"

      if (this.mode === 'edit') {
        this.company = this.companyBeanService.getCompany();
      } else {
        this.country = this.countryService.getAllCountries().find(c => c.isoCode === '484');
        this.getTimezoneFromCountry(this.country.code)
        this.companyInfoForm.patchValue({
          countryCodeIso3: this.country.isoCode,
          language: this.country.language.code,
          timezone: '',
          currency: this.country.currency.code,



          // si ya tienes imagen precargada
          // image: this.company.image 
        });
        // this.company.countryCodeIso3 = '484';
        this.companyBeanService.clearCompany(); // Limpia el usuario en modo agregar
        this.actualizarHora();
        this.intervalo = setInterval(() => {
          this.actualizarHora();
        }, 1000);
      }
      if (this.company) {

         
        this.image = this.company.image;
        if (this.image) {
          this.loadFromBackend(this.image); // <<== Aquí cargas la imagen
        }

        //  const file = this.base64ToFile(image.data, image.fileName, image.contentType);
        // this.companyInfoForm.get('image')?.setValue(file
        this.companyInfoForm.patchValue({
          idCompany: this.company.idCompany,
          legalName: this.company.legalName,
          commercialName: this.company.commercialName,
          taxId: this.company.taxId,
          fiscalRegime: this.company.fiscalRegime,

          countryCodeIso3: this.company.countryCodeIso3,
          stateProvince: this.company.stateProvince,
          city: this.company.city,
          postalCode: this.company.postalCode,
          street: this.company.street,
          addressComplement: this.company.addressComplement,

          contactName: this.company.contactName,
          position: this.company.position,
          email: this.company.email,
          phoneNumber: this.company.phoneNumber, // corregido (antes: this.company.phone)
          mobileNumber: this.company.mobileNumber,
          language: this.company.language,

          timezone: this.company.timezone,
          currency: this.company.currency,
          websiteUrl: this.company.websiteUrl,
          logoUrl: this.company.logoUrl,
          industry: this.company.industry,
          employeeCount: this.company.employeeCount,

          billingEmail: this.company.billingEmail,
          billingAddress: this.company.billingAddress,
          paymentTerms: this.company.paymentTerms,
          paymentMethod: this.company.paymentMethod,
          bankAccount: this.company.bankAccount,

          classification: this.company.classification,
          integrationType: this.company.integrationType,
          contractSigned: this.company.contractSigned,
          notes: this.company.notes,

          enabled: this.company.enabled,
          createAt: this.company.createAt,
          lastModif: this.company.lastModif,
          createUser: this.company.createUser,
          lastModifUser: this.company.lastModifUser,

          // si ya tienes imagen precargada
          // image: this.company.image 
        });
        const contactsArray = this.companyInfoForm.get('contacts') as FormArray;
        this.company.contacts.forEach((contact: any) => {
          contactsArray.push(this.createContactFormGroup(contact));
        });

        this.country = this.countryService.getAllCountries().find(c => c.isoCode === this.company.countryCodeIso3);
        // habilita/deshabilita campos según lógica
        this.companyInfoForm.get('enabled')?.enable({ emitEvent: false });


      }
      this.companyInfoForm.get('idCompany')?.disable({ emitEvent: true });
      // this.companyInfoForm.get('alias')?.disable({ emitEvent: true });
      // this.companyInfoForm.get('path')?.disable({ emitEvent: true });
    });
  }

  createContactFormGroup(contact: any): FormGroup {
    return this.formBuilder.group({
      name: [contact.name, Validators.required],
      position: [contact.position, Validators.required],
      email: [contact.email, [Validators.required, Validators.email]],
      phoneNumber: [contact.phoneNumber, [Validators.required, Validators.maxLength(50)], ValidatorService.phoneValidator],
      mobileNumber: [contact.mobileNumber, [Validators.required, Validators.maxLength(50)], ValidatorService.phoneValidator],
      createdAt: [contact.createdAt, Validators.required],
      updatedAt: [new Date(), Validators.required],
      idCompany: [contact.idCompany],
      idContact: contact.idContact
    });
  }


  loadFromBackend(imageDto: any) {
    const file = this.base64ToFile(imageDto.data, imageDto.fileName, imageDto.contentType);
    this.selectedFile = file;
    this.companyInfoForm.get('image')?.setValue(file);
    const reader = new FileReader();
    reader.onload = () => {
       
      this.previewUrl = reader.result as string;
      // const arrayBuffer = reader.result as ArrayBuffer;
      // const uint8Array = new Uint8Array(arrayBuffer);
      // const binary = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
      this.fileAsByteArray = this.image.data;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected(event: Event): void {
     
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
         

        const uint8Array = new Uint8Array(arrayBuffer);
        const binary = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        this.fileAsByteArray = btoa(binary);
        this.previewUrl = "data:image/jpeg;base64," + this.fileAsByteArray;

        // Puedes usar fileAsByteArray como equivalente a byte[] en Java
        console.log('Bytes:', this.fileAsByteArray);
      };

      reader.readAsArrayBuffer(this.selectedFile);


      // this.companyInfoForm.get('image')?.setValue(file as unknown as never);
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


  valcompany(component: any, result: any) {
    component.existCompanyFlag = result;
    component.crearComponente();
    component.crearAlias();
    component.crearPath();

  }


  existCompany() {
    let company = this.companyInfoForm.value.idCompany;
    if (company !== undefined && company !== "") {
      // let idCompany = this.companyService.getCompany().idCompany;
      this.wsSysAdminCompanyService.existCompany(company?.toUpperCase(), this.utils).subscribe(this.utils.subscribeHandler(this, this.valcompany));

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
     
    // TODO: Use EventEmitter with form value   
    if (this.existCompanyFlag) {
      this.messageService.showDangerMessage("COMPANY_FORM.COMPANY_EXIST");
      return;
    }

    let company: CompanyBean | any = this.companyInfoForm.getRawValue();
    if (!this.companyInfoForm.valid) {
      this.messageService.showDangerMessage(this.companyInfoForm.status);
      return;
    }
    if (this.companyService.getCompany().idCompany === undefined) {
      this.messageService.showDangerMessage("COMPANY_FORM.COMPANY_REQUIRED");
      return;
    }
     
    if (this.selectedFile !== undefined && this.selectedFile !== null) {
      this.image = {
        ...this.image,
        fileName: this.selectedFile.name,
        contentType: this.selectedFile.type,
        size: this.selectedFile.size,
        data: this.fileAsByteArray

      }
      company.image = this.image;

    }

    // company.idCompany = this.companyService.getCompany().idCompany;

    company.createAt = this.utils.getDateToISO(company.createAt);
    company.lastModif = this.utils.getDateToISO(company.lastModif);
    if (this.mode === "edit") {
      if (this.image !== null && this.image != undefined) {
        company.image.id = this.image.id;
      }
      company.lastModifUser = this.userLoggedServiceService.getUserName();
      this.wsSysAdminCompanyService.updateCompany(this.utils, company).subscribe(this.utils.subscribeHandler(this, () => {
        this.type = 'success';
        this.message = this.translate.instant('COMPANY_FORM.EDIT_SUCCESS', {
          commercialName: this.company.commercialName
        });
        let element = document.getElementById("modalSuccess") as HTMLElement;
        element.click();
      }));

    } else {
      company.createUser = this.userLoggedServiceService.getUserName();
      this.wsSysAdminCompanyService.addCompany(this.utils, company).subscribe(this.utils.subscribeHandler(this, () => {
        this.type = 'success';
        this.message = this.translate.instant('COMPANY_FORM.ADD_SUCCESS', {
          commercialName: company.commercialName
        });
        let element = document.getElementById("modalSuccess") as HTMLElement;
        element.click();
      }));

    }
  }

  actualizarHora(): void {
    const ahora = new Date();
    this.companyInfoForm.patchValue({
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

  onCountryChange(country: any) {
     
    this.country = country;
    this.getTimezoneFromCountry(this.country.code),
      this.companyInfoForm.patchValue({
        countryCodeIso3: this.country.isoCode,
        language: this.country.language.code,
        // timezone: '',
        currency: this.country.currency.code,



        // si ya tienes imagen precargada
        // image: this.company.image 
      });

  }
  getTimezoneFromCountry(isoCode: string) {
    const country = ct.getCountry(isoCode);
    if (country && country.timezones.length > 0) {
      this.timezones = country.timezones;

    }
  }
}