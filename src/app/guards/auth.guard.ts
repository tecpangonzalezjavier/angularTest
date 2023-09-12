import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { RestClientService } from "../common/services/rest-client/rest-client.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private rest: RestClientService, private router: Router) {
  }


  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.rest.isAuthorized()){
      return true;
    }
    this.router.navigate(['/'])
    return false
  }

  hasUser():boolean{
    return false
  }

}
