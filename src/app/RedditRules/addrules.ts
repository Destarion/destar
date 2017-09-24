import { Component } from '@angular/core';

class Rule{
    title:string;
    text:string;
    constructor(title:string, text:string){
        
        this.title = title;
        this.text = text
        
    }
    
    
}
@Component({
    
    selector:'rules-component',
    inputs:['rule'],
    template:`
<div class='container'>
<ul class="list-group">
      <div class="col-md-12">
      <li class="list-group-item">
        <a class="" href="https://google.com"> {{ rule.title }}</a>
        </li>
    </div>
     </ul>
    </div>
      `
    
})
class RulesComponent{
    rule:Rule;
    
};
@Component({
    
    selector:"reddit-rules",
    directives:[RulesComponent],
    template:`
    <div class='container'>
    <form class="pull-left">
      <h3>Add a Link</h3>
        <div>
          <label for="title">Title:</label>
          <input name="title"  #newtitle>
        </div>
        <div class="field">
          <label for="rules">Rules:</label>
          <textarea name="rules"  #newtext></textarea>
      </div>
       <button (click)="addRules(newtitle, newtext)" class="btn btn-default">
        Submit Rules
      </button>
    </form>
    </div>
    <div class>
      <rules-component *ngFor='#rule of rules' [rule]='rule'>
      </rules-component>
    </div>
    `
    
})
export class RedditRules{
    
   rules: Rule[]
    constructor(){
     this.rules=[]
    }
    
    addRules(title: HTMLInputElement, text: HTMLInputElement){
        this.rules.push(new Rule(title.value, text.value));
        title.value='';
        text.value='';
        
    }
    
}