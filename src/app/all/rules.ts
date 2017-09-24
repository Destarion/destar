import {Component,OnInit} from '@angular/core';
import {NgIf, NgFor, Location} from '@angular/common';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/operator';
import {Observable} from 'rxjs/Observable';
import {RouteConfig} from '@angular/router-deprecated';
import {addComments} from './comments.ts';
@Component({
selector:"rules",
template:`<div class="container">
<div class="form">
    <form role="form">
    <textarea name='text' #newtext></textarea>
        <button class="btn btn-primary" (click)="changeRules(newtext)">submit</button>
    </form>
    </div>
</div>
    <div class="container">
    {{ rule }}
    </div>`
})
export class Rules{
    rule = "dummy text";

constructor(private _http:Http){

};
ngOnInit(){
    console.log("This is the rule: "+ this.rule);
      console.log('starting ngOnInit');
var headers = new Headers();
    var subName = JSON.stringify({subName:'all'});
    headers.append('Content-Type','application/json');
    this._http.post('/getRules',subName,{headers:headers})
    .map(res=>{return res.json()})
    .subscribe(
        (data)=>{console.log("second data: " + data.data);this.rule = data.data;console.log(data.data)},
        (err)=>console.log(err),
        ()=>console.log('success')
    )
  };
changeRules(text){
    var text = text.value;
    var subName = 'all';
    var send = JSON.stringify({text:text,subName:subName})
    var headers =new Headers();
    headers.append('Content-Type','application/json');
    this._http.post('/changeRules',send,{headers:headers})
    .map(res=>res.json())
    .subscribe(
        (data)=>console.log(data),
        (err)=>console.log(err),
        ()=>console.log('Changing of the rules is complete')
    )
}
}