import { Injectable,ElementRef } from '@angular/core';
import { NgbModalConfig,NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

 private content?:ElementRef;

  constructor(config: NgbModalConfig,private modalService: NgbModal) {
    config.backdrop = 'static';
		config.keyboard = false;
   }

   setContent(content:any){
    this.content = content;
   }

   setLoading(loading: boolean): void {
      if(loading){
      this.modalService.open(this.content,{ centered: true,windowClass: 'hidden-modal'});
    }else
      this.modalService.dismissAll();
    }
}
