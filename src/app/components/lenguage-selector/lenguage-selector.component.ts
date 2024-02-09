import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lenguage-selector',
  templateUrl: './lenguage-selector.component.html',
  styleUrls: ['./lenguage-selector.component.css']
})
export class LenguageSelectorComponent {


 constructor(public translate: TranslateService ){ 
    translate.addLangs(['en','es']);
    translate.setDefaultLang('es')
    
 
   }
 
   switchLenguage(lang:string){
    
     this.translate.use(lang);
   }

}
