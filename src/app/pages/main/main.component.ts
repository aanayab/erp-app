import { ChangeDetectorRef, Component } from '@angular/core';
import { filter } from 'rxjs/operators';

import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { PrivilegyService } from 'src/app/services/helpers/privilegy/privilegy.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  panelOpenState = true;
  color: String | any;
  backgroundUrl: string | null = null;
  isImageReady = false;
  constructor(public companyService: CompanyService, public privilegyService: PrivilegyService, private utils: Utils
    , private cd: ChangeDetectorRef
  ) {

    // this.utils.validate();
  }
  ngOnInit(): void {
    //  setTimeout(() => {
    this.companyService.getCompanyObs().pipe(
      filter(company => !!company?.image?.data)
    ).subscribe(company => {
      if (company) {
        console.log('Imagen cargada:', company.image.data.slice(0, 50));
        this.backgroundUrl = 'data:image/jpeg;base64,' + company.image.data;
        this.isImageReady = true;
        this.cd.detectChanges(); // 🔁 fuerza actualización del DOM si es necesario
      }
    });
    //    }, 2000);
    // if (this.companySrvice.getCompany().image.data) {
    //   const byteArray = new Uint8Array(this.companySrvice.getCompany().image.data); // Asegúrate de que sea Uint8Array
    //   const blob = new Blob([byteArray], { type: 'image/jpeg' }); // o 'image/png'
    //   const reader = new FileReader();

    //   reader.onload = () => {
    //     this.backgroundUrl = reader.result as string;
    //   };

    //   reader.readAsDataURL(blob);
    // }




  }

  // ngOnDestroy(): void {
  //   URL.revokeObjectURL(this.backgroundUrl);
  // }

}
