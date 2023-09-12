import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import {NameDialogService} from './name-dialog.service';
import { NameDialogComponent } from './name-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatFormFieldModule
  ],
    declarations: [
        NameDialogComponent,
    ],
    providers: [ NameDialogService],
    entryComponents: [
        NameDialogComponent,
    ]
})
export class NameDialogModule {  }
