
import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES, RouteParams, RouterLink, Route} from '@angular/router-deprecated';
import {NgIf, NgFor} from '@angular/common';


 

class Article{
  
  title: string;
  link: string;
  votes : number;
  text:string
  constructor(title : string, link: string,  text: string, votes?: number){
    this.title = title;
   this.link = link;
    this.votes = votes || 0;
    this.text = text;
    
  }
  voteUp(){this.votes +=1};
  voteDown(){this.votes -=1};
}

@Component({
  selector: 'reddit-aricle',
  
  inputs:['article'],
  directives:[NgIf],
  host: {
    class: 'row'
  },
  
template:'var a=1;'

      
})
class ArticleComponent {
  article : Article;
  
 
  voteUp(){this.article.voteUp(); return false};
  voteDown(){this.article.voteDown(); return false};
 
}


@Component({
  selector: 'reddit',
  
  template:`
<div class="container">
  <h2>Welcome to the page of{{id}}</h2>
  <div>
  <ul class="list-group">
  <li class="list-group-item">
   <div class="pull-right" >
   <label>Close: <button 
  class="btn btn-primary "
   #button 
   (click)="reclicked(button)">close</button></label>
   </div>
    <div class="pull-right" ><label>Add article: <button 
  class="btn btn-primary"
   #button 
   (click)="clicked(button)">add</button></label>
   </div></li>
  
  </ul>
  </div>
   </div>
   
 <div>
  <div class='container'>
  <div class="form-group" *ngIf="button.clicked">
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
    </div>
    <div class="ui grid posts">
      <reddit-article *ngFor='#article of articles' [article] = 'article'>
      </reddit-article>
    </div>
     </div>
    `,
  directives: [ArticleComponent, RouterLink, NgFor],
  
    
})
export class dsqd {
articles : Article[];
id: any;
  constructor( private _RouteSegment:RouteParams) {
    this.id = this._RouteSegment.get['id'];
    
    this.articles = [
      
      new Article('angular', 'http://angular.io', '', 100), new Article('google', 'https://google.com', '',100)
      
      
    ]
    
  }
  addArticle(title : HTMLInputElement, link: HTMLInputElement, text: HTMLInputElement){
    
    this.articles.push(new Article(title.value, link.value, text.value)); 
    title.value = '';
    link.value = '';
    text.value = ''
  }
clicked(button){
  button.clicked=true;
  
 
}
reclicked(button){
  button.clicked=false;
}
}