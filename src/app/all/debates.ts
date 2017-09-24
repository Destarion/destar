import {Component, OnInit,Output,EventEmitter,Input} from '@angular/core';
import {Http,Headers} from '@angular/http';
import {RouterLink,RouteParams} from '@angular/router-deprecated';
import {NgFor} from '@angular/common';
import 'rxjs/operator';
import {Observable} from 'rxjs/Observable';

//RADIO STUFF IS TO BE FOUND here
@Component({
    selector:"radio-answers",
    template:`
    <h4>{{ answerDisplay }}:{{ votes }}</h4><br />
    `
})
class radioAnswers{
     id:any = this._routeParams.get("id");
    @Output() gatherStuff = new EventEmitter();
    @Input() votes:Number=3;
    @Input() idx:number;
    @Input() answerDisplay:any;
    @Input() chosen:boolean=false;
constructor(private _http:Http,private _routeParams:RouteParams){
}
ngOnInit(){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var send = JSON.stringify({subName:'all',id:this.id})
    this._http.post('/initPollVotes',send,{headers:headers})
    .map(res=>res.json())
    .subscribe(
     (data)=>{

         this.gatherStuff.emit({idx:this.idx,pollVotes:data.pollVotes,answers:data.answers})
     }
    )
    //Continue here, this fetches the answer and vote with the idx we give the parent Component
}

}

@Component({
    selector:"radio-choices",
    template:`
    <label>{{ answer }}</label>
    <button class="btn btn-secondary" (click)="check()">choose</button><br />
    
    `
})
class radioChoices{
    id:any;
    controllIdx:number;
    @Output() changeIdx = new EventEmitter();
    @Output() change = new EventEmitter();
    @Input() idx:number=-1;
    @Input() answer:any;
constructor(private _http:Http,private _routeParams:RouteParams){
this.controllIdx=-1
}
ngOnInit(){
    console.log(this.answer);
    this.answer = this.answer.value;

}
check(){
this.change.emit({idx:this.idx});
}
}

//END OF RADIO STUFF

class Debate{
    author:String;
    content:String;
    constructor(author:string,content:string){
        this.author = author;
        this.content = content;
    }
}

@Component({
    selector:'reddit-debate',
    inputs:['debate'],
    host:{
        class:'row'
    },
    template:`
    <div class='container'>
    <div class='panel panel-default'>
    <div class='panel-body'>
    <div class='row-fluid'>
    {{debate.author}}
    </div>
    <div class='row-fluid'>
    {{debate.content}}
    </div>
    </div>
    </div>
    </div>
    `
})
class DebateComponent{
    debate: Debate;
    
}

@Component({
    selector:'add-debate',
    directives: [DebateComponent,RouterLink,NgFor,radioChoices,radioAnswers],
    template:`
    <div class="container">
    <div *ngIf="debatePoll === true">
    <h3>Poll:{{ question }}</h3>
    <radio-choices [chosen]="chosen" [answer]="answer" [idx]="idx" *ngFor="let answer of answers;let idx = index" (change)="onChange(idx)" (changeIdx)="onIdx($event.value)"></radio-choices>
    </div>
    </div>
    <div class='container'>
    <div class='form'>
    <form role='form'>
    <textarea name='text' #newtext></textarea>
    <button *ngIf="isLoggedIn" class="btn btn-primary" (click)="addDebateComment(newtext)">submit</button>
    <button *ngIf="isLoggedIn===false" class="btn btn-primary" (click)="submitNotLoggedIn()">submit</button>
    <div *ngIf="loginAlert" class="alert alert-danger">You need to be logged in to do that</div>
    </form>
    </div>
    </div>
    <div class="container">
    <div class="ui grid post">
    <div *ngIf="chosen === true">
    <radio-answers [answerDisplay]="answerDisplay" [idx]="idx" *ngFor="let answer of answers;let idx = index" [votes]="votes" (gatherStuff)="sendAnswers($event.idx,$event.pollVotes,$event.answers)"></radio-answers>
    <reddit-debate *ngFor='#debate of debates' [debate] = 'debate'>
    </reddit-debate>
    </div>
    </div>
    `
})
export class addDebateComments{
    loginAlert:boolean=false;
    stringed:any;
    parsed:any
    one:any=1;
    answerDisplay:any;
    votes:Number;
    chosen:any=false;
    answers:[{idx:number,value:string}];
    answer:string;
    idx:number;
    question:string;
    debatePoll:boolean;
    radios:any[];
    debates:Debate[];
    subName:String;
    profile:String;
    title:String;
    author:any;
    content:any;
    id:any;
    isLoggedIn:boolean=false;
    userName:any;
    articlesId:any;
    pollVotes:[{idx:String,votes:Number}];
    constructor(private _http:Http, private _routeParams:RouteParams){
        this.id = this._routeParams.get("id");
        var cut = this.id.indexOf(" ");
        this.subName=this.id.substring(0,cut);
        this.articlesId = this.id.substring(cut+1);
        this.debatePoll=false;
        this.debates = [];
    }
    ngOnInit(){
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
                }else if(data.isAuthenticated===true){
                    this.isLoggedIn=true;
                    this.userName=data.userName;
                    console.log(data.userName)
                }
            },
            (err)=>console.log(err),
            ()=>console.log("the initiation of the comment pages user is finished")
        )
        //pre:username, subName, articles Id
        //post:debate comments retrieved and displayed,question and answer choices initialized
        var headers = new Headers();
      headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({subName:this.subName,articlesId:this.articlesId,userName:this.userName})
        console.log("before sending, the subname: "+this.subName)
        this._http.post('/debateCommentInit',send,{headers:headers})
        .map(res=>res.json())
        .subscribe(
          data=>{
              //Check if the user has already voted
               /*var stringVote = JSON.stringify(data.voted)
               var parsedVote = JSON.parse(stringVote);
              data.voted.forEach((user)=>{
                  console.log('!!inside the forEach')
                  if(user = 'raphael.baudeu@gmail.com'){
                      console.log('user found : '+user)
                      this.chosen = true;
                  }
                  console.log('after the init the value of this.chosen is : '+this.chosen)
              })
              //load the answers and put them inside the radios array
              this.answers = JSON.parse(data.answers);
              //load the votes
              if(data.votes !== undefined && data.votes !== null){
               this.pollVotes = data.votes;
              }else{console.log('There are no votes')};
              //load the question
              if(data.question !==undefined && data.question!==null){this.debatePoll = true;this.question = data.question;console.log('The debatePoll value : '+this.debatePoll)}else{console.log('question = null or undefined')}
              //load the debate Comments.
              console.log('The data will be shown here')*/
            data.array.forEach((debate)=>{
                var content = debate.content;
                var author = debate.author
           this.debates.push(new Debate(author,content));
           });
            },
         err=>console.log(err),
          ()=>console.log('The Debate Comment section was succesfully initialized')
        )
    }
    addDebateComment(input:HTMLInputElement){
        console.log('adding Debate comments started');
        var profile = this.profile;
        var send = JSON.stringify({data:input.value,subName:this.subName,articlesid:this.articlesId, profile:this.userName})
         var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post('/debates',send,{headers:headers
            })
        .map(res=>res.json())
        .subscribe(
            (data)=>console.log(data),
            (err)=>console.log(err),
            ()=>console.log('finished')
            
        )
       
        
    }
   onChange(idx){
//MUCH BETTER and angulary solution to be found for the checking
console.log('before : '+this.chosen)
    if(this.chosen === true){window.alert('You have already chosen')}else{
           console.log('while pressing, the value of this.chosen is : '+this.chosen)
    //MUCH BETTER and angulary solution to be found for the checking      
    //Checks if the user has already voted, and if not, adds him to the list of people who have voted  
    if(this.chosen === true){window.alert('You have already chosen')}
    else{
        var headers = new Headers();
        headers.append('Content-Type','application/json');
          var subName = "all";
          var id = this.id;
        var send = JSON.stringify({userName:'raphael.baudeu@gmail.com',subName:subName,id:id});
        this._http.post('/debateChosen',send,{headers:headers})
        .map(res=>res.json())
        .subscribe(
            (data)=>{console.log('sucess? : '+data);this.chosen = true},
            (err)=>console.log(err),
            ()=>console.log('process finished')
        )
    }


        console.log('after : '+this.chosen)
       console.log('idx: '+idx);
       var headers = new Headers();
       var subName = 'all';
       var id = this.id
       headers.append('Content-Type','application/json');
       var send = JSON.stringify({idx:idx,subName:subName,id:id});
       this._http.post('/pollVotes',send,{headers:headers})
       .map(res=>res.json())
       .subscribe(
           (data)=>{
              this.stringed = JSON.stringify(data);
              this.parsed = JSON.parse(this.stringed)
               console.log('data pollVotes : '+data);
               console.log('pollVotes, pollVotes.length : '+JSON.stringify(this.pollVotes),JSON.stringify(this.pollVotes.length))
             this.parsed.forEach((vote)=>{
                 console.log('el votes : '+vote.votes)
                 if(vote.idx=idx){vote.votes += this.one}
             });
             this.pollVotes = this.parsed;
             console.log('before this.parsed : '+this.parsed)
             console.log(this.pollVotes)
           },
           (err)=>console.log(err),
           ()=>console.log('finished')
       )
    }
   }
onIdx(idx){
  
}
sendAnswers(idx,pollVotes,answers){
    console.log('answers : '+answers)
    console.log('sendAnswers start')
    var stringed = JSON.stringify(pollVotes);
    var parsed = JSON.parse(stringed);
    console.log('this.parsed : '+this.parsed)
this.answers.forEach((answer)=>{
    if(answer.idx == idx){
        console.log('right idx for answers found');
        console.log('answer value : '+answer.value)
       this.answerDisplay = answer.value;
       console.log('------------------------------------------')
       console.log('after answerDisplay : '+this.answerDisplay)
       console.log('------------------------------------------')
    }
    else{console.log('There was an error in the fetching of the right answer')};
});

this.pollVotes.forEach((vote)=>{
    if(vote.idx == idx){
        console.log('pollVote idx was found');
        this.votes = vote.votes;

        console.log('this.votes : '+this.votes)
    }
})
var answerString = JSON.stringify(answers);
answers.forEach((el,index)=>{
      console.log('element : '+el.value)
        if(el.idx = idx){
            this.answer = el.value;
            console.log('el.value : '+el.value);
        }
    })
this.parsed = parsed
console.log('forEach answers finished')

}
submitNotLoggedIn(){
    //pre:clicked on submit but not logged in
    //post:displays message saying that you need to be logged in to do this
    this.loginAlert=true;
}

}