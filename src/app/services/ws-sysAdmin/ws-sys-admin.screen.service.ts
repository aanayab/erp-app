import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../../model/token';
import { Utils } from '../../util/utils';
import { ScreenBean } from 'src/app/model/screenBean';
import { LoadingService } from 'src/app/services/helpers/loading/loading.service';
import { ResponseBean } from '../../model/responseBean';
import { EmailBean } from '../../model/emailBean';
import { ConfirmationEmailBean } from '../../model/confirmationEmailBean';
import { useAnimation } from '@angular/animations';
import { environment } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class WsSysAdminScreenService {



  private screenUrl =  environment.wsSysAdmin.screen.screenUrl;
  private addScreenUrl =  environment.wsSysAdmin.screen.addScreenUrl;
  private updateScreenUrl =  environment.wsSysAdmin.screen.updateScreenUrl;
  private screensUrl =  environment.wsSysAdmin.screen.screensUrl;
  private disabelEnableScreenUrl =  environment.wsSysAdmin.screen.disableEnableScreenUrl;
  private existScreenUrl =  environment.wsSysAdmin.screen.existScreenUrl;
  private deleteScreenUrl =  environment.wsSysAdmin.screen.deleteScreenUrl;
  private screensEnabledUrl = environment.wsSysAdmin.screen.screensEnabledUrl;
  private updateScreensOrderUrl = environment.wsSysAdmin.screen.updateScreensOrderUrl;


  constructor(private http: HttpClient, private loadingService: LoadingService) { }




  getScreen(screen: string,utils:Utils): Observable<HttpResponse<ScreenBean>> {
    this.loadingService.setLoading(true);
    return this.http.get<ScreenBean>(this.screenUrl + screen , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

    getScreens(utils:Utils): Observable<HttpResponse<ScreenBean[]>> {
      this.loadingService.setLoading(true);
      return this.http.get<ScreenBean[]>(this.screensUrl , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }

    getScreensEnabled(utils:Utils): Observable<HttpResponse<ScreenBean[]>> {
      this.loadingService.setLoading(true);
      return this.http.get<ScreenBean[]>(this.screensEnabledUrl , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }

  addScreen(utils:Utils,screenBean:ScreenBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.addScreenUrl,screenBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  updateScreen(utils:Utils,screenBean:ScreenBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.put<ResponseBean>(this.updateScreenUrl,screenBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }



  disableEnableScreen(utils:Utils,screen:string | any,enable:boolean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.disabelEnableScreenUrl,{screen,enable} , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }



  deleteScreen(utils:Utils,screen:string | any): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.delete<ResponseBean>(this.deleteScreenUrl , {
      headers: utils.getBearerToken(),
      observe: 'response',
      body: {screen}
    });
  }

  existScreen(screen: string | any,utils:Utils): Observable<HttpResponse<Token>> {
    this.loadingService.setLoading(true);
    return this.http
      .get<Token>(this.existScreenUrl + screen,  {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
  }

    updateScreenSOrder(utils:Utils,screenBean:ScreenBean[]): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.put<ResponseBean>(this.updateScreensOrderUrl,screenBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

}

