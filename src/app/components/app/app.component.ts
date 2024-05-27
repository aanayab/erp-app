import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { IdleServiceService } from 'src/app/core/services/helpers/idleService/idle-service.service';
import { UserLoggedServiceService } from 'src/app/core/services/helpers/userLoggedService/user-logged-service.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/core/services/helpers/company/company.service';
import { PrivilegyService } from 'src/app/core/services/helpers/privilegy/privilegy.service';
import { MenuService } from 'src/app/core/services/helpers/menu/menu.service';
import { LanguageServiceService } from 'src/app/core/services/helpers/languageService/language-service.service';
import { WsAuthenticateService } from 'src/app/core/services/ws-authenticate/ws-authenticate.service';
import { Utils } from 'src/app/core/util/utils';
import { IdleModalComponent } from '../base/idle-modal/idle-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { RouteService } from 'src/app/core/services/helpers/routeServices/route-services';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {


  myValue = "Hello world!";



  // call this event handler before browser refresh
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    
    if (this.router.url !== "/Login") {
      this.utils.processRefresh();
    }
  }

  // execute this function before browser refresh



  constructor(private idle: Idle, private keepalive: Keepalive,
    private dialog: MatDialog, private idleServiceService: IdleServiceService,
     private userLoggedServiceService: UserLoggedServiceService, private router: Router,
     private companyService:CompanyService,private privilegyService:PrivilegyService,private menuService:MenuService
     ,private languageServiceService:LanguageServiceService, private wsAuthenticateService:WsAuthenticateService
     ,private utils:Utils, private translate:TranslateService,private elementRef: ElementRef,private routeService:RouteService) {



    // sets an idle timeout of 5 seconds, for testing purposes.1800:Utils
    this.idle.setIdle(1800);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.10
    this.idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    // this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleServiceService.idleState = 'NO_LONGER_IDLE'
      console.log(this.idleServiceService.idleState);
      this.reset();
    });

    this.idle.onTimeout.subscribe(() => {
      this.dialog.closeAll();
      this.idleServiceService.idleState = 'TIMED_OUT';
      this.idleServiceService.timedOut = true;
      console.log(this.idleServiceService.idleState);
      this.utils.logOut();
      // this.reset();
      // return;

    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleServiceService.idleState = 'YOU_HAVE_GONE_IDLE'
      console.log(this.idleServiceService.idleState);
      this.openDialog(this);
    });



    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleServiceService.idleState =   this.translate.instant('YOU_WILL_TIME_OUT', {
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
    // this.reset();



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
    // this.idleServiceService.resetIdle();
    // this.idleServiceService.idleState = 'started.';
    this.idleServiceService.timedOut = false;
    // this.dialog.closeAll();
  }





  ngOnInit(): void {
    this.idle.watch();
  //   window.addEventListener("keyup", disableF5);
  //   window.addEventListener("keydown", disableF5);
  
  //  function disableF5(e:any) {
  //     if ((e.which || e.keyCode) == 116) e.preventDefault(); 
  //  };

  }


  open($event: Event) {
    console.log(event);

  }

}








