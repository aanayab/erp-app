import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {


  private route!: Route;

  constructor(
  ){
    
    const route = localStorage.getItem("SESSIONERPAPPROUTE");
    if (route !== undefined && route !== null) {
      this.route = JSON.parse(route);
      localStorage.removeItem("SESSIONERPAPPROUTE");
    }

  }
 

  getRouteObs():  Observable<Route> {
    return of(this.route);
  }

  getRoute():  Route {
    return this.route;
  }

  setRoute(route:Route | any){
    this.route = route;

  }
}
