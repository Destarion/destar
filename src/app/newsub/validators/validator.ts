import {Control} from '@angular/common';
import {Http, Headers, Response} from '@angular/http';
export class MainValidator{
    
    
    static CannotContainSpace(control:Control){
        if(control.value.indexOf(' ')>=0)
        return {cannotContainSpace:true}
        return null;
    }
}
