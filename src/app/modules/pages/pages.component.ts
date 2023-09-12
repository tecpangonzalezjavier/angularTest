import { Component, OnInit } from '@angular/core';
import {RestClientService} from "../../common/services/rest-client/rest-client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private rest: RestClientService, private router: Router) { }

  ngOnInit(): void {
  }

  public logout(){
    this.rest.revoke();
    this.router.navigate(['/']).then(()=>{})
  }
}


