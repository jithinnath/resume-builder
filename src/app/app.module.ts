import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResumeCanvasComponent } from './resume-canvas/resume-canvas.component';
import {MatCardModule} from '@angular/material/card';
import { PdfMakeComponent } from './pdf-make/pdf-make.component';
import { ResumeUIComponent } from './resume-ui/resume-ui.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    AppComponent,
    ResumeCanvasComponent,
    PdfMakeComponent,
    ResumeUIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
