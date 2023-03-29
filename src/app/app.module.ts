import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DossierComponent } from './dossier/dossier.component';
import { DossierDetailsComponent } from './dossier-details/dossier-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxDragResizeModule} from 'ngx-drag-resize';




@NgModule({
  declarations: [
    AppComponent,
    DossierComponent,
    DossierDetailsComponent
  ],
  imports: [
    NgxDragResizeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
