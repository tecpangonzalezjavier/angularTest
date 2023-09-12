import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormComponent } from './form/form.component';
import { ConversionsComponent } from './conversions/conversions.component';
import { DateComponent } from './date/date.component';
import { PagesComponent } from './pages.component';
import {PagesRoutingModule} from "./pages-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { NameDialogModule } from "../../common/widgets/nameModal/name-dialog.module";
import {CambioLetrasPipe} from "./cambio-letras.pipe";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";


@NgModule({
  declarations: [
    WelcomeComponent,
    FormComponent,
    ConversionsComponent,
    DateComponent,
    PagesComponent,
    CambioLetrasPipe
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    NameDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule
  ],
  exports: [
    CambioLetrasPipe
  ]
})
export class PagesModule { }
