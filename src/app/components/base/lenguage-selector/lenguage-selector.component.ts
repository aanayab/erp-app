import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from 'src/app/core/services/languageService/language-service.service';

@Component({
  selector: 'app-lenguage-selector',
  templateUrl: './lenguage-selector.component.html',
  styleUrls: ['./lenguage-selector.component.css']
})
export class LenguageSelectorComponent {


 constructor(public translate: TranslateService,private languageService:LanguageServiceService ){ 
    translate.addLangs(['en','es']);
    translate.setDefaultLang(this.languageService.getLanguage())
    
 
   }
 
   switchLenguage(lang:string){
    
     this.translate.use(lang);
     this.languageService.setLanguage(lang);
   }

}
