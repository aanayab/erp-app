import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { IdleServiceService } from 'src/app/core/services/idleService/idle-service.service';
import { UserLoggedServiceService } from 'src/app/core/services/userLoggedService/user-logged-service.service';
import { ModalComponent } from '../base/modal/modal/modal.component';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/core/services/company/company.service';
import { PrivilegyService } from 'src/app/core/services/privilegy/privilegy.service';
import { LanguageServiceService } from 'src/app/core/services/languageService/language-service.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {


  myValue = "Hello world!";



  // call this event handler before browser refresh
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    
    if (this.router.url !== "/login") {
      this.processData();
    }
  }

  // execute this function before browser refresh
  processData() {
    
    // store data into local storage before browser refresh
    localStorage.setItem('SESSIONERPAPPUSN', this.userLoggedServiceService.getUserName());
    localStorage.setItem("SESSIONERPAPPTKN",this.userLoggedServiceService.getToken());
    localStorage.setItem("SESSIONERPAPPI18N",this.languageServiceService.getLanguage());
    localStorage.setItem("SESSIONERPAPPCMY",JSON.stringify(this.companyService.getCompany()));
    localStorage.setItem("SESSIONERPAPPPER",JSON.stringify(this.privilegyService.getPrivilegy()));
  }


  constructor(private idle: Idle, private keepalive: Keepalive,
    private dialog: MatDialog, private idleServiceService: IdleServiceService,
     private userLoggedServiceService: UserLoggedServiceService, private router: Router,
     private companyService:CompanyService,private privilegyService:PrivilegyService
     ,private languageServiceService:LanguageServiceService) {



    // sets an idle timeout of 5 seconds, for testing purposes.1800
    this.idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.10
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleServiceService.idleState = 'No longer idle.'
      console.log(this.idleServiceService.idleState);
      this.reset();
    });

    this.idle.onTimeout.subscribe(() => {
      this.dialog.closeAll();
      this.idleServiceService.idleState = 'Timed out!';
      this.idleServiceService.timedOut = true;
      console.log(this.idleServiceService.idleState);
      this.router.navigate(['/login']);
      // this.reset();
      // return;

    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleServiceService.idleState = 'You\'ve gone idle!'
      console.log(this.idleServiceService.idleState);
      this.openDialog(this);
    });



    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleServiceService.idleState = 'You will time out in ' + countdown + ' seconds!'
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




  stay() {
    this.dialog.closeAll();
    this.reset();
  }

  exit() {
    this.dialog.closeAll()
    this.userLoggedServiceService.setUserLoggedIn(false);
    this.router.navigate(['/login']);
  }


  openDialog(component: any): void {
    this.dialog.open(ModalComponent, {
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








