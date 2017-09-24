import {Component, OnInit,Output,EventEmitter,Input} from '@angular/core';
import {Http,Headers} from '@angular/http';
import {RouterLink,RouteParams} from '@angular/router-deprecated';
import {NgFor,NgIf} from '@angular/common';
import 'rxjs/operator';
import {Observable} from 'rxjs/Observable';
@Component({
selector:"admin-Options",
directives:[NgIf,NgFor],
template:`
<div>
<input type="text" #texttest>
</div>
<div class="container">
<div>
<label>Users need to apply for membership?</label>
<div class="radio">
<label>Yes, Moderators and Admins need to accept a request<input type="radio" name="opt" class="radio-choice" #membershipYes></label>
    </div>
    <div class="radio">
<label>No, membership is accessible without applying<input type="radio" #membershipNo class="radio-choice" name="opt"></label>
        </div>
    <div>
    <label>Who can do what action?</label>
    <div class="radio">
    <label>Only members can ask questions<input name="opt2" type="radio" class="radio-choice" #questionMemberOnly></label>
            </div>
        <div class="radio">
    <label>Visitors of the subPage can also ask questions<input name="opt2" type="radio" class="radio-choice" #questionVisitorsToo></label>
            </div>
    </div>
    <button class="btn btn-primary" (click)="onApply(membershipYes,membershipNo,questionVisitorsToo,questionMemberOnly)">apply</button>
</div>
`
})
export class adminOptions{
    memberRequest:boolean;
    subPage:string="all";
    questionVisitors:boolean;
constructor(private _http:Http){
    //This is to be changed by a check from the server soon
this.memberRequest = true;
this.questionVisitors = true;
}
ngOnInit(){
var headers = new Headers();
headers.append("Content-Type","application/json");
var send = JSON.stringify({subName:this.subPage});
this._http.post("adminOptionsInit",send,{headers:headers})
.map(res=>res.json())
.subscribe(
    (data)=>{console.log(data)
    this.memberRequest=data.memberRequest;
    this.questionVisitors=data.questionVisitors;    
    },
    (err)=>console.log(err),
    ()=>console.log("The function adminOptionsInit is finished both on the client and server side")
)

}
onApply(yes,no,questionYes,questionNo){
    console.log("yes:")
    console.log(yes.checked,no.checked,questionYes.checked,questionNo.checked)
    console.log('the yes and the no values: '+yes, no.value,questionYes.value,questionNo.value);
    var yesValue = yes.checked;
    var noValue = no.checked;
    if(yes.checked == true){
        console.log("The user has chosen to have an apply-based model.")
        this.memberRequest = true;
    }else if(no.checked == true){
        console.log("The user has chosen to have a non-apply-based model.");
        this.memberRequest = false;
    }
    if(questionYes.checked == true){
        console.log("The question is for all");
        this.questionVisitors = true
    }else if(questionNo.checked == true){
        console.log("Questions only for members");
        this.questionVisitors = false;
    }
    var send = JSON.stringify({subPage:"all",memberRequest:this.memberRequest,questionVisitors:this.questionVisitors});
    var headers = new Headers();
    headers.append("Content-Type","application/json")
    this._http.post("subpageOptionsChanged",send,{headers:headers})
    .map(res=>res.json())
    .subscribe(
        (data)=>{console.log(data)},
        (err)=>console.log(err),
        ()=>console.log("subpageOptionsChanged finished both on the client and server side")
    );

 
}
}