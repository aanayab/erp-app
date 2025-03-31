import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { IdleServiceService } from 'src/app/services/helpers/idleService/idle-service.service';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { PrivilegyService } from 'src/app/services/helpers/privilegy/privilegy.service';
import { MenuService } from 'src/app/services/helpers/menu/menu.service';
import { LanguageServiceService } from 'src/app/services/helpers/languageService/language-service.service';
import { WsAuthenticateService } from 'src/app/services/ws-authenticate/ws-authenticate.service';
import { Utils } from 'src/app/util/utils';
import { IdleModalComponent } from './components/idle-modal/idle-modal.component';
  import { TranslateService } from '@ngx-translate/core';
import { RouteService } from 'src/app/services/helpers/routeServices/route-services';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {


 
  // call this event handler before browser refresh
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    

    if (this.router.url.toUpperCase() !== "/LOGIN" && this.router.url.split("?")[0].toUpperCase() !== "/CONFIRMATION" && this.router.url.toUpperCase() !== "/PLOGIN") {
      this.utils.processRefresh();
    }
  }



  constructor(private idle: Idle, private keepalive: Keepalive,
    private dialog: MatDialog, private idleServiceService: IdleServiceService,
     private userLoggedServiceService: UserLoggedServiceService, private router: Router,
     private companyService:CompanyService,private privilegyService:PrivilegyService,private menuService:MenuService
     ,private languageServiceService:LanguageServiceService, private wsAuthenticateService:WsAuthenticateService
     ,private utils:Utils, private translate:TranslateService,private elementRef: ElementRef,private routeService:RouteService
     ,private languageService:LanguageServiceService) {
      translate.addLangs(['en','es','de','fr','ja','ru']);
      translate.setDefaultLang(this.languageService.getLanguage())


    // sets an idle timeout of 5 seconds, for testing purposes.1800:Utils
    this.idle.setIdle(1800);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.10
    this.idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    // this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleServiceService.idleState = 'APP.NO_LONGER_IDLE'

      this.reset();
    });

    this.idle.onTimeout.subscribe(() => {
      this.dialog.closeAll();
      this.idleServiceService.idleState = 'APP.TIMED_OUT';
      this.idleServiceService.timedOut = true;
     
      this.utils.logOut();


    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleServiceService.idleState = 'APP.YOU_HAVE_GONE_IDLE'
      this.openDialog(this);
    });



    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleServiceService.idleState =   this.translate.instant('APP.YOU_WILL_TIME_OUT', {
        value1: countdown,
      });
      console.log(this.idleServiceService.idleState);
    });
    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => this.idleServiceService.lastPing = new Date());

    this.userLoggedServiceService.getUserLoggedIn().subscribe(userLoggedIn => {
      if (userLoggedIn) {
        this.idle.watch()
        this.idleServiceService.timedOut = false;
      } else {
        this.idle.stop();
      }
    })




  }


  ngAfterViewInit() {
   this.utils.changeTheme();
  }



  stay() {
    this.dialog.closeAll();
    this.reset();
    this.refresh();
  }

  setRefresh(component: any, result: string) {
  
    component.userLoggedServiceService.setToken(result);
  }

  refresh() {
    this.wsAuthenticateService.refesh(this.utils.getUsername(),this.utils)
      .subscribe(this.utils.subscribeHandler(this, this.setRefresh,() =>this.router.navigate(['/Login']))
      );
  }

  exit() {
    this.dialog.closeAll()
    this.userLoggedServiceService.setUserLoggedIn(false);
    this.router.navigate(['/Login']);
  }


  openDialog(component: any): void {
    this.dialog.open(IdleModalComponent, {
      data: component,
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      disableClose: true
    });
  }

  reset() {
    this.idle.watch();   
    this.idleServiceService.timedOut = false;

  }





  ngOnInit(): void {
    this.idle.watch();

  }




}








