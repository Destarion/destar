import {Component, OnInit} from '@angular/core';
import {Http,Headers} from '@angular/http';
import {RouterLink,RouteParams} from '@angular/router-deprecated';
import {NgFor,NgIf,Location} from '@angular/common';
import 'rxjs/operator';
import {Observable} from 'rxjs/Observable';
//refutation begins
class Refutation{
    author:String;
    content:String;
    constructor(author:string,content:string){
        this.author = author;
        this.content = content;
    }
}

@Component({
    selector:'reddit-refutation',
    inputs:['refutation'],
    host:{
        class:'row'
    },
    template:`
    <div class='container'>
    <div class="row-fluid" id="comment-to-author">
    {{refutation.author}}
    <div class='row-fluid' id="author-to-comment">
    {{refutation.content}}
    </div>
    </div>
    </div>
    `
})
class RefutationComponent{
    refutation: Refutation;
    
}

//refutation ends

//comment starts
class Comment{
    Author:String;
    content:String;
    id:any;
    deepness:any;
    parentId:any;
    subName:any;
    profile:any;
    articlesId;
    constructor(Author:string,content:string,id:any,deepness:any,parentId:any,subName:any,profile:any,articlesId:any){
        this.Author = Author;
        this.content = content;
        this.id = id;
        this.deepness = deepness;
        this.parentId=parentId;
        this.subName = subName;
        this.profile = profile;
        this.articlesId = articlesId;
        //how to add the profile of the user who is posting without running into errors if there is no user logged in?
    }
}

@Component({
    selector:'reddit-comment',
    inputs:['comment'],
    host:{
        class:'row'
    },
    template:`
    <div class="col-md-{{deepness}}"></div>
    <div class="col-md-{{inverseDeepness}}">
    <div class="row-fluid" id="comment-to-author">
    {{comment.Author}}
    <div class='row-fluid' id="author-to-comment">
    {{comment.content}}
    </div>
    </div>
    <div>
    <button class="small-button" (click)="showChildComment()">reply</button>
    </div>
    <div class="alert alert-danger" *ngIf="notLoggedIn">You need to be logged in to do that</div>
    <div class="container" *ngIf="addChild">
    <textarea #textarea></textarea>
    <button class="small-button" (click)="addChildComment(textarea)">submit</button>
    </div>
    </div>
    `
})
class CommentComponent{
    comment: Comment;
    addChild:boolean=false;
    notLoggedIn:boolean=false;
    inverseDeepness:any=1
    deepness:any;
    constructor(private _http:Http){

    }
    ngOnInit(){
    var deepness = this.comment.deepness;
    if(deepness<5){
        console.log("inside 5")
        this.deepness=deepness;
        this.inverseDeepness= 12-deepness;
        console.log("deepness and stuff: "+this.comment.deepness,this.inverseDeepness)
    }else if(deepness>4){
        this.comment.deepness=4;
        this.inverseDeepness==12-this.comment.deepness;
        console.log("deepness and stuff: "+this.comment.deepness,this.inverseDeepness)
    }
    }

    showChildComment(){
        //pre:nothing,
        //post:shows the ability to add a comment
        if(this.comment.profile!="false"){
        this.addChild=true;
        }else if(this.comment.profile=="false"){
            this.addChild=false;
            this.notLoggedIn=true;
        }
    }
    addChildComment(text){
        //pre:text of the user, userName, subPage, article Name, id of parent comment
        //post:child comment saved in the database
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var send = JSON.stringify({parentId:this.comment.id,id:this.comment.articlesId,data:text.value,subName:this.comment.subName,profile:this.comment.profile})
    this._http.post('/comments',send,{headers:headers})
    .map(res=>res.json())
    .subscribe(
        (data)=>{},
        (err)=>console.log(err),
        ()=>console.log("child comment adding done on the server and client side")
    )
    }
    
}
//Comment ends

@Component({
    selector:'add-comment',
    directives: [CommentComponent,RouterLink,NgFor,NgIf,RefutationComponent],
    template:`
    <div class="container" *ngIf="positive">
    <nav class="navbar navbar-default">
    <div class="container-fluid">
    <ul class="nav navbar-nav">
    <li><button class="btn btn-primary" id="medium-button" (click)="changeToComment">Comments</button></li>
    <li><button class="btn btn-primary" id="medium-button" (click)="changeToRefutation()">Discussion</button></li>
    </ul>
    </div>
    </nav>
    <div class='form'>
    <form role='form'>
    <textarea name='text' #newtext></textarea>
    <button class="btn btn-primary" id="medium-button" *ngIf="isLoggedIn" (click)="addComment(newtext)">submit</button>
    <div *ngIf="isLoggedIn==false">
    <button class="btn btn-primary" (click)="notLoggedIn()" id="medium-button">submit</button>
    </div>
    <div class="alert alert-danger" *ngIf="notLoggedInAlert">You need to be logged in to do that</div>
    </form>
    </div>
    <div class="container">
     <div class="ui grid post">
    <reddit-comment *ngFor='#comment of comments' [comment] = 'comment'>
    </reddit-comment>
    </div>
    </div>
    </div>

    <div class='container' *ngIf="positive==false">
    <nav class="navbar navbar-default">
    <div class="container-fluid">
    <ul class="nav navbar-nav">
    <li><button class="btn btn-primary" id="medium-button" (click)="changeToComment()">Comments</button></li>
    <li><button class="btn btn-primary" id="medium-button" (click)="changeToRefutation()">Discussion</button></li>
    </ul>
    </div>
    </nav>
    <div class='form'>
    <form role='form'>
    <textarea name='text' #newrefutation></textarea>
    <button class="btn btn-primary" id="medium-button" (click)="addRefutation(newrefutation)">submit</button>
    </form>
    </div>
    <div class="container">
    <div class="ui grid post">
    <reddit-refutation *ngFor='#refutation of refutations' [refutation] = 'refutation'>
    </reddit-refutation>
    </div>
    </div>
    </div>
    `
})
export class addComments{
    notLoggedInAlert:boolean=false;
    comments:Comment[];
    subName:String;
    profile:String;
    title:String;
    refutations:Refutation[];
    author:any;
    content:any;
    id:any;
    positive:boolean;
    userName;
    isLoggedIn:boolean=false;
    articlesId:any;
    question:boolean
    constructor(private _http:Http, private _routeParams:RouteParams,location:Location){
        this.id = this._routeParams.get("id");
        console.log("the id: "+this.id)
        var cut = this.id.indexOf(" ");
        this.subName=this.id.substring(0,cut);
        this.articlesId = this.id.substring(cut+1);
        var cut2=this.articlesId.indexOf(" ");
        var articlesSave = this.articlesId;
        this.articlesId = this.articlesId.substring(0,cut2);
        this.articlesId = this.articlesId+"f"
        var question = articlesSave.substring(cut2+1);
        if(question=="question"){
        this.question=true
        }else if(question=="article"){
            this.question=false;
        }
        //the above needs heavy reconsideration//!!!
        this.userName="false";
        console.log("the question: "+articlesSave,cut2, articlesSave.substring(cut2+1) );
       //this.profile=JSON.parse(localStorage.getItem('profile')).name;
        console.log(this.profile);
        this.comments = [];
        this.refutations=[];
        this.positive=true;

    }
    ngOnInit(){

        //Comment part
        var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      //pre:subName, id of article
      //post:comments displayed
        var send = JSON.stringify({subName:this.subName,id:this.articlesId, question:this.question})
        this._http.post('/commentInit',send,{headers:headers})
        .map(res=>res.json())
        .subscribe(
          (data)=>{
              console.log('The data will be shown here'+data.array,data.truthy);
              if(data.truthy==false){}else{
                  console.log("inside true, array[0] "+data.array[0].Author)
            data.array.forEach((comment,idx)=>{
                this.comments.push(new Comment(comment.Author,comment.content,comment._id,comment.deepness,comment.parentId,comment.subName,this.userName,this.articlesId))
                var stuff;
               var array=[];
                var display = function(obj){
                   obj.forEach((child,idx)=>{
                       array.push(child);
                    //this.comments.push(new Comment(child.Author,child.content,child._id,child.deepness,child.parentId,child.subName,this.userName,this.articlesId));console.log("added, the content: "+child.content)
                    /*if(child.children!=[]){
                    display(child.children);
                    }else{}*/
                   })
               }

                display(comment.children);
                array.forEach((child,idx)=>{
                    this.comments.push(new Comment(child.Author,child.content,child._id,child.deepness,child.parentId,child.subName,this.userName,this.articlesId));console.log("added, the content: "+child.content)
                })



           /*     var content = comment.content;
                var author = comment.author
                var id = comment.id;
                var deepness = comment.deepness
           this.comments.push(new Comment(author,content,id,deepness));*/
                
           });
              };
            },
         (err)=>console.log(err),
          ()=>console.log('The comment section was succesfully initialized')
        )
        
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        var send = JSON.stringify({a:true});
        //pre:nothing
        //post:is the user logged in, if yes, what is his name
        this._http.post("/commentUserInit",send,{headers:headers})
        .map(res=>res.json())
        .subscribe(
            (data)=>{
                if(data.isAuthenticated===false){
                    this.isLoggedIn=false;
                    this.userName="false"
                }else if(data.isAuthenticated===true){
                    this.isLoggedIn=true;
                    this.userName=data.userName;
                    console.log("the new userName: "+data.userName)
                }
            },
            (err)=>console.log(err),
            ()=>console.log("the initiation of the comment pages user is finished")
        )

        //Refutation Part
        //pre:id of article, subName
        //post:the refutations are retrieved and displayed
        var headers = new Headers();
      headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({subName:this.subName,id:this.id})
        this._http.post('/commentRefutationInit',send,{headers:headers})
        .map(res=>res.json())
        .subscribe(
          (data)=>{
            data.array.forEach((refutation)=>{
                /*if(data.length==0)*/if(data.truthy==false){}else{
                console.log("the refutation stuff: "+refutation.author,refutation.content)
                var content = refutation.content;
                var author = refutation.author
         
           this.refutations.push(new Refutation(author,content));
                }
           });
            },
         (err)=>console.log(err),
          ()=>console.log('The refutation section was succesfully initialized')
        )
    }

    //Comment part
    addComment(input:HTMLInputElement){
        console.log('adding comments started');
        var profile = this.profile;
        //!!!
        //the parentId is a dummy here//
        var send = JSON.stringify({data:input.value,subName:this.subName,id:this.articlesId, profile:this.userName,parentId:"dummy",question:this.question})
         var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post('/comments',send,{headers:headers})
        .map(res=>res.json())
        .subscribe(
            (data)=>console.log(data.a),
            (err)=>console.log(err),
            ()=>console.log('finished')
            
        )
       
        
    }

//The Refuation part
    addRefutation(input:HTMLInputElement){
        console.log('adding refutations started');
        var profile = this.profile;
        var send = JSON.stringify({data:input.value,subName:'all',id:this.id, profile:'raphael.baudeu@gmail.com'})
         var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("before the post, we will show the send variable: "+send);
        this._http.post('/refutations',send,{headers:headers})
        .map(res=>res.json())
        .subscribe(
            (data)=>console.log(data),
            (err)=>console.log(err),
            ()=>console.log('finished')
            
        )
       
        
    }
    //Change to Refutation or to Comment
    changeToRefutation(){
        this.positive = false;
    }
    changeToComment(){
        this.positive=true;
    }
    notLoggedIn(){
        //pre:clicked on submit button while not logged in
        //post: displays alert message, not logged in
        this.notLoggedInAlert=true
    }
}



