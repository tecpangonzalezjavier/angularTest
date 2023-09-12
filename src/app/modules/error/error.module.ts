import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class ErrorModule { }
