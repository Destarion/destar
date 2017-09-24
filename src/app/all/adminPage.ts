import {Component, OnInit,Output,EventEmitter,Input} from '@angular/core';
import {Http,Headers} from '@angular/http';
import {RouterLink,RouteParams} from '@angular/router-deprecated';
import {NgFor,NgIf} from '@angular/common';
import 'rxjs/operator';
import {Observable} from 'rxjs/Observable';
//This file is where all the actions of the admin exist

//test, to be deleted
/*
@Component({
    selector:'test',
    template:`
    <p>test</p>
    `
})
class test{

}*/

@Component({
selector:'child-admin',
template:`
<div *ngIf="choose === false">
User:{{ user }}:
{{ content }}
<button class="btn btn-secondary btn-sm" (click)="acceptUser()">accept</button>
<button class="btn btn-secondary btn-sm" (click)="refuseUser()"></button>
</div>
`
})
class chilAdmin{
@Input() user:any;
@Input() content:any;
@Input() idx:number=1;
@Output() chosen = new EventEmitter();
@Output() init = new EventEmitter();
choose:boolean;

constructor(private _http:Http){this.choose = false;}
ngOnInit(){
this.init.emit({idx:this.idx});
}
acceptUser(){
var headers = new Headers();
headers.append('Content-Type','application/json');
var send = JSON.stringify({subName:'all',name:'raphael.baudeu@gmail.com'});
this._http.post('/newMember',send,{headers:headers})
.map(res=>res.json())
.subscribe(
    (data)=>console.log(data),
    (err)=>console.log(err),
    ()=>console.log('finished')
)
this.choose = true;
this.chosen.emit({data:this.user})
}
refuseUser(){
console.log('user refused');
this.choose = true;
this.chosen.emit({data:this.user})
}
}


@Component({
selector:"admin-page",
directives:[NgFor,NgIf,chilAdmin],
template:`
<div class="container">
<child-admin [content]="content" [user]="user" [idx]="idx" *ngFor="let child of children;let idx = index" (chosen)="onChosen($event.data)" (init)="onChildInit($event.idx)"></child-admin>
</div>
`
})
export class adminPage{
    thing:any
    content:any;
    user:any
    tests:any[];
    test:string;
    testArray:any[];
    contains:any;
idx:number;
children:{content:string,user:string}[];
child:{content:string,user:string}

constructor(private _http:Http){
    
}

ngOnInit(){
    this.thing=[];
    this.testArray=[]
    console.log('testArray onInit : '+Array.isArray(this.testArray));
    console.log('thing onInit : '+Array.isArray(this.thing))

    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var send = JSON.stringify({subName:"all"})
    this._http.post('/adminInit',send,{headers:headers})
    .map(res=>res.json())
    .subscribe(
        (data)=>{console.log(data);
         console.log('the demands : '+data.content);
        data.content.forEach((data)=>{
         var found = false;
         console.log('before anything, value of found : '+found)
         for(var i=0;i< this.testArray.length;i++){
             console.log('this.testArray[i].user : '+this.testArray[i].user)
         if(this.testArray[i].user=data.user){
             console.log('inside if = true')
            found = true;

         }
         }
         console.log('before if/else loop, value of found : '+found)
         if(found==false){
             console.log('inside found = false')
             this.testArray.push(data)}
             else{
                 console.log('already existing')
             
         }
         })

         this.children = this.testArray;   
         this.children.forEach((child)=>{
             console.log('inside the loop, value is : '+child.content)
         })
        },
        (err)=>console.log(err),
        ()=>console.log('finished both client and server-side')
    )
}
onChildInit(idx){
    console.log('idx of particular child : '+idx);
    this.content = this.children[idx].content;
    this.user = this.children[idx].user;
}
onChosen(data){
    console.log('the user to be removed is : '+data);
    this.children.forEach((child,index)=>{
        if(child.user=data){
        this.children.splice(index,1);
        console.log('spliced!');
        }

        var headers = new Headers();
    headers.append('Content-Type','application/json');
    var send = JSON.stringify({user:data,subName:'all'});
    this._http.post('/deleteUserDemand',send,{headers:headers})
    .map(res=>res.json())
    .subscribe(
       (data)=>console.log(data),
       (err)=>console.log(err),
       ()=>console.log('finshed on client and server side')
    )
    })
    
}
}