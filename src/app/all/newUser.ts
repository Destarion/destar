import {Component, OnInit,Output,EventEmitter,Input} from '@angular/core';
import {Http,Headers} from '@angular/http';
import {RouterLink,RouteParams} from '@angular/router-deprecated';
import {NgFor,NgIf} from '@angular/common';
import 'rxjs/operator';
import {Observable} from 'rxjs/Observable';
@Component({
selector:'new-user',
template:`
<div class="container">
<div class="form">
<form role="form">
<h3 class="header">Write the application letter here</h3>
    <label>Content<textarea class="form-control" #newtext></textarea></label>
<button class="btn btn-primary btn-sm" (click)="onSubmit(newtext)">click</button>
</form>
</div>
</div>
`
})
export class newUser{
userName:string
subName:string
constructor(private _http:Http){
this.userName = 'raphael.baudeu@gmail.com';
this.subName = "all";
}
onSubmit(text){
    console.log('text : '+text)
    console.log('The value of the text is : '+text.value);
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var send = JSON.stringify({text:text.value,userName:this.userName,subName:this.subName})
    this._http.post('/userDemand',send,{headers:headers})
    .map(res=>res.json())
    .subscribe(
        (data)=>console.log(data),
        (err)=>console.log(err),
        ()=>console.log('Finished on server and client side')
    )
}
}