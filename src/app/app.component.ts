// ```
// app.ts
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// app.ts may be freely distributed under the MIT license
// ```

// *src/app/app.ts*

// This file contains the main class as well as the necessary
// decorators for creating the primary `app` `component`

/*
 * Angular 2 decorators and services
 */

import {Component, ViewEncapsulation,NgZone} from '@angular/core';
import {RouteConfig, Router, ROUTER_PROVIDERS, RouterOutlet} from '@angular/router-deprecated';
import {Http, Headers, Response} from '@angular/http';
import {AppState} from './app.service';
import {AllComponent} from './allcomponent/allcomponent';
import {newsub} from './newsub/newsub';
import {Conservative} from './conservative/conservative';
import {RouterActive} from './shared/directives/router-active/router-active.directive';
import {RedditApp} from './all/all';
import {Home} from './home';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
// Import NgFor directive
import {NgFor, Location,NgIf} from '@angular/common';

// Import Todo component
import {Todo} from './todo/todo.component';

// Import Recipes component
import {Recipes} from './recipes/recipes.component';

/*
 * App Component
 * Top Level Component
 */
declare var Auth0Lock
@Component({
  selector: 'app',
  providers: [  ],
  directives: [ Todo,
                NgFor,
                RouterActive],
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  // Load our main `Sass` file into our `app` `component`
  styleUrls: [require('!style!css!sass!../sass/main.scss')],
  template: `
    <md-content>
      <md-toolbar color="primary">
          <span>{{ name }}</span>
          <span class="fill"></span>
         
      </md-toolbar>

      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading">
      </md-progress-bar>




<!-- new modal login and register form -->
<div class="container">

<a *ngIf="showLogin" href="" data-toggle="modal" data-target="#login-modal">login/register</a>
<a *ngIf="showLogin===false" href="javascript:;" (click)='onLogout()'>logout</a>

<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    	  <div class="modal-dialog">
				<div class="modal-container">

          <div *ngIf="registerChoice == false">
          <h1>Login: </h1><br>
<form>
  <div class="form-group">
    <label for="username">Username:</label>
    <input type="username" class="form-control" id="loginUsername" #loginUsername>
    <div class="alert alert-danger" *ngIf="correctLogin===false">Incorrect username or password</div>
  </div>
  <div class="form-group">
    <label for="password">Password:</label>
    <input type="password" class="form-control" id="loginPassword" #loginPassword>
    <div class="alert alert-danger" *ngIf="loginAlert">Username or Password are incorrect</div>
  </div>
  <button type="submit" class="btn btn-default" (click)="onLoginFormSubmit(loginUsername,loginPassword,modal)">Submit</button>
</form>
</div>
					
             
             <div *ngIf="registerChoice">
             <h1>Register: </h1><br>
<form>
  <div class="form-group">
    <label for="username">Username:</label>
    <input type="username" class="form-control" id="registerUsername" #registerUsername>
    <div class="alert alert-danger" *ngIf="registerUsernameAlert"><p>Username already exists</p></div>
  </div>
  <div class="form-group">
    <label for="password">Password:</label>
    <input type="password" class="form-control" id="registerPassword" #registerPassword (focusout)="registerFocusPasswordOut(registerPassword)">
    <div class="alert alert-danger" *ngIf="registerPasswordLength===false">The password should contain at least 7 characters</div>
  </div>
  <div *ngIf="canRegister">
  <button type="submit" class="btn btn-default" (click)="onRegisterFormSubmit(registerUsername,registerPassword,modal)">Submit</button>
  </div>
  <div *ngIf="canRegister===false">
  <button class="btn btn-default">Submit</button>
  </div>
</form>

  </div>
</div>



				  <div class="login-help">
          <div *ngIf="registerChoice">
					<button class="btn btn-primary" id="small-button" (click)="registerOrLogin()">login</button>
				  </div>
                    <div *ngIf="registerChoice == false">
					<button class="btn btn-primary" id="small-button" (click)="registerOrLogin()">register</button>
				  </div>
          </div>
				</div>
			</div>
        </div>

      <router-outlet></router-outlet>

      <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

      <footer>
        <img [src]="angularLogo" width="7%">
        <span>Angular 2 MEAN Webpack Starter by <a [href]="url">@datatype_void</a></span>
      </footer>
    </md-content>


  `
})
//DO NOT FORGET TO ADD A FEATURE TO RETREIVE A LOST PASSWORD

//I HAVE TO KNOW HOW TO USE SESSIONS TO ACCESS IF A USER IS LOGGED IN OR NOT
@RouteConfig([
  { path:'/', name:'Common', component:Conservative,useAsDefault:true },
  { path: '/all/...', name:'All',component: AllComponent},//change id back to ...
  { path:'/conservative', name:'Conservative', component:Conservative},
  { path: '/home',  name: 'Home',  component:  Home },
  { path: '/todo', component: Todo, name: 'Todo' },
  { path: '/redux', component: Recipes, name: 'Recipes' },
  // Async load a component using Webpack's require with
  // es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
])
export class App {
  //lock = new Auth0Lock('T1wdQrDposGW5BisaKViC0Cu9CuxtR0c', 'towfeek.eu.auth0.com');
    jwtHelper: JwtHelper = new JwtHelper();
    ngZone: NgZone;
  arrowHead='assets/img/8963.png'; 
  angularLogo = 'assets/img/angular-logo.png';
  name = 'Angular 2 MEAN Webpack Starter';
  url = 'https://twitter.com/datatype_void';
  registerChoice:boolean = true;
  loggedIn:boolean = false;
  successFailureModal:boolean = false;
  registerUsernameAlert:boolean=false;
  loginAlert:boolean=false;
  showLogin:boolean=true;
  pathName:any;
  canRegister:boolean=true;
  registerPasswordLength:boolean=true;
  correctLogin:boolean=true

  // Pass in our application `state`
  // Alternative to using `redux`
  constructor(public appState: AppState,private _http:Http, private location:Location,private _router:Router) {
    this.pathName = location.prepareExternalUrl(location.path());
    console.log("the appcomponent pathname: "+this.pathName);
  }

    ngOnInit() {
    console.log('Initial App State', this.appState.state);
    //we check if the user is logged in already, in wich case there is no 
    //need to have the login or register option, only an option to logout.
    //create a variable (boolean) that check specifically which one of the options should
    //be choosen.
   var headers=new Headers();
   headers.append('content-type','application/json');
   var sent = JSON.stringify({text:"dummy"});

       this._http.post("/isLoggedIn",sent,{headers:headers})
          //pre:nothing
         //post:is the user logged in? If yes a=true  
    .map(res=>res.json())
    .subscribe(
      (data)=>{console.log("start of the isLoggedIn data");if(data.a){this.showLogin=false;console.log("isloggedin")}
      else if(data.a==false){this.showLogin=true;console.log("is not logged in");this.loggedIn=true}
      },
      (err)=>console.log(err),
      ()=>console.log("finsihed the isLoggedIn both on the client and the server side")
    )
   }

  

//The new register stuff 

registerFocusPasswordOut(registerPassword){
var password = registerPassword.value;
console.log("the password length: "+password.length)
if(password.length<7){
  console.log('paswword length smaller')
  this.registerPasswordLength = false;
  this.canRegister=false;
}else{
  this.registerPasswordLength = true;
  this.canRegister=true;
}
}

onRegisterFormSubmit(username,password,modal){
  //pre:username,password
  //post:user registererd in mongodb database

  //Do not forget to have the already registered usernames not be registered again, and
  //send an error message instead
  

  //!!! iii for today:1 Make sure the redirect system for login and register
  //AND the error systeme for the login work correctly
  //2 the register must make sure that the user is not already existent
  //(use the already existent registerAlert)
  //!!! iii
  var username = username.value;
  var password = password.value;
  if(password.length<7){
    this.registerPasswordLength = false;
  this.canRegister=false;
  }else{
  var send = JSON.stringify({username:username,password:password,url:this.pathName});
  var headers = new Headers;
  headers.append('Content-Type','application/json');
  this._http.post('/Register',send,{headers:headers})
  .map(res=>res.json())
  .subscribe(
    (data)=>{if(data.a===true){
      this._router.navigate(['./All']);
    };
    if(data.uniqueUser==false){
      this.registerUsernameAlert=true;
    }else{
      this.registerUsernameAlert=false;
    }
  
  },
    (err)=>console.log(err),
    ()=>console.log("login finished both on the client and server side")
  )
  }
};
//The new login stuff 
onLoginFormSubmit(username,password,modal){
  console.log('the modal: '+modal);
  var username = username.value;
  var password = password.value;
  console.log("onLoginFormSubmit, the typeof and the values of the username and password: "+typeof username, typeof password, username, password);
    var send = JSON.stringify({username:username,password:password,url:this.pathName});
  var headers = new Headers;
  headers.append('Content-Type','application/json');
  this._http.post('/Login',send,{headers:headers})

              //pre:Username and password provided by a user
              //post:User is logged in (or not)
  .map(res=>{/* if(res.status !== 200){this.loggedIn = false;this.loginAlert=true}else{ this.loginAlert=false;*/return res.json()/*}*/})
  .subscribe(
    (data)=>{
      if(data.correctUsername===false){
       this.correctLogin=false
      }
      if(data.a===true){
       this._router.navigate(['./All']);
       this.showLogin=false
      };
      /*console.log("the login is finished and the subscription has started, the data.a: ");
    if(data.a===true){
      console.log("in the if=true")
    }
    this.loggedIn=true;
     console.log(this.loggedIn);*/

  },
    (err)=>console.log(err),
    ()=>console.log("login finished both on the client and server side")
  )
};


  registerOrLogin(){
    //pre:nothing
    //post:changes wether the login or the register form are to be shown
    if(this.registerChoice == true){
      this.registerChoice = false;
    }else{
      this.registerChoice = true;
    };
  };
  onLogout(){
    var headers = new Headers;
    headers.append("Content-Type",'application/json');
    var send = JSON.stringify({name:"a"});
    this._http.post("/Logout",send,{headers:headers}).map(res=> res.json())
    .subscribe( 
      (data)=>{
        if(data.a===true){
         this.showLogin=true;
        }      
      },
            (err)=>console.log(err),
            ()=>{}
    );
}
};


/*
 * For help or questions please contact us at @datatype_void on twitter
 * or our chat on Slack at http://www.davidniciforovic.com/wp-login.php?action=slack-invitation
 */
