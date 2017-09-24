import {Component} from '@angular/core';
import { NgModel, COMMON_DIRECTIVES} from '@angular/common';
import {Http, Response,Headers} from '@angular/http';
import 'rxjs/operator';
import {MainValidator} from './validators/validator'
import {Observable} from 'rxjs/Observable';
import {CanActivate} from '@angular/router-deprecated';
import {tokenNotExpired} from 'angular2-jwt';
import {FORM_DIRECTIVES, Control, ControlGroup, Validators,FormBuilder, NgIf} from '@angular/common'

@Component({
    selector:'new-sub',
    directives:[NgModel, COMMON_DIRECTIVES, FORM_DIRECTIVES, NgIf],
    template:`
    
    <div class="container">
    <div class="form">
    <form [ngFormModel]="form" method="POST" role="form" (ngSubmit)="onSubmit(input)" >
    <div>
    <input maxlength="10" minlength="2"#subname="ngForm" type="text" #input class="form-control" ngControl="subname">
    <div *ngIf="subname.touched && subname.errors">
    <div *ngIf="subname.errors.cannotContainSpace" class="alert alert-danger">Cannot contain space</div>
    </div>
    <button class="btn btn-primary" >Submit</button>
    </div>
    </form>
    </div>
    </div>
    `
})
@CanActivate(()=>tokenNotExpired())
export class newsub{
    form: ControlGroup;
tester:any;
subExists:boolean;
  
  constructor(private _http:Http, formBuilder:FormBuilder){
      this.form=formBuilder.group({
          subname: ['', MainValidator.CannotContainSpace]
      })
         
  };
  logErr(err){
      console.log(err);
  };
  onSubmit(data:HTMLInputElement){
      console.log('Start of onSubmit. Does the rest work? If yes, there should be a done message in the console.');
        this.tester="data="+ data.value;
        console.log(this.tester);
        
       
      
      var headers=new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this._http.post('http://localhost:3000/tested', this.tester, {headers:headers})
      .map(res=>res.json())
      .subscribe(
          function(_body){if(_body="showAlert"){this.subExists=true}else{this.subExists=false}},
          err=>console.log(err),
          ()=>console.log('done')
      )
      if(this.subExists=true){window.alert('This sub already exists!')}
      console.log('dones')
  }
};
