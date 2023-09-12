import { NgModule } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class MaterialModule { }
