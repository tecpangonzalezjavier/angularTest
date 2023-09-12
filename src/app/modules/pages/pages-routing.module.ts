import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PagesComponent} from "./pages.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ConversionsComponent} from "./conversions/conversions.component";
import {DateComponent} from "./date/date.component";
import {FormComponent} from "./form/form.component";
import {AuthGuard} from "../../guards/auth.guard";


export const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {
        path: '',
        redirectTo: 'welcome'
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'conversions',
        component: ConversionsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'date',
        component: DateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'form',
        component: FormComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
