import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../../helpers/languageService/language-service.service';

@Pipe({
  name: 'localizedDate',
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService,private languageServiceService:LanguageServiceService) {}

  transform(value: Date | string, format = 'mediumDate'): string | any {
    
    const datePipe = new DatePipe(this.languageServiceService.getLanguage());
    return datePipe.transform(value, format);
  }
}
