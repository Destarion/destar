import {Component} from '@angular/core';
import {RedditRules} from '../RedditRules/addrules';
import {RedditApp} from '../all/all';
import {Conservative} from '../conservative/conservative';
import {newsub} from '../newsub/newsub';
import {addComments} from'../all/comments'
import {Rules} from '../all/rules';
import {addDebateComments} from '../all/debates';
import {userList} from '../all/userList'
import {RouteConfig,RouterOutlet,ROUTER_DIRECTIVES,Router } from '@angular/router-deprecated';
import {newUser} from '../all/newUser';
import {adminPage} from '../all/adminPage';
import {adminOptions} from '../all/adminOptions';
import {addInterPageComments} from '../all/interDebateComments.ts'
import {lol}from '../mktest/lol/lol.ts';import {dsqd}from '../mktest/dsqd/dsqd.ts';import {tdes}from '../mktest/tdes/tdes.ts';import {help}from '../mktest/help/help.ts';import {es}from '../mktest/es/es.ts';import {goodone}from '../mktest/goodone/goodone.ts';var a=1;
//The var is used as a way of localization for the place to put newly generated subs.

@RouteConfig([
  {path:'/intercomments',name:'InterPageDebateComments',component:addInterPageComments},
  {path:'/options',name:'AdminOptions',component:adminOptions,},
  {path:'/:id', name:'Reddit',component: RedditApp},
  {path:'/', name:'RedditPages',component: RedditApp,useAsDefault:true},
  {path:'/adminpage',name:"AdminPage",component:adminPage},
  {path:'/newuser',name:'NewUser',component:newUser},
  {path:'/userlist',name:'UserList',component:userList},
  {path:'/rules',name:'Rules',component:Rules},
  {path:'/comments/:id',name:'Comments',component:addComments},
  {path:'/debatecomments/:id',name:'DebateComments',component:addDebateComments},
  {path:'/conservative', component:Conservative},
  {path:'/addsub', name:'AddSub', component:newsub},
  {path:'/addrules',name:'AddRules', component:RedditRules},
  {path:'/lol', component:lol},{path:'/dsqd', component:dsqd},{path:'/tdes', component:tdes},{path:'/help', component:help},{path:'/es', component:es},{path:'/goodone', component:goodone},//test;;;
        //The test is a localizator for the place to put the routeConfig of the new sub.                                                                                 
])
@Component({
  selector:'all-component',
  directives:[RouterOutlet,ROUTER_DIRECTIVES],
  template:`
  <router-outlet>
  </router-outlet>
  `
})
export class AllComponent{
 
}
                                                                                                                                                                                                                                     