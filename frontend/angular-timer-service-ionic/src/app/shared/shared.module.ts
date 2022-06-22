import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedRoutingModule} from './shared-routing.module';
import {HeaderComponent} from "./components/header/header.component";
import {NotFoundComponent} from "./pages/errors/not-found/not-found.component";
import {IonicModule} from "@ionic/angular";
import {FormErrorsComponent} from "./components/form-errors/form-errors.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FormErrorsComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    FormErrorsComponent
  ]
})
export class SharedModule {
}
