import { Component,ViewChild,ElementRef  } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/core/services/helpers/loading/loading.service';




@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  @ViewChild("content",{static:true}) content?:ElementRef;
  ngOnInit() {
  // this.open(this.content);
  this.loadingService.setContent(this.content);   
  }
 

  
	constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
		private loadingService:LoadingService
	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

	open(content:any) {
		this.modalService.open(content,{ centered: true,windowClass: 'hidden-modal'});
	}

	close() {
		this.modalService.dismissAll();
	}


	ngAfterViewInit(): void {
		
	  }
}

