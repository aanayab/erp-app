import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { LanguageServiceService } from 'src/app/services/helpers/languageService/language-service.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { LocalizedDatePipe } from 'src/app/services/pipes/localizedDatePipe/localized-date-pipe';
import { Utils } from 'src/app/util/utils';

import { MenuBean } from 'src/app/model/menuBean';
import { ScreenBean } from 'src/app/model/screenBean';
import { MenuService } from '../services/menu.service'; // servicio de “estado” (get/set seleccionado)
import { WsSysAdminMenuService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.menu.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit, OnDestroy {

  panelOpenState = true;

  @Input() menu!: MenuBean | any;

  // catálogos (inyéctalos desde el padre o cárgalos aquí)
  parentMenus: MenuBean[] = [];
  screens: ScreenBean[] = [];

  menuInfoForm = this.formBuilder.group({
    idMenu: [{ value: '', disabled: true }],
    name: [{ value: '', disabled: false }, Validators.required],
    idParentMenu: [{ value: null as number | null, disabled: false }],
    idScreen: [{ value: null as ScreenBean | null, disabled: false }],

    enabled: [{ value: true, disabled: false }, Validators.required],
    deleted: [{ value: false, disabled: false }],

    createAt: [{ value: new Date(), disabled: false }, Validators.required],
    lastModif: [{ value: new Date(), disabled: false }, Validators.required],
    createUser: [{ value: this.userLoggedServiceService.getUserName(), disabled: false }],
    lastModifUser: [{ value: this.userLoggedServiceService.getUserName(), disabled: false }],
    order: [{ value: 999, disabled: false }, Validators.required]

  });

  existMenuNameFlag = false;
  private intervalo: any;
  type: any;
  message: any;
  mode: string = 'add'; // add | edit

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private wsMenuService: WsSysAdminMenuService,
    private utils: Utils,
    public datePipe: LocalizedDatePipe,
    private languageServiceService: LanguageServiceService,
    private router: Router,
    private messageService: MessageService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private snackBar: MatSnackBar,
    private userLoggedServiceService: UserLoggedServiceService
  ) { }

  ngOnInit(): void {
    // Cargar catálogos si este componente se usa standalone
    //    this.loadCatalogs();

    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'add';

      if (this.mode === 'edit') {
        this.menu = this.menuService.getMenu(); // toma el seleccionado desde el service “estado”
      } else {
        this.menuService.clearMenu();
        this.actualizarHora();
        this.intervalo = setInterval(() => this.actualizarHora(), 1000);
      }

      if (this.menu) {
        // Patch de edición
        this.menuInfoForm.patchValue({
          idMenu: this.menu.idMenu,
          name: this.menu.name,
          idParentMenu: this.menu.idParentMenu ?? null,
          idScreen: this.menu.idScreen ?? null,
          //      orderIndex: this.menu.orderIndex ?? 0,
          enabled: this.menu.enabled ?? true,
          deleted: this.menu.deleted ?? false,
          createAt: this.menu.createAt,
          lastModif: this.menu.lastModif,
          createUser: this.menu.createUser,
          lastModifUser: this.menu.lastModifUser,
          order: this.menu.order
        });

        // Habilitar switches en edición (igual que roles)
        this.menuInfoForm.get('enabled')?.enable({ emitEvent: false });
        this.menuInfoForm.get('order')?.disable({ emitEvent: true });
        this.menuInfoForm.get('name')?.disable({ emitEvent: true });
      }
      this.menuInfoForm.get('idMenu')?.disable({ emitEvent: true });
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  // --- Catálogos (ajusta a tus servicios reales si ya los cargas en el padre) ---
  // private loadCatalogs(): void {
  //   // parent menus
  //   this.wsMenuService.getMenus(this.utils).subscribe(this.utils.subscribeHandler(this, (list: MenuBean[]) => {
  //     this.parentMenus = (list || []).filter(m => !!m.enabled);
  //   }));
  //   // // screens
  //   // this.wsMenuService.getScreens(this.utils).subscribe(this.utils.subscribeHandler(this, (list: ScreenBean[]) => {
  //   //   this.screens = list || [];
  //   // }));
  // }

  existMenuName(): void {
    const name = this.menuInfoForm.value.name;
    if (name && name.trim() !== '') {
      const idCompany = this.companyService.getCompany().idCompany;
      this.wsMenuService.existMenu(name.trim(), this.utils)
        .subscribe(this.utils.subscribeHandler(this, this.validMenuName));
    }
  }

  validMenuName = (_component: any, result: any) => {
    this.existMenuNameFlag = !!result;
  };

  closeAction(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(): void {
    // validaciones front
    if (this.existMenuNameFlag && this.mode !== 'edit') {
      this.messageService.showDangerMessage('MENU_FORM.NAME_EXIST');
      return;
    }

    if (!this.menuInfoForm.valid) {
      this.messageService.showDangerMessage(this.menuInfoForm.status);
      return;
    }

    const company = this.companyService.getCompany();
    if (!company || company.idCompany === undefined) {
      this.messageService.showDangerMessage('MENU_FORM.COMPANY_REQUIRED');
      return;
    }

    // Build payload
    const payload: any = this.menuInfoForm.getRawValue();
    // payload.idCompany = company.idCompany;
    payload.createAt = this.utils.getDateToISO(payload.createAt);
    payload.lastModif = this.utils.getDateToISO(payload.lastModif);

    if (this.mode === 'edit' && this.menu?.idMenu) {
      payload.idMenu = this.menu.idMenu;
      payload.lastModifUser = this.userLoggedServiceService.getUserName();

      this.wsMenuService.updateMenu(this.utils, payload).subscribe(
        this.utils.subscribeHandler(this, () => {
          this.type = 'success';
          this.message = this.translate.instant('MENU_FORM.EDIT_SUCCESS', { name: payload.name });
          (document.getElementById('modalSuccess') as HTMLElement)?.click();
        })
      );
    } else {
      payload.createUser = this.userLoggedServiceService.getUserName();

      this.wsMenuService.addMenu(this.utils, payload).subscribe(
        this.utils.subscribeHandler(this, () => {
          this.type = 'success';
          this.message = this.translate.instant('MENU_FORM.ADD_SUCCESS', { name: payload.name });
          (document.getElementById('modalSuccess') as HTMLElement)?.click();
        })
      );
    }
  }

  actualizarHora(): void {
    const ahora = new Date();
    this.menuInfoForm.patchValue({
      createAt: ahora,
      lastModif: ahora
    });
  }

  getCompany(): string {
    return this.companyService.getCompany().commercialName;
  }

  onMenuSelected(menu: MenuBean): void {
     
    if (!menu) return;
    const idMenu: any = menu.idMenu;
    this.menuInfoForm.get('idParentMenu')?.setValue(idMenu);
  }

  onScreenSelected(screen: ScreenBean): void {
     
    if (!screen) return;
    const idScreen: any = screen.idScreen;
    this.menuInfoForm.get('idScreen')?.setValue(idScreen);
  }
}
