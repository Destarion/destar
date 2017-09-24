import { Component,Injectable,OnInit,AfterViewChecked,AfterContentInit,AfterContentChecked,EventEmitter,Output,ViewChildren,ViewChild,ElementRef,AfterViewInit,QueryList,Input } from '@angular/core';
import { RedditRules } from '../RedditRules/addrules';
import {ROUTER_DIRECTIVES, RouteParams, RouterLink,Router} from '@angular/router-deprecated';
import {NgIf, NgFor, Location,NgModel,FORM_DIRECTIVES,NgClass,Control,ControlGroup,FormBuilder,Validator} from '@angular/common';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/operator';
import {Observable} from 'rxjs/Observable';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {RouteConfig} from '@angular/router-deprecated';
import {addComments} from './comments';
import {Rules} from './rules';
import {DropdownModule} from 'ngx-dropdown';
import {Renderer} from '@angular/core';

//The following has the purpouse of taking all the elements that are to be rendered, and 
//render them accordingly. We will use the idx of the current element(it is retreived through the help of an input)
//to find the right one to render.
@Component({
  selector:'articles-array',
  template:`
<div *ngIf="article.type=='question'">
  <div class='fluid-container'>
<div class="panel panel-default">
<div class="panel-body">
    <div class="col-md-1" id="special-col-left">
    <div class="col-md-9" id="special-col-img">
        <img src="../assets/img/8963.png" id="arrow-head-img" class="img-fluid">
        </div>
        <div class="col-md-3" id="special-col">
{{ article.votes }}
</div>
    </div>
      <div class="col-md-11" id="special-col-right">
                 <div id="body-header">
              <a href (click)="voteUp()">upvote</a><a href (click)="voteDown()">downvote</a>
    </div>
            {{article.title  }}<p>  </p>
          <a [routerLink]=" ['../Comments',{ id:article.commentsId }] " >Comments</a>
    </div>
    </div>
    </div>
    </div>
  </div>

  <div *ngIf="article.type=='article'">
  <div class='fluid-container'>
<div class="panel panel-default">
<div class="panel-body">
    <div class="row-fluid">
        <div class="ui statistic">
          <div class="value">Pointsarticle: {{ article.votes }}</div>
          
        </div>
      <div class="col-md-8">
        <a class="" href="{{ article.link }}"> {{ article.title }}</a>
        <ul class="ui big horizontal list voters">
          <li class="item">
            <a href (click)="voteUp()">
              <i class="glyphicon-arrow-up"></i> upvote
            </a>
          </li>
          <li class="item">
            <a href (click)="voteDown()">
              <i class="glyphicon-arrow-down"></i>
              downvote
            </a>
          </li>
          <li class="item">
          <a [routerLink]=" ['../Comments',{ id:article.commentsId }] " >Comments</a>
          </li>
      </ul>
      <p>{{ article.text }}</p>
    </div>
    <div *ngIf="works === true">
<button clas="btn btn-primary btn-sm" (click)="onDelete()">delete</button>
</div>
    </div>
    </div>
    </div>
    </div>
  </div>

  <div *ngIf="article.type=='interDebate'">
  <div class='fluid-container'>
<div class="panel panel-default">
<div class="panel-body">
    <div class="row-fluid">
        <div class="ui statistic">
          <div class="value">Points: {{ article.votes }}</div>
          
        </div>
      <div class="col-md-8">
        <a> Debate:{{ article.title }}</a>
        <ul class="ui big horizontal list voters">
          <li class="item">
            <a href (click)="voteUp()">
              <i class="glyphicon-arrow-up"></i> upvote
            </a>
          </li>
          <li class="item">
            <a href (click)="voteDown()">
              <i class="glyphicon-arrow-down"></i>
              downvote
            </a>
          </li>
          <li class="item">
          <a [routerLink]=" ['../InterPageDebateComments',{ id:article.commentsId }] " >Debate It!</a>
          </li>
      </ul>
      <p>{{ article.text }}</p>
    </div>
    </div>
    </div>
    </div>
    </div>
  </div>

  <div *ngIf="article.type=='debate'">
  <div class='fluid-container'>
<div class="panel panel-default">
<div class="panel-body">
    <div class="row-fluid">
        <div class="ui statistic">
          <div class="value">Points: {{ article.votes }}</div>
          
        </div>
      <div class="col-md-8">
        <a> Debate:{{ article.title }}</a>
        <ul class="ui big horizontal list voters">
          <li class="item">
            <a href (click)="voteUp()">
              <i class="glyphicon-arrow-up"></i> upvote
            </a>
          </li>
          <li class="item">
            <a href (click)="voteDown()">
              <i class="glyphicon-arrow-down"></i>
              downvote
            </a>
          </li>
          <li class="item">
          <a [routerLink]=" ['../DebateComments',{ id:article.commentsId }] " >Debate It!</a>
          </li>
      </ul>
      <p>{{ article.text }}</p>
    </div>
    </div>
    </div>
    </div>
    </div>
  </div>
  `,
  directives:[NgIf],
})
class articlesArray{
  article:any;
  @Input() test:any;
  @Input() idx:number;
  @Input() array:any[];
  constructor(private _http: Http){
    
  };
  ngOnInit(){
    console.log("for one of them, the idx: "+this.idx)
    this.article = this.array[this.idx];
      //console.log("at the start of the childcomponent, the value of a: "+this.article.a)
  }
}




//The following is what is used for the question asking, which can also, if wished by admin,
//be used by non-members. This, with the debate, radio poll and articles should all be moved
//to separate files, with if possible one component per file.

class Question{
  commentsId:string;
  id:string;
  title: string;
  votes : number;
  text:string;
  author:string;
  constructor(commentsId:string,id:string,title : string,  text: string,author:string, votes?: number){
    this.commentsId = commentsId
    this.author=author;
    this.id = id;
    this.title = title;
    this.votes = votes || 0;
    this.text = text;
    console.log("inside Question component, the commentsId: "+this.commentsId);
    
  }
  voteUp(){this.votes +=1};
  voteDown(){this.votes -=1};
}

@Component({
  selector: 'reddit-question',
  inputs:['question'],
  directives:[NgIf], 
  host: {
    class: 'row'
  },
  
template: `
<div class='fluid-container'>
<div class="panel panel-default">
<div class="panel-body">
    <div class="row-fluid">
        <div class="ui statistic">
          <div class="value">Points: {{ question.votes }}</div>
          
        </div>
      <div class="col-md-8">
         <h4>{{ question.title }}</h4>
        <ul class="ui big horizontal list voters">
          <li class="item">
            <a href (click)="voteUp()">
              <i class="glyphicon-arrow-up"></i> upvote
            </a>
          </li>
          <li class="item">
            <a href (click)="voteDown()">
              <i class="glyphicon-arrow-down"></i>
              downvote
            </a>
          </li>
          <li class="item">
          <a [routerLink]=" ['../Comments',{ id:question.title }] " >Comments</a>
          </li>
      </ul>
      <p>{{ question.text }}</p>
    </div>
    </div>
    </div>
    </div>
    </div>
      `
})
class QuestionComponent {
  question : Question;
  subName: any;
  constructor(private _http: Http){
    this.subName = 'all';
  };
  voteUp(){this.question.voteUp(); return false};
  voteDown(){this.question.voteDown(); return false};
  

}


//End of question


//§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
//Inside here is all the radio stuff

//-
//In order to use keyup or another method for the changing of values in an array, a better understanding of the
//output method is to be acquired, as currently such a change would result in the value being undefined in the parent
//Component. I have a suspiscion it has to do with the time it takes the event to finish, as the problem is present 
//even with the button as the event starter IF there are more than one value passed to the parent Component.
//-

//Question Component
@Component({
selector:'radio-question',
template:`
<div>
<h4>Question</h4>
<input type="text" #newquestion>
<button class="btn" (click)="onClick(newquestion.value)">add</button>
`
})
class radioQuestion{
  @Output() questionEvent = new EventEmitter();
constructor(){}
onClick(value){
  this.questionEvent.emit({value:value});
}
}

//Radio possible answers component
@Component({
  selector:'radio-component',
  template:`
<div>
<input type="text" #newradiotext >
<button class="btn btn-primary" (click)="onKey(newradiotext.value)">add</button>
</div>  
  `
})
class Radio{
  value:string;

  @Output() change = new EventEmitter();
  constructor(){
    
  };
onKey(value){
  console.log('This is the value inside the ChildComponent '+value)
this.change.emit({value:value});


};

};
//§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§

//The following sections is what is used for the debateArticles. The logic however is present
//In the RedditApp class.This part should be moved to it's own file to prevent to large files.
class Debate{
  id:string;
  commentsId:string;
  title: string;
  text:string;
  author:string;
  votes:number;
  constructor(id:string,commentsId:string,title : string,  text: string,author:string, votes?: number){
    this.id= id;
    this.commentsId = commentsId
    this.author = author
    this.title = title;
    this.votes = votes || 0;
    this.text = text;
    
  }
  voteUp(){this.votes +=1};
  voteDown(){this.votes -=1};
}

@Component({
  selector: 'reddit-debate',
  inputs:['debate'],
  directives:[NgIf], 
  host: {
    class: 'row'
  },
  
template: `
<div class='fluid-container'>
<div class="panel panel-default">
<div class="panel-body">
    <div class="row-fluid">
        <div class="ui statistic">
          <div class="value">Points: {{ debate.votes }}</div>
          
        </div>
      <div class="col-md-8">
        <a> Debate:{{ debate.title }}</a>
        <ul class="ui big horizontal list voters">
          <li class="item">
            <a href (click)="voteUp()">
              <i class="glyphicon-arrow-up"></i> upvote
            </a>
          </li>
          <li class="item">
            <a href (click)="voteDown()">
              <i class="glyphicon-arrow-down"></i>
              downvote
            </a>
          </li>
          <li class="item">
          <a [routerLink]=" ['../DebateComments',{ id:debate.title }] " >Debate It!</a>
          </li>
      </ul>
      <p>{{ debate.text }}</p>
    </div>
    </div>
    </div>
    </div>
    </div>
      `
})
class DebateComponent {
  debate : Debate;
  subName: any;
  constructor(private _http: Http){
    this.subName = 'all';
  };
  voteUp(){this.debate.voteUp(); return false};
  voteDown(){this.debate.voteDown(); return false};
};
//End of the debateArticle section.

//The following sections is what is used for the interdebateArticles. The logic however is present
//In the RedditApp class.This part should be moved to it's own file to prevent to large files.

//the problem is somewhere in here (there are things in the all component that I put in comments and are to be reverted before testing)
class InterDebate{
  
  title: string;
  text:string;
  votes:number;
  author:string;
  authorRole:string;
  authorSubPage:string;
  constructor(title : string,  text: string, author:string, authorRole:string, authorSubPage:string, votes?: number){
    this.title = title;
    this.text = text;
    this.author = author;
    this.authorRole = authorRole
    this.authorSubPage = authorSubPage;
    this.votes = votes || 0;
    
  }
  voteUp(){this.votes +=1};
  voteDown(){this.votes -=1};
}

@Component({
  selector: 'reddit-inter-debate',
  inputs:['interdebate'],
  directives:[NgIf], 
  host: {
    class: 'row'
  },
  
template: `
<div class='fluid-container'>
<div class="panel panel-default">
<div class="panel-body">
    <div class="row-fluid">
        <div class="ui statistic">
          <div class="value">Points: {{ interdebate.votes }}</div>
          
        </div>
      <div class="col-md-8">
        <a> Debate:{{ interdebate.title }}</a>
        <ul class="ui big horizontal list voters">
          <li class="item">
            <a href (click)="voteUp()">
              <i class="glyphicon-arrow-up"></i> upvote
            </a>
          </li>
          <li class="item">
            <a href (click)="voteDown()">
              <i class="glyphicon-arrow-down"></i>
              downvote
            </a>
          </li>
          <li class="item">
          <a [routerLink]=" ['../InterPageDebateComments',{ id:interdebate.title }] " >Debate It!</a>
          </li>
      </ul>
      <p>{{ interdebate.text }}</p>
    </div>
    </div>
    </div>
    </div>
    </div>
      `
})
class InterDebateComponent {
  interdebate : InterDebate;
  subName: any;
  constructor(private _http: Http){
    this.subName = 'all';
    console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;: ")
  };
  voteUp(){this.interdebate.voteUp(); return false};
  voteDown(){this.interdebate.voteDown(); return false};
};





//Must check to see if this and the member class can be deleted.
export class Results{
  title:String;
  link:String;
  text:String;
}

 
class Member{
  name:string;
  constructor(name:string){
    this.name=name
  }
}

class Article{
  commentsId:any;
  id:any;
  title: string;
  link: string;
  votes : number;
  text:string;
  author:string;
  constructor(commentsId:any,id:any,title : string, link: string,  text: string, author, votes?: number){
    this.commentsId=commentsId
    this.id=id;
    this.title = title;
    this.author = author;
   this.link = link;
    this.votes = votes || 0;
    this.text = text;
    
  }
  voteUp(){this.votes +=1};
  voteDown(){this.votes -=1};
}

@Component({
  selector: 'reddit-article',
  inputs:['article'],
  directives:[NgIf], 
  host: {
    class: 'row'
  },
  
template: `
<div class='fluid-container'>
<div class="panel panel-default">
<div class="panel-body">
    <div class="row-fluid">
        <div class="ui statistic">
          <div class="value">Points: {{ article.votes }}</div>
          
        </div>
      <div class="col-md-8">
        <a class="" href="{{ article.link }}"> {{ article.title }}</a>
        <ul class="ui big horizontal list voters">
          <li class="item">
            <a href (click)="voteUp()">
              <i class="glyphicon-arrow-up"></i> upvote
            </a>
          </li>
          <li class="item">
            <a href (click)="voteDown()">
              <i class="glyphicon-arrow-down"></i>
              downvote
            </a>
          </li>
          <li class="item">
          <a [routerLink]=" ['../Comments',{ id:article.title }] " >Comments</a>
          </li>
      </ul>
      <p>{{ article.text }}</p>
    </div>
    <div *ngIf="works === true">
<button clas="btn btn-primary btn-sm" (click)="onDelete()">delete</button>
</div>
    </div>
    </div>
    </div>
    </div>
      `
})
class ArticleComponent {
  article : Article;
  subName: any;
  test:boolean;
  works:boolean;
  false:boolean=false
  @Output() initEvent = new EventEmitter();
 @Output() deleteEvent = new EventEmitter();
  @Input() authorRole:any;
 @Input() userRole:any
  constructor(private _http: Http){
    this.subName = 'all';
    this.test = true
  };
  voteUp(){this.article.voteUp(); return false};
  voteDown(){this.article.voteDown(); return false};
 ngAfterContentInit(){

   console.log('---------------------------')
   console.log('One article has been inited, this.userRole: '+this.userRole);
   console.log('---------------------------')
   this.initEvent.emit({});
   console.log('emited.');
   if(this.userRole == "Officer" || this.userRole == "Admin"){
     console.log("The user is an officer or an admin");
     if(this.authorRole == this.userRole){
       console.log('users have the same role');
       if(this.authorRole !== "admin"){
         console.log("We can finally have works = true");
         this.works = true;
       }else{console.log("the user and the author were both admins, there cannot be a delte");this.works = false};
     }console.log("We do not hace the same rank, one of them must be an officer and the other an admin.")
     if(this.userRole == "Admin"){
       console.log("We can now delete, as the user is an admin and the author is an officer.");
       this.works = true;
     }
   }else{console.log("Works must be false as the user is neither an officer nor an admin.");
   this.works = false;}
   console.log("OnInit finished")
 }
onDelete(){
  console.log('the Delete function was started on the child component.');
  this.deleteEvent.emit({})
}
}



@Component({
  selector: 'reddit',
  directives: [articlesArray,NgModel,InterDebateComponent,NgClass,ArticleComponent,DebateComponent,Radio, RedditRules, RouterLink, NgFor,NgModel,radioQuestion,QuestionComponent,ROUTER_DIRECTIVES],
  template: `
  <div class="alert alert-warning" *ngIf="warningWrongUrl">
  This Subpage does not exist, you will be redirected to the Main Page
  </div>
<!-- Modal -->
<div *ngIf="modal==true">
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
      <div class="control-group" role="form">
      <div class="form-control">
      <label><input type="text" let newmodaltext>your userName</label>
      </div>
      <div class="form-control">
      <textarea let newmodaltextarea></textarea>
      </div>
      <div class="form-control">
      <button class="btn btn-primary btn-sm" (click)="onModalClick(newmodaltext.value,newmodaltextarea.value)">submit</button>
      </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>





  <div class="container-fluid">
      <div>
  <h2>Welcome to the page of{{id}}</h2>
  <div>
  <ul class="list-group">
  
  </ul>
  </div>
   </div>

<!-- Showing the parents of the sub -->
<div>
<a href="http://localhost:3000/{{pathname}}">{{pathname}}</a><p>/</p>
<a *ngIf="parent1 != false" href="http://localhost:3000/{{parent1}}">{{parent1}}/</a>
<a *ngIf="parent2 != false" href="http://localhost:3000/{{parent2}}">{{parent2}}/</a>
<a *ngIf="parent3 != false" href="http://localhost:3000/{{parent3}}">{{parent3}}/</a>
  
    <div class="dropdown" dropdown>
        <button class="btn btn-primary" (click)="dropdowner()">My Heroes</button>
        <ul class="{{dropdown}}">
            <li><a href="#">Badman</a></li>
<li *ngFor="let parent of arraytest;let idx = index"><a href="http://localhost/3000/{{parent}}">{{parent}}</a></li>
        </ul>
    </div>

</div>

  
  <!-- adding a new debate -->
  <!-- the ngif has been moved from the form group div, to be changed if necessary -->
    <div class='container-fluid' *ngIf="debateButton">
  <div class="form-group">
    <form class="pull-left" role="form">
        <div class="field">
          <label for="title">Debate Title:</label>
          <input name="title"  #newdebatetitle class="inputdefault">
        </div>
      <div>
      <label for="text">Text:</label>
          <input name="text"  #newdebatetext class="inputdefault">
      </div>
       <button (click)="addDebateArticle(newdebatetitle, newdebatetext)" class="btn btn-default" >
        Submit Debate
      </button>
      <label>Add a poll:</label><button (click)="addRadio()">poll</button>
      <div *ngIf="radioButton == true">
      <radio-question (questionEvent)="question($event.value)"></radio-question>
      <radio-component *ngFor="let radio of radios; let idx=index" (change)="onChange($event.value,idx)"></radio-component>
      <button class="btn btn-primary" (click)="addOption()">new Radio</button>
      </div>
    </form>
    </div>
</div>

<!-- adding a new sub -->
<div class="container-fluid" *ngIf="addNewSubBoolean">
<div class="form-group">
<form class="pull-left" role="form">
<div class="field">
<label for="title">The title of the sub:</label>
<input type="text" #newSubName class="inputdefault">
</div>
<div class="field">
<button class="btn btn-primary" id="small-button" (click)="submitNewSub(newSubName)">submit</button>

<!-- perhaps add an option to choose the admins and/or moderators of the subpage -->
    </div>
    </form>
</div>
</div>
</div>
<!-- radio to choose the kind of post one wishes to create -->
  <div clas="form-group" *ngIf="allPostOptions">
  <form class="pull-left" role="form">
  <div class="field">
  <label>debate</label><input type="radio" name="type" value="debate" #debateRadio (click)="changeDebateRadioValue()">
  <label>interPageDebate</label> <input type="radio" name="type"  value="interPageDebate" #interPageDebateRadio (click)="changeInterPageDebateRadioValue()">
  <label>article</label> <input type="radio" name="type"  value="article" #articleRadio (click)="changeArticleRadioValue()">
  <label>question</label> <input type="radio" name="type"  value="question" #questionRadio (click)="changeQuestionRadioValue()">
  <div class="alert alert-danger" *ngIf="radioNotLoggedIn">You need to be logged in to do that</div>
  <div class="alert alert-danger" *ngIf="radioNotMember">You need to be a member of this sub to post here</div>
  </div>
  </form>
  </div>

<!-- creation of a new interPageDebate post -->
  <div class='container-fluid'>
  <div class="form-group" *ngIf="interPageDebateButton">
    <form class="pull-left" role="form">
        <div class="field">
          <label for="title">Debate Title:</label>
          <input name="title"  #newinterdebatetitle class="inputdefault">
        </div> 
      <div>
      <label for="text">Text:</label>
          <input name="text"  #newinterdebatetext class="inputdefault">
      </div>
       <button (click)="addInterDebateArticle(newinterdebatetitle, newinterdebatetext)" class="btn btn-default" >
        Submit Debate</button>
        <br>
        <label>{{ subName }}</label>
        <inter-debate-component [child]="child" *ngFor="let interPage of interDebateChilds; let idx=index"(interDebateInit)="interDebateInit(idx)" (onDebateSelect)="onInterPageDebateSelect($event.value,idx)"></inter-debate-component>

    </form>
    </div>
</div>

<!-- creation of a new question post -->

<div class="form-group" *ngIf="questionButton">
    <form class="pull-left" role="form">
      <h3 class="ui header">ask a Question</h3>
        <div class="field">
          <label for="title">Title:</label>
          <input name="title"  #newtitle class="inputdefault">
        </div>
        <div class="field">
      </div>
      <div>
      <label for="text">Text:</label>
          <input name="text"  #newtext class="inputdefault">
      </div>
       <button (click)="addQuestion(newtitle, newtext)" class="btn btn-default" >
        Submit link
      </button>
    </form>
    </div>

    <!-- creation of a new article post -->

<div class="form-group" *ngIf="articleButton">
    <form class="pull-left" role="form">
      <h3 class="ui header">Add a Link</h3>
        <div class="field">
          <label for="title">Title:</label>
          <input name="title"  #newtitle class="inputdefault">
        </div>
        <div class="field">
          <label for="link">Link:</label>
          <input name="link"  #newlink class="inputdefault">
      </div>
      <div>
      <label for="text">Text:</label>
          <input name="text"  #newtext class="inputdefault">
      </div>
       <button (click)="addArticle(newtitle, newlink, newtext)" class="btn btn-default" >
        Submit link
      </button>
    </form>
    </div>

      <div class="col-md-1" *ngIf="loggedIn">
             <button (click)="addNewSub()" class="btn btn-default" >
        Create Sub
      </button>
      </div>
      <div class="col-md-1" *ngIf="loggedIn===false">
             <button class="btn btn-default" (click)="onFalseSubmit()">
        Create Sub
      </button>
      <div class="alert alert-danger" *ngIf="clickedOnSub">You need to be logged in to do that</div>
      </div>

<!--Become an Officer button, to be deleted when needed or used again if necessary
    <div class="col-md-1">
    <button class="btn btn-primary" id="small-button" (click)="newOfficer()">Become an Officer</button>
</div>
-->
             
             <div class="col-md-1">
   <button class="btn btn-primary" id="small-button" (click)=newMember()>Become a Member</button>
   <div *ngIf="newMemberNotloggedIn" class="alert alert-danger">You need to be logged in to do that</div>
   <div *ngIf="alreadyMember" class="alert alert-danger">You are already a member of this subpage</div>
   <div class="alert alert-danger" *ngIf="alreadyBrotherUser"></div>
    </div> 
<!--
 <div class="col-md-1">
   <button [routerLink]="['../NewUser']" class="btn btn-primary" id="small-button">Become a Member</button>
    </div> -->
<div class="col-md-3">
   <button class="btn btn-primary" id="small-button" (click)="newAdmin()">become an Admin</button>
    </div>


     <div class="container-fluid">
    <div class="row">
    <div class="col-md-9">
    <div class="ui grid posts"  id="custom-grid-posts">
    <articles-array [test]="test" [idx]="idx" *ngFor="let article of productionArray;let idx = index" [array]="productionArray"></articles-array>
    <a class="btn btn-primary" id="medium-button" [routerLink]="['../Reddit',{id:pageCount}]">next</a>
    </div>
        </div>
    <div class="col-md-3">
    <p>test</p>
    <div *ngIf="isAdmin">
   <button [routerLink]="['../AdminOptions']" class="btn btn-primary btn-block" id="small-button">Admin Options</button>
              <div *ngIf="role=='Admin'"> 
<button [routerLink]="['../AdminPage']" class="btn btn-primary btn-block" id="small-button">The Admin Page(dev)</button>
</div>
</div>
           <!-- thing below to be replaced -->
       <button href ="http://localhost:3000/#/all/rules" class="btn btn-primary btn-block" id="medium-button">The Rules</button>
       <button [routerLink]="['../UserList']" class="btn btn-primary btn-block" id="medium-button">List of the Members</button>
           <button class="btn btn-primary btn-block" id="big-button" (click)="allPostOptionsChange()">create a new Post</button>
   
    </div>
      </div>
         </div>



    `
    
})
export class RedditApp{
  isAdmin:boolean=false
  warningWrongUrl:boolean = false;
  dropdownBoolean:boolean=false
  dropdown:any="hidden"
  parents:{}[]=[];
  pathname:any;
  addNewSubBoolean:boolean=false;
  productionArray:any;
  pageCount:any=1;
  test:any=1;
  articlesArray:any;
  articleButton:boolean=false;
  debateButton:boolean=false;
  questionButton:boolean=false
  allPostOptions:boolean=false
  interDebateRadioValue:boolean=false;
  debateRadioValue:boolean=false;
  articleRadioValue:boolean=false;
  questionRadioValue:boolean=false;
  interdebate:any;
  interDebates:InterDebate[]
  booleanArray:any[];
  child:any;
  interPageArray:{}[];
  interDebateChilds:any[]
  interDebateChildren:boolean=false;
  interPageDebateButton:boolean=false;
  articleAuthorRole:any;
  articleUserRole:any;
  false:boolean=false;
  debateTestButton:boolean;
  modal:boolean;
  articleTestButton:boolean;
  admin:boolean;
  role:any;
  officer:boolean;
  user:boolean;
  viewer:boolean;
  questions: Question[];
  idx:number
  array:{idx:number,value:any}[];
  radios:Radio[];
articles : Article[];
radio:HTMLInputElement;
debates:Debate[];
profiler:boolean;
profile:any;
id: any;
member:any;
subName:any;
results:any;
title:any;
link:any;
text:any
radioButton:boolean;
value:any;
quest:any;
memberRequest:boolean;
questionVisitors:boolean;
parentsMod:any;
roles:{name:any,role:any}[];
noAdditionalParents:boolean=false;
parent1:any=false;
parent2:any=false;
parent3:any=false;
arraytest:any;
loggedIn:boolean=false;
clickedOnSub:boolean=false;
radioNotLoggedIn:boolean=false;
alreadyMember:boolean = false;
newMemberNotloggedIn:boolean=false;
isMember:boolean=false;
radioNotMember:boolean=false;
alreadyBrotherUser:boolean=false;

  constructor( private _RouteSegment:RouteParams, private _http:Http,private _router:Router,location:Location) {
    this.booleanArray = [];
    this.pathname = location.prepareExternalUrl(location.path())
    this.roles = [{name:"test",role:"hehe"}]
    this.modal=false;
    this.articleTestButton = false;
    this.debateTestButton = false;
    this.radio
    this.questions=[];
    //!!
    //continue here, populate questions with the server side, where all neccessary steps
    //on server and database should be made.
    this.articlesArray=[];
    this.array = [];
    this.profiler =false;
    this.radioButton=false;
    this.pageCount = this._RouteSegment.get("id");
    this.debates = [];
    this.subName='all'
    this.results=[{title:String,link:String,text:String}]
    this.radios = [new Radio,new Radio]
    var articles = this.articles;
    this.productionArray = [];
    this.arraytest=[]
    this.parentsMod = [];
    this.articles = [
      
    ]

  }

   ngOnInit(){
     //pre:subName,userName;
     //post:is the user an admin
     var headers = new Headers();
     headers.append('Content-Type','application/json')
     var send = JSON.stringify({userName:this.profile,subName:this.pathname});
     this._http.post('/isAdmin',send,{headers:headers})
     .map(res=>res.json())
     .subscribe(
       (data)=>{if(data.loggedIn==false){this.isMember=false;}else if(data.a==false){this.isAdmin=false}else if (data.a==true){this.isAdmin=true}},
       (err)=>console.log(err),
       ()=>console.log('the function to determine if the user is an admin is finished properly on both the client and server-side')
     )

          //pre:subName,userName;
     //post:is the user a member
     var headers = new Headers();
     headers.append('Content-Type','application/json')
     var send = JSON.stringify({userName:this.profile,subName:this.pathname});
     this._http.post('/isMember',send,{headers:headers})
     .map(res=>res.json())
     .subscribe(
       (data)=>{if(data.loggedIn==false){this.isMember=false;}else if(data.a==false){this.isMember=false}else if (data.a==true){this.isMember=true;console.log("is member")}},
       (err)=>console.log(err),
       ()=>console.log('the function to determine if the user is an admin is finished properly on both the client and server-side')
     )

     var headers = new Headers();
     headers.append('Content-Type','application/json');
     var send = JSON.stringify({subName:this.pathname});
     this._http.post("/doesPageExist",send,{headers:headers})
     //pre:name of the page 
     //post:redirect if the page does not exist
     .map(res=>res.json())
     .subscribe(
       (data)=>{console.log("Does the subpage exist?");if(data===false){console.log('data false');this._router.navigateByUrl('/')}},
       (err)=>console.log("err"),
       ()=>{}
     )

     var headers= new Headers();
     headers.append('Content-Type','application/json');
     var send = JSON.stringify({a:true});
     this._http.post('/isLoggedIn',send,{headers:headers})
     .map(res=>res.json())
     .subscribe(
       (data)=>{
         if(data.a===true){
           this.loggedIn=true;
           console.log("on logged in, the data.userName: "+data.userName);
           this.profile=data.userName;
         }else{
           this.loggedIn=false;
         }
       },
       (err)=>console.log(err),
       ()=>console.log("the isLoggedIn all request has been done")
     )
// Searching the name of the current subPage
// This is the section that sould use the location.path to search on the server
//to see if there is a subpage that is good with the current path, and if not
//sends an error message and an error status that translates in "subpage does not exist"
//The question is to know how to use the complex path with the different "/"
//Aswell as and perhaps more importantly how to implement it
//The solution is to simply let the user do it and then handle the route as simply a route 
//One can then, if correctly useable, use the info very well to simply
//Know all the parents of a given route 
//The only problem is then how to access the parent route, 
//Easy solution:If saved on the creation of the subpage, the parent is Easy to access thanks
//to the fact that both the parent and the child are unique


//end of the search

     if(this.pageCount==undefined){
       //post:sets pageCount to 0 if it is not stated
       this.pageCount=0;
       console.log(this.pageCount);
     }
    //Attention please! The system that has been put in place to get everything inside the articlesArray is built 
    //on top of the old system. It works but many things are obscolete and are to be deleted or replaced entirely
    //this.articlesArray.push({author:'aoi',text:'a',title:'api',type:'question'})
   //get the interPageDebates from the server and display them on the page

   //This one seems to be obscolete, to be deleted if it is so
   var headers = new Headers();
   headers.append('Content-Type','application/json');
   var send = JSON.stringify({subName:this.pathname});
   this._http.post("/interDebateFetch",send,{headers:headers})
   .map(res=>res.json())
   .subscribe(
     (data)=>{console.log("the important data: "+data);
     if(data){
       data.forEach((child,index)=>{
         console.log(child.text,child.title+"§§§§§§§§§§§§§§§")
       })}
      var title;
      data.forEach((child,index)=>{
        console.log('once inside the loop, the child: '+child.title)
        if(typeof child.title=="undefined"||typeof child.text =="undefined"||typeof child.author=="undefined"||typeof child.authorSubPage=="undefined"){
          console.log("something inside the data.forEach is wrong(one of the interDebates function), one of the values(or more)seem to be false")
        }else{
          //!!!To be deletd
          //dont quite know why this is here
         // if(title==child.title/*to be replaced with an id, as in many other places*/){
          /*  console.log("already existing")*/
          //}else{

            //!!!To be deleted
            //check if adding a new 
            //interpagedebate will result in it showing up
            //!!!
            title = child.title
        this.interDebates=[];
        this.productionArray.push({type:"interDebate",title:child.title,text:child.text,author:child.author});
        this.interDebates.push(new InterDebate(child.title,child.text,child.author,child.authorRole,child.authorSubPage));
        console.log("pushed, the interdebates: "+this.interDebates)
      }}) 
      },
     (err)=>console.log(err),
     ()=>console.log("the fetching of the interDebatePages is finished both on the client and the server side")
   )

    //what is the difference between this and the above?
    //One may be obscolete
    var headers = new Headers();
    headers.append("Content-Type","application/json");
    console.log("before the sending of the subName:" +this.pathname)
    var send = JSON.stringify({subName:this.pathname});
    this._http.post("/interPageDebateInit",send,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      (data)=>{
        console.log("useless, to get your attention!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        console.log("data children, typeof: "+data.children+typeof(data.children));
        //continue here, the problem is that the idx is used before, probably do index+1, or smthng else
        if(data.children){
          data.children.forEach((child,index)=>{
            if(child==this.subName){
              console.log("found the right child to delete");
              this.booleanArray.push({value:this.pathname,idx:index,true:true});
              data.children.splice(index,1)

            }
          })}
      this.interDebateChilds=data.children;  
      },
      (err)=>console.log(err),
      ()=>console.log("finsihed the interPageDebateInit both on the client and the server side")
    )
//Get the value of the options for this subPage
var headers = new Headers();
headers.append("Content-Type",'application/json');
var send = JSON.stringify({subName:this.pathname});
this._http.post("/optionsLoad",send,{headers:headers})
.map(res=>res.json())
.subscribe(
  (data)=>{console.log(data)
    this.memberRequest=data.memberRequest;
  this.questionVisitors=data.questionVisitors;
    console.log("§§§§§§§")
    console.log("Before anything, the values of questionVisitors and memeberRequest: "+this.questionVisitors+" "+this.memberRequest)
    console.log("§§§§§§§")},
  (err)=>console.log(err),
  ()=>console.log("optionsLoad is finsihed both on the client and server side")
);

//get the roles of the subPage users, used to determine
//what need be shown

var headers= new Headers();
headers.append("Content-Type",'application/json');
var send = JSON.stringify({subName:this.pathname});
this._http.post('/allRolesInit',send,{headers:headers})
.map(res=>res.json())
.subscribe(
  (data)=>{console.log(data);
    console.log('-------------------------------')
  console.log('data.roles and its typeof : '+data+", "+typeof JSON.stringify(data));
  console.log('-------------------------------')
  this.roles = data
  if(this.roles){
  this.roles.forEach((role,index)=>{
    if(role.name == this.profile){
      this.role = role.role
      this.articleUserRole = role.role;
      console.log('role of the user found');
    };
  })
  }},
  (err)=>console.log(err),
  ()=>console.log('allRolesInit finished on server and client side')
)

//Check if the profile is an Officer (later Checking if he is a user should be added too)
//To be updated to use the new version of the login aswell as actual login infos
var headers = new Headers();
headers.append('Content-Type','application/json');
this.profiler = false;
var subName = "all";
var send = JSON.stringify({profile:this.profile,subName:this.pathname});
this._http.post('/UserCheck',send,{headers:headers})
.map(res=>res.json())
.subscribe(
  (data)=>{console.log(data);if(data.officer = true){this.profiler = true}else{this.profiler = false}},
  (err)=>console.log(err),
  ()=>console.log('UserCheck completed without errors on client and server side')
)

    //load all the questions from the server
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var send = JSON.stringify({subName:this.pathname});
    this._http.post('/questionInit',send,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      (data)=>{console.log(data)
        if(data){
          /*
      data.forEach((question)=>{
      var title = question.title;
      var text = question.text;
      var author = question.author;
      var id = question._id;
      var questionCommentsId= this.pathname+" "+id
      console.log('question commentsId: '+ questionCommentsId);
      this.questions.push(new Question(questionCommentsId,id,title,text,author));
      this.productionArray.push({type:"question",commentsId:questionCommentsId,id:id,title:title,text:text,author:author});
      });*/

      console.log("questionInit data: "+data.truthy,data.array);
      if(data.truthy==false){

      }else if(data.truthy==true){
        data.array.forEach((question,idx)=>{
          var questionCommentsId= this.pathname+" "+question._id+" "+"question"
          console.log("one question, the questionCommentsId: "+questionCommentsId);
          this.questions.push(new Question(questionCommentsId,question._id,question.name,question.content,question.author));
          this.productionArray.push({type:"question",commentsId:questionCommentsId,id:question._id,title:question.name,text:question.content,author:question.author});
        })
      }
        };
      },
      (err)=>console.log(err),
      ()=>console.log('questionInit finsihed on both client and server side')
    );

    //load all the articles of the page
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var subName=JSON.stringify({subName:this.pathname})
    var post=this._http.post('/pageInit',subName,{headers:headers})
    .map(res=>res.json())
    .subscribe(
    (data)=>{
     /* if(data===false){
        //pre:subPage does not exist
        //post:warn user, redirect to home(for now)
        //!!!
        //1:maybe have to change the url
        //2:redirect to subreddit search
        //!!!
        console.log("data false")
        this.warningWrongUrl = true;
      this._router.navigateByUrl('http://localhost:3000/')
      }else{*/
      console.log('to be deleted; data started, the parents: '+data.parents);
      this.parents=data.parents;
      if(this.parents){
      this.parents.forEach((obj,idx)=>{
        console.log("To be deleted; in the parents, the idx: "+idx)
        console.log("*µ*µ**µ£$$£¨¨^$^$$¨^ù%ùù*µù*^£^£after the first push, the parentsMod, the type: "+typeof this.productionArray)
        if(idx==0){console.log("!!!To be deleted/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/we are in the first idx, the object: "+obj);this.parent1=obj;
        }else if(idx=1){this.parent2=obj}
        else if(idx=2){this.parent3=obj}
        //!!!to be deleted
        //The dropdown menu works, only the ngFor doesn't work.
        //This might be because it is inside an ngIf.
        //A solution is to be found to replace the ngIf.
        //maybe with the css hidden property
        //!!!
        else if(idx>2){
          this.arraytest.push(obj);
        }
      });
      };
      if(this.parentsMod.length=0){
        this.noAdditionalParents=true;
      }

      //!!!to be deleted
      //it is here where the fetching of the parent should happen
      //on the server a loop will search for a parent until there is none left and send 
      //it back in the order most to least recent parent.
      //this is then used to display with an ngFor in the template
      //there are only 2 parents(plus the actual page) to be displayed, the 
      //rest is accessible by a (...) at the end of the element
      //!!!


      //for each article renders it on the page.
      if(data.articles){
      data.articles.forEach((article)=>{
        var title = article.title;
        var link = article.link;
        var text = article.text;
        var author = article.author;
        var id= article._id
        var commentsId= this.pathname+" "+id+" "+"article";
        console.log("the commentsId: "+commentsId)
        this.articles.push(new Article(commentsId,id,title,author,link,0,text));
        // the error is that the content of the articles is labeled as undefined
        //which can be caused either by the article being itself undefined
        //or by the article to be of the wrong type
        // interesting bit of consol, after asking for the typeof the text, we get
        //this: The current article s title,text,link and author:string link  undefined
        if(typeof article.title == null || typeof article.title == undefined || typeof article.text == null || typeof article.text == undefined || typeof article.link == null || typeof article.link == undefined ){
          console.log("one article has an undefined or null title, link or text ")
        }else{
        this.productionArray.push({type:"article",commentsId:commentsId,id:id,title:title,link:link,text:text,author:author})};
       //!! I am pushing directly to the productionArray her
       //articlesArray, to be seen if this is more effective
      })
      };
    /*}*/},
      (err)=>console.log(err)
    );

    //load all the Debates of the page
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var subName=JSON.stringify({subName:this.pathname})
    var post=this._http.post('/debateInit',subName,{headers:headers})
    .map(res=>res.json())
    .subscribe(
    (data)=>{
      console.log('data started');
      //for each article renders it on the page.
   var pageCount = this.pageCount
   var articlesArray = this.articlesArray;
   var productionArray = this.productionArray;
      function callback(){
 //here the productionArray is pushed, it is here to make sure that it comes last, if not it is to be placed somewhere else.
 var number = pageCount;
      var beNumber = number*50;
   var afNumber = number+50;
   //probably to be deleted, or at the very least replaced
   if(articlesArray){
 articlesArray.forEach((obj,index)=>{
   console.log("starting one forEach obj:ù*^$^:$^:$*^$*ù:*mùp^$:^p^*")
   console.log(index)
   if(index<=afNumber && index>beNumber){
     productionArray.push(obj);
     console.log("an object was pushed in the productionArray: "+obj,index);
   }
 })
      }
      };
    if(data){
      data.forEach((debate)=>{
        //this.articlesArray.push({type:'question',title:"test",text:"testText",author:"testAuthor"})
        var title = debate.title;
        var text = debate.text;
        var author = debate.author;
        var id = debate._id;
        var commentsId= this.pathname+" "+id
        //console.log("For one of the debates, the title, text and author: "+title,text,author);
        this.debates.push(new Debate(commentsId,id,title,text,author));
        this.productionArray.push({type:"debate",commentsId,id,title:title,text:text,author:author});

      })
    };
     setTimeout(()=>{
callback();
 this.articlesArray=articlesArray;
      this.productionArray=productionArray
        console.log("!ù*ù!ù*!ùù*!ù*!^$the this.productionArray after the change: "+this.productionArray, this.productionArray.length);
      },3267);
    
      //changes the pagecount so that the page changes when clicking on "next"
this.pageCount == this.pageCount+1;
    },
      (err)=>console.log(err)
    )

 
  };

  
  addArticle(title : HTMLInputElement, link: HTMLInputElement, text: HTMLInputElement){

  console.log(title);
  console.log(title.value)
    var author = this.profile;
    var newTitle = title.value;
    var newLink = link.value;
    var newText = text.value;
    console.log("on the creation of a new article, the typeof the object of the title: "+newTitle);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(title.value)
    var send = JSON.stringify({title:title.value, link:link.value, text:text.value, subName:this.pathname,author:author})
    this._http.post('http://localhost:3000/content', send, {headers:headers})
  .map(res=>res.json())
  .subscribe(
    data=>data=send,
    err=>console.log(err),
    ()=>console.log('post adding done on both client and server side!')
  )
  };

  addQuestion(title:HTMLInputElement,text:HTMLInputElement){
    console.log('in the add method for question: title,text : '+title.value+' '+text.value);
    var send = JSON.stringify({subName:this.pathname,title:title.value,text:text.value,author:this.profile});
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    this._http.post('/questionContent',send,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      (data)=>{console.log(data)},
      (err)=>console.log(err),
      ()=>console.log('question adding finished both on client and server side')
    )
  }

  addDebateArticle(debateTitle : HTMLInputElement, debateText: HTMLInputElement){
      //Pay attention! Here are saved to the server the values of answer and question for the poll. There appears to be a problem whereas if on sends the request soon after having created the 
  //answers and questions, they are undefined, a checking system needs therefore to be put in place.

  //Pay Attention! There is ALLOT more security needed than what is spoken about on top, for example not allowing the use of the same answer twice. This is true for many other addings.

   
    var newTitle = debateTitle.value;
    var newText = debateText.value;
    var profile = this.profile;
    console.log(debateTitle.value)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(debateTitle.value)
    var send = JSON.stringify({title:debateTitle.value, text:debateText.value, subName:this.pathname,question:this.quest,answers:this.array,author:this.profile})
    this._http.post('/debateContent', send, {headers:headers})
  .map(res=>res.json())
  .subscribe(
    data=>data=send,
    err=>console.log(err),
    ()=>console.log('post adding done on both client and server side!')
  )
  }
clicked(button){
  //Continue here, doesn't open the page, perhaps the button is not correctly set to true or there is an error in the template
  console.log('user role on button click: '+this.role);
 if(this.role=="Admin"||this.role=="Officer"||this.role=="User"){
   console.log('this.articleButton before : '+this.articleTestButton)
 this.articleTestButton=true;
 console.log('this.articleButton after : '+this.articleTestButton);
 }else{
   console.log('not a good role!');
   this.modal=true;
 }
 
}
reclicked(button){
  this.articleTestButton=false;
}
clickedDebate(debatebutton){
 //Continue here, doesn't open the page, perhaps the button is not correctly set to true or there is an error in the template
  console.log('user role on button click: '+this.role);
//if(this.role==="Admin"||this.role==="Officer"||this.role==="User"){
  if('all'=='all'){
 console.log('this.debateButton before : '+this.debateTestButton)
 this.debateTestButton=true;
 console.log('this.debateButton after : '+this.debateTestButton);
 }//else{
 //  console.log('not a good role!');
   //this.modal=true;
   //console.log('this.modal: '+this.modal)
 //}
}
unclickedDebate(debatebutton){
  this.debateTestButton = false;
}
clickedQuestion(questionbutton){
  if(this.questionButton==false){
    this.questionButton=true;
  }else{
    this.questionButton=false;
  }
}

//To be destroyed, replaced
/*
newMember(){
  console.log('newMember started');
  this.profile=JSON.parse(localStorage.getItem('profile'));
  var subName ='all';
  var profile='raphael.baudeu@gmail.com'
  var member=JSON.stringify({name:profile,subName:subName})
  console.log(member);
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  this._http.post('http://localhost:3000/newMember',member, {headers:headers})
  .map(res=>{if(res.status=310){console.log('User already a member');window.alert('Already a member!')}
  else{return res.json()}})
  .subscribe(
    data=>data=member,
    err=>console.log(err),
     ()=>console.log('Procces finished!') 
      )
      console.log('finish')
      
}*/
newOfficer(){
  console.log('new Officer started');
  var profile = "raphael.baudeu@gmail.com";
  var subName = this.pathname;
  var send = JSON.stringify({profile:profile,subName:subName});
  console.log(send);
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  this._http.post('http://localhost:3000/newOfficer',send,{headers:headers})
  .map(res=>{if(res.status=310){console.log('User already a member');window.alert('Already a member!')}
  else{return res.json()}})
  .subscribe(
    data=>console.log('this is the data: '+ data),
    err=>console.log(err),
     ()=>console.log('Procces finished!') 
      )
      console.log('finish')

}
addRadio(){
  console.log('poll adding started');
this.radioButton=true;
console.log(this.radioButton)
}

addOption(){
  this.radios.push(new Radio)
}

onChange(value,idx){

    if(value===undefined){console.log('err, value undefined')}
  this.value === value;
  console.log('value '+this.value);
  console.log(this.array)
  console.log(value);
console.log(idx);
console.log('startig the adding in the array');
if(this.array.length > 0){

  console.log("starting forEach");
  if(this.array){
   this.array.forEach((el,index)=>{
    console.log('forEach started for an element');
    function findIdx(obj){
return obj.idx === idx
    }
    //The following code uses ECMAScript 6 only function array.prototype.find(),a polyfill must be added
  if(this.array.find(findIdx)!==undefined){
    if(el.idx === idx){
 console.log('the two values: '+el.value +value)
    console.log('el.indexOf started(there is an idx in the array matching the given idx)');
    //this.array.splice(idx,1,{idx:idx,value:obj.value});
    el.value=value;
    console.log(el);
    console.log(this.array[idx]);
  console.log("el.value was changed.This is it's new value: "+el.value);
    
    }
    else{console.log("Nothing to do here, it isn't the object we want to change")}
  }
  else{
    console.log('we are pushing a new value to the array, there is no idx in the array matching the current one');
    this.array.push({idx:idx,value:value});
  }
  })
  console.log(this.array);
}}
else{
  console.log('the array has no values');
  this.array.push({idx:idx,value:value});
  console.log(this.array);
  

}
console.log(this.array);
};
question(value){
  console.log(value);
  this.quest = value.value;
  console.log(this.quest);
  console.log(value.value)
}

newAdmin(){
  var send = JSON.stringify({userName:"raphael.baudeu@gmail.com",subName:this.pathname});
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  this._http.post('/newAdmin',send,{headers:headers})
  .map(res=>res.json())
  .subscribe(
    (data)=>console.log('data : '+data),
    (err)=>console.log(err),
    ()=>console.log('completed')
  )
}
onModalClick(value,content){
  console.log('onModalClick started, the value of the newmodaltext input is: '+value);
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  var send = JSON.stringify({userName:value,subName:this.pathname,text:content});
  this._http.post('/userDemand',send,{headers:headers})
  .map(res=>res.json())
  .subscribe(
    (data)=>console.log('The full data is: '+data),
    (err)=>console.log(err),
    ()=>console.log('The userDemand function is finished on the server and client side')
  )
}
articleInit(idx){
  console.log('on articleInit, the idx: '+idx);
  if(this.articles){
  this.articles.forEach((article,index)=>{
    if(idx == index){
      console.log('found correct article');
      var author = article.author
      console.log("This.roles before the forEach function started");
      console.log(": §§§§§§§§§§§§§§§§§§§§§"+this.roles)
      if(this.roles){
      this.roles.forEach((role,index)=>{
        console.log('--------------')
        console.log("We are inside the articleInit function, here is the role: "+JSON.stringify(role.name))
        console.log('--------------')
        if(role.name = author){
          console.log('the userRole was found: '+role.name);
          this.articleAuthorRole = role.role;
        }
      })
      };
      
    }
  })
  };
}
onArticleDelete(idx){
  console.log("The idx onArticleDelete is: "+idx);
  if(this.articles){
  this.articles.forEach((article,index)=>{
   if(index == idx){
     console.log('found the right idx');
     var headers = new Headers();
     headers.append('Content-Type','application/json');
     var send = JSON.stringify({subName:this.pathname,title:article.title,author:article.author});
     this._http.post('/deleteArticles',send,{headers:headers})
     .map(res=>res.json())
     .subscribe(
       (data)=>{console.log(data)},
       (err)=>console.log(err),
       ()=>console.log("deleteArticles finished both on client and server side")
     )
   }
  })
  };
}
newMember(){
  //pre:subName, userName
  //post:user either becomes a member or getes an alert saying that he is already a member/a member of another subPage
  if(this.loggedIn==false){this.newMemberNotloggedIn=true}else{
  console.log("started the newMember function");
  var headers = new Headers();
  headers.append("Content-Type","application/json");
  console.log("just before the new profile, the profile: "+this.profile)
  var send = JSON.stringify({subName:this.pathname,name:this.profile});
  this._http.post("/newMember",send,{headers:headers})
  .map(res=>res.json())
  .subscribe(
    (data)=>{if(data.a==false){console.log("the data.a is false");this.alreadyMember=true}if(data.brotherUser==true){this.alreadyBrotherUser=true}},
    (err)=>console.log(err),
    ()=>console.log("The newMember function finished both on the client and the server side")
  )
  }
}
openInterPageDebate(){
  if(this.interPageDebateButton == false){
    this.interPageDebateButton = true;
  }else if(this.interPageDebateButton == true){
    this.interPageDebateButton = false;
  }
}
onInterPageChildren(){
  if(this.interDebateChildren == false){
  this.interDebateChildren=true
}else{this.interDebateChildren=false};
}
interDebateInit(idx){
  console.log("interDebateInit started, idx: "+idx);
  console.log("!!!!!!!,second interDebateChilds, interDebateChilds[idx]: "+this.interDebateChilds,this.interDebateChilds[idx])
this.child=this.interDebateChilds[idx];
}
onInterPageDebateSelect(value,idx){
    console.log("the booleanArray, length: "+this.booleanArray)
  console.log("onInterPageDebateSelect started, the values of value, idx: "+value+idx);
  console.log("the length of the array: "+this.booleanArray.length)
  if(this.booleanArray.length>0){
    if(this.booleanArray[idx].value==this.pathname){console.log("the right one was found, nothing to be done here")}else{
      if(this.booleanArray){
  this.booleanArray.forEach((bool)=>{
    if(bool.value==value){
      console.log("inside the if/else loop, the value of bool : "+bool.true)
      if(bool.true ==true){
        console.log("inside the bool.true = true");
        bool.true = false
      }else{
        console.log("inside the bool.true = false");
        bool.true = true;
      }
    }else{
      console.log("new part added to booleanArray.");
      var newValue = this.interDebateChilds[idx]
      this.booleanArray.push({value:newValue,idx:idx,true:true});
    }
  })
      }
}}else{
    console.log("there ain't nothing inside the array.");
    this.booleanArray.push({value:value,idx:idx,true:true});
  }
  console.log("after all things, the value of this.booleanArray[idx]: "+this.booleanArray[idx].true)
}
addInterDebateArticle(title, text){
  var array = [];
  console.log("inside the addInterDebateArticle function, the values of the title,the text and the selected children: "+title.value,text.value,this.booleanArray);
  if(this.booleanArray){ 
  this.booleanArray.forEach((content)=>{
    array.push(content);
    console.log("just before the creation of the new interpagedebate, the value of the booleanArray: ")
    console.log(this.booleanArray)
  });
  };
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  var send=JSON.stringify({subName:this.pathname,content:array,text:text.value,title:title.value,author:this.profile,authorRole:this.role})
  this._http.post("/newInterPageDebate",send,{headers:headers})
  .map(res=>res.json())
  .subscribe(
    (data)=>{console.log(data)},
    (err)=>console.log(err),
    ()=>console.log("the function of newInterPageDebate finsihed both on the server and client side")
  )
};
allPostOptionsChange(){
  if(this.allPostOptions==false){
    this.allPostOptions=true;
        this.articleButton=false;
    this.questionButton=false;
  this.interPageDebateButton=false
  this.debateButton=false;
  }else{
    this.allPostOptions=false;
            this.articleButton=false;
    this.questionButton=false;
  this.interPageDebateButton=false
  this.debateButton=false;
  };
};

changeDebateRadioValue(){
  if(this.loggedIn){
    if(this.isMember || this.isAdmin){
  if(this.debateButton==false){
    this.debateButton=true;
    this.interPageDebateButton=false;
    this.questionButton=false;
    this.articleButton=false;
  }
    }else{
      this.radioNotMember=true;
    }
  }else{this.radioNotLoggedIn=true;}
};

changeInterPageDebateRadioValue(){
  if(this.loggedIn){
     if(this.isMember || this.isAdmin){
  if(this.interPageDebateButton==false){
    this.interPageDebateButton=true;
    this.questionButton=false;
  this.debateButton=false;
  this.articleButton=false;
  }
     }else{this.radioNotMember=true}
  }else{this.radioNotLoggedIn=true}
};

changeArticleRadioValue(){
  if(this.loggedIn){
     if(this.isMember || this.isAdmin){
  if(this.articleButton==false){
    this.articleButton=true;
    this.questionButton=false;
  this.interPageDebateButton=false
  this.debateButton=false;
  }
     }else{this.radioNotMember=true}
  }else{this.radioNotLoggedIn=true}
};

changeQuestionRadioValue(){
  if(this.loggedIn){
     if(this.isMember || this.isAdmin){
if(this.questionButton==false){
  this.questionButton=true;
  this.articleButton=false
  this.interPageDebateButton=false
  this.debateButton=false;
}
     }else{this.radioNotMember=true}
  }else{this.radioNotLoggedIn=true};
};

//Used to show the otherwise hidden form that allows the creation of a new sub to the current
//one
addNewSub(){
this.addNewSubBoolean =true;
}
//submit the new sub to the server for it to be saved
submitNewSub(name){
  var user=this.profile;
var parentName = this.pathname;
var headers = new Headers();
headers.append("Content-Type","application/json");
var send = JSON.stringify({name:name.value,parentName:parentName,userName:this.profile});
this._http.post('/createNewSub',send,{headers:headers})
.map(res=>{if(res.status=200){window.alert('subpage succesfully created');return res.json();}
  else{return res.json()}})
.subscribe(
  (data)=>{console.log(data);if(data.value=false){this.addNewSubBoolean=false}/*To be tested to see if the "this" is correctly used*/},
  (err)=>console.log(err),
  ()=>{console.log("the creation of the subpage is finsihed both on the client and the server")}
)
}

dropdowner(){
  if(this.dropdownBoolean==false){
    this.dropdown="";console.log('%µ%£¨£%µ%¨£¨µ%£¨µ%£¨%µ£µ¨£µ%the dropdown: '+this.dropdown)
    this.dropdownBoolean=true;
  }else if(this.dropdownBoolean==true){this.dropdown="hidden";this.dropdownBoolean=false}
};
onFalseSubmit(){
  //pre:clicked on the button to create a new sub, but not logged in
  //post:alert message
  this.clickedOnSub=true;
}


};

