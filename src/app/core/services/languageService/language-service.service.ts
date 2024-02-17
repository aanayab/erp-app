import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {

  constructor() {
    debugger;
    const language = localStorage.getItem("SESSIONERPAPPI18N");
    if (language !== undefined && language !== null) {
      this.language = language;
      localStorage.removeItem("SESSIONERPAPPI18N");
    }else{
      this.setLanguage("es");
    }

  }

  private language: string | any;


  getLanguageObs(): Observable<string> {
    return of(this.language);
  }

  getLanguage(): string {
    return this.language;
  }

  setLanguage(language: string | any) {    
    this.language = language;
  }
}
