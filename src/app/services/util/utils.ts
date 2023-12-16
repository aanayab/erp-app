import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class Utils {

constructor(private router: Router){}



    static getHeaders() : HttpHeaders{

        let headers = new HttpHeaders()
        .set("Access-Control-Allow-Origin", '*')
         .set("Content-Type", 'application/json')
          .set("Access-Control-Allow-Method", 'POST,PUT,GET,DELETE,OPTIONS')
          .set("Access-Control-Allow-Headers", 'access-control-allow-method,access-control-allow-origin,content-type')
        // .set("Allow",'POST,PUT,GET,DELETE,OPTIONS');
        return headers;
    }


    mangagedResponse(body:any) : any{
      if(body.tipoMensaje = 'S'){
        return body.result;
     }
        return;
    }

    subscribeResponseHandler(data:any) :  any{
     return  {
        next: (response: any) => {
          if (response.status = 200) {
            var body = response.body;
            if (body.tipoMensaje = 'S') {              
              data = body.result;
            } else {
             let mensaje:string = body.mensaje;
             //mandar alerta de mensaje 
              console.log(mensaje);
            }
   
          }
        },
        error: (e: any) => {
         
          // mandar mensaje de error
          console.log(e.message);
        }
     }

      

    }
  
    subscribeErrorHandler(e:any){
      

    }
  

     getSession(){
        const session = localStorage.getItem('SESSIONERPAPPTK');
        if(session ==null || session == undefined){
            this.router.navigate(['/']);
        }
    }

}
