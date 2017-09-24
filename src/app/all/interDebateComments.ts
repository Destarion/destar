import {Component, OnInit,Input} from '@angular/core';
import {Http,Headers} from '@angular/http';
import {RouterLink,RouteParams} from '@angular/router-deprecated';
import {NgFor} from '@angular/common';
import 'rxjs/operator';
import {Observable} from 'rxjs/Observable';

class Comment{
    id:String;
    author:String;
    content:String;
    authorRole:String;
    authorSubPage:String;
    parent:any
    constructor(id:string,author:string,content:string,authorRole:string,authorSubPage:string,parent:any){
        this.parent = parent;
        console.log("the parent is here: "+this.parent)
        this.id = id;
        this.author = author;
        this.content = content;
        this.authorRole = authorRole;
        this.authorSubPage = authorSubPage;
        
    }
}

@Component({
    selector:'reddit-inter-page-comment',
    inputs:['comment'],
    host:{
        class:'row'
    },
    template:`
    <div class='container'>
    <div class='panel panel-default'>
    <div class='panel-body'>
    <div class='row-fluid'>
    {{comment.author}}
    </div>
    <div class='row-fluid'>
    {{comment.content}}
    </div>
    </div>
    </div>

    <div *ngIf="comment.parent != undefined ">
    <form>
    <div class="form" role="form">
    <label>respond: </label><input type="text" class="input" #childinput>
    </div>
    </form>
    <button class="btn btn-primary btn-sm" (click)="addChild(childinput.value)">respond</button>
    </div>
    </div>
    `
})
class CommentComponent{

    @Input() role:string;
    debate:string;
    comment: Comment;
    
    subName:string="all"
    constructor(private _http:Http,private _routeParams:RouteParams){this.debate = this._routeParams.get("id");}


    addChild(value){
        console.log("a new child comment is to be added, here is its id: "+this.comment.id);
        var send = JSON.stringify({id:this.comment.id,subName:this.subName,debate:this.debate,author:"raphael.baudeu@gmail.com",authorRole:this.role,authorSubPage:this.comment.authorSubPage,content:value});
        var headers = new Headers();
        headers.append("Content-Type","application/json");
        this._http.post("interDebateChildComment",send,{headers:headers})
        .map(res=>res.json())
        .subscribe(
            (data)=>{console.log(data)},
            (err)=>console.log(err),
            ()=>console.log("the interDebateChildComment function is finished both on the client and server side")
        )
    }
}

@Component({
    selector:'add-inter-page-comment',
    directives: [CommentComponent,RouterLink,NgFor],
    template:`
    <div class='container'>
    <div class='form'>
    <form role='form'>
    <textarea name='text' #newtext></textarea>
    <button class="btn btn-primary" (click)="addComment(newtext)">submit</button>
    </form>
    </div>
    </div>
    <div class="container">
    <div class="ui grid post">
    <reddit-inter-page-comment *ngFor='#comment of comments' [comment] = 'comment' [role]="role" >
    </reddit-inter-page-comment>
    </div>
    </div>
    `
})
export class addInterPageComments{
    debate:string;
    comments:Comment[];
    role:any;
    subName:String;
    profile:String;
    title:String;
    author:any;
    content:any;
    id:any;
    roles:any[];
    constructor(private _http:Http, private _routeParams:RouteParams){
        this.id = this._routeParams.get("id");
        this.subName='all';
       this.profile="raphael.baudeu@gmail.com";
        console.log(this.profile);
        this.comments = [];
    }
    ngOnInit(){

        //get the roles of the subPage users, used to determine
//what need be shown

//In progress, to be deleted, we are now loading the comments from the comments Schema, therefore we 
//will need to also send the comments schemas from the server into the ngInit.

var headers= new Headers();
headers.append("Content-Type",'application/json');
var send = JSON.stringify({subName:this.subName});
this._http.post('/allRolesInit',send,{headers:headers})
.map(res=>res.json())
.subscribe(
  (data)=>{console.log(data);
    console.log('-------------------------------')
  console.log('data.roles and its typeof : '+data+", "+typeof JSON.stringify(data));
  console.log('-------------------------------')
  this.roles = data
  this.roles.forEach((role,index)=>{
    if(role.name == this.profile){
      this.role = role.role
      
    };
  })
  },
  (err)=>console.log(err),
  ()=>console.log('allRolesInit finished on server and client side')
)
        
        var headers = new Headers();
      headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({subName:'all',id:this.id})
        this._http.post('/interDebateCommentInit',send,{headers:headers})
        .map(res=>res.json())
        .subscribe(
          data=>{
              console.log('The data will be shown here');
              console.log(data);
            data.forEach((comment)=>{
                var authorRole = comment.AuthorRole;
                var authorSubPage = comment.AuthorSubPage;
                var content = comment.content;
                var author = comment.Author
                var id = comment._id;
                var parent = comment.ParentId;
           this.comments.push(new Comment(id,author,content,authorRole,authorSubPage,parent));
           });
            },
         err=>console.log(err),
          ()=>console.log('The comment section was succesfully initialized')
        )
    }
    addComment(input:HTMLInputElement){
        console.log('adding comments started');
        var profile = this.profile;
        var send = JSON.stringify({data:input.value,subName:'all',id:this.id, profile:'raphael.baudeu@gmail.com',authorRole:this.role})
         var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post('/interDebateComments',send,{headers:headers})
        .map(res=>res.json())
        .subscribe(
            (data)=>console.log(data),
            (err)=>console.log(err),
            ()=>console.log('finished')
            
        )
       
        
    }
}