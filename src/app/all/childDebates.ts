import { Component,Injectable,OnInit,AfterViewChecked,AfterContentInit,AfterContentChecked,EventEmitter,Output,ViewChildren,ViewChild,ElementRef,AfterViewInit,QueryList,Input } from '@angular/core';
import { RedditRules } from '../RedditRules/addrules';
import {ROUTER_DIRECTIVES, RouteParams, RouterLink} from '@angular/router-deprecated';
import {NgIf, NgFor, Location,NgModel,FORM_DIRECTIVES,NgClass,Control,ControlGroup,FormBuilder,Validator} from '@angular/common';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/operator';
import {Observable} from 'rxjs/Observable';
import {RouteConfig} from '@angular/router-deprecated';

class Debate{
  
  title: string;
  text:string;
  votes:number;
  constructor(title : string,  text: string, votes?: number){
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



<div class='container'>
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