import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  //=> Basic usage (forRoot can also take options, see the wiki)
  imports: [SweetAlert2Module.forRoot()],

  //=> In submodules only:

})
export class Sweetalert2Module { }
