import {Component, OnInit,Output,EventEmitter,Input} from '@angular/core';
import {Http,Headers} from '@angular/http';
import {RouterLink,RouteParams} from '@angular/router-deprecated';
import {NgFor,NgIf} from '@angular/common';
import 'rxjs/operator';
import {Observable} from 'rxjs/Observable';
@Component({
selector:"child-list",
directives:[NgIf],
template:`<li>
<h4>{{ userName }}:{{ role }}</h4>
<div *ngIf="admin === true ">
<button class="btn btn-secondary" (click)="promote()">promote</button>
</div>
</li>
`
})
class childList{
    admin:boolean;
    test:any;
    user:any;
    @Input() admins:any;
    @Input() userName:any;
    @Input() idx:number;
    @Input() role:any;
    @Output() init = new EventEmitter();
constructor(private _http:Http){
    this.admin=false
    this.user="raphael.baudeu@gmail.com"
this.userName = 'test';
this.test="test";
console.log(this.userName);
}
ngOnInit(){
    console.log('idx : '+this.idx);
this.init.emit({idx:this.idx});
if(this.role="admin"){
this.admin=true
}
}
//add the newAdmin function here
}

@Component({
selector:"user-list",
directives:[childList,NgFor],
template:`
<div class="container">
<div class="list-group">
<child-list [idx]="idx" *ngFor="#user of users; let idx=index" [admins]="admins" (init)="onChildInit($event.idx)" [userName]="userName" [role]="role"></child-list>
</div>
</div>
`
})
export class userList{
users : [{name:any,role:any}];
idx:any;
admins:any[];
officers:any[];
user:{name:any,role:any};
userName:any;
role:any;

constructor(private _http:Http){};
ngOnInit(){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var send = JSON.stringify({subName:'all'});
    this._http.post('/userListInit',send,{headers:headers})
    .map(res=>res.json())
    .subscribe(
        (data)=>{console.log('the data : '+data);this.users = data.userList;this.admins=data.adminList;this.officers=data.officerList},
        (err)=>console.log(err),
        ()=>console.log('finished')
    );
};
onChildInit(idx){
    //Pay attention! Except if a better method were to be found, we first check if the user is a moderator
    //and then if he is an admin so as to make sure that the highest role possible is attributed to the user
    console.log('onChildInit in parent : '+idx);
    
        console.log('this.userName[idx] : '+this.users[idx])
        this.userName = this.users[idx];
        this.role="user";
        this.officers.forEach((officer)=>{
            if(officer = this.users[idx]){
                this.role="officer";
            }
        });
        this.admins.forEach((admin)=>{
            if(admin=this.users[idx]){
                if(admin !== this.userName){
                this.role="admin";
                }else{
                    console.log('this person is already an admin')
                }
            };
        });
        
    
};
};