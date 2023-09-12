import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AuthModule} from "./modules/auth/auth.module";
import {PagesModule} from "./modules/pages/pages.module";
import { NotFoundComponent } from "./modules/error/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ('./modules/auth/auth.module').then(m => AuthModule)
      },
      {
        path: 'pages',
        loadChildren: () => import ('./modules/pages/pages.module').then(m => PagesModule),
      },
      {
        path: 'pages',
        loadChildren: () => import ('./modules/pages/pages.module').then(com => PagesModule),
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
