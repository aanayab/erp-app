import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from 'src/app/services/helpers/languageService/language-service.service';

@Component({
  selector: 'app-lenguage-selector',
  templateUrl: './lenguage-selector.component.html',
  styleUrls: ['./lenguage-selector.component.css']
})
export class LenguageSelectorComponent {


 constructor(public translate: TranslateService,private languageService:LanguageServiceService ){ 
    }
 
   switchLenguage(lang:string){
    
     this.translate.use(lang);
     this.languageService.setLanguage(lang);
   }

}
