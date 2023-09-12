import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { RestClientService } from "../../../common/services/rest-client/rest-client.service";
import {HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword = true;

  public FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  public formState: 'success' | 'fail' | 'blocked' | 'request' | 'clear' = 'clear';

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  constructor( public formBuilder: FormBuilder, public rest: RestClientService, private router: Router) { }

  ngOnInit(): void {
    this.FormGroup = this.formBuilder.group({
      username: [ null, Validators.compose([ Validators.required, Validators.minLength(3) ]) ],
      password: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^\S*$/ )
      ])],
    });
  }

  public authorize() {

    if ( this.FormGroup.status === 'INVALID' ) {
      const controls = [ 'username', 'password' ];
      controls.forEach((ctrl) => {
        const control = this.FormGroup.get(ctrl);
        if ( control ) {
          control.markAsTouched();
        }
      });
      return;
    }

    if ( this.formState === 'request' ) { return; }

    const data = this.FormGroup.value;
    this.formState = 'request';
    this.formLock();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    console.log('login');
    if (data){
      console.log(data)
      if (data.username == 'carlos.oviedo' && data.password=='$oyAdmin666'){
        this.rest.setToken('42n5l4bnnb52b')
        this.router.navigate(['pages'])
      }else{
        alert('datos incorrectos');
        this.formUnlock()
        this.formState = 'clear'
      }
    }

    /*this.rest.post('login',data)
      .subscribe(
        (payload) => {
          this.formUnlock();
          console.log(payload)
          this.rest.setToken('42n5l4bnnb52b')
          this.router.navigate(['pages'])
        },
        (err) => {
          if ( err.status === 403 ) {
            this.formState = 'blocked';
          } else {
            this.formState = 'fail';
          }
          this.formUnlock();
        }
      );*/

  }

  private formLock() {
    const controls = [ 'username', 'password' ];
    controls.forEach((ctrl) => {
      const control = this.FormGroup.get(ctrl);
      if ( control ) {
        control.disable();
      }
    });
  }

  /**
   * Unlock the login input forms
   */
  private formUnlock() {
    const controls = [ 'username', 'password' ];
    controls.forEach((ctrl) => {
      const control = this.FormGroup.get(ctrl);
      if ( control ) {
        control.enable();
      }
    });
  }

  public submit(e: any) {
    if ( e.keyCode === 13 ) { }
  }

  public hasError( ctrl: string, error: string): boolean {
    const control = this.FormGroup.get(ctrl);
    if ( control ) {
      return control.hasError(error);
    }
    return false;
  }


}
