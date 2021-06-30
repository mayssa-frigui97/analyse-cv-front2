import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket : any;
  readonly uri : string = "http://localhost:3000";
  constructor() {
    this.socket =io(this.uri);
    this.socket.on('connected', function() {
      console.log("connected !");
  });
   }


  listen(eventName: string){
    return new Observable((subscriber)=> {
      this.socket.on(eventName, (data)=>{
        subscriber.next(data);
      })
    });
  }

  emi(eventName : string, data){
    this.socket.emit(eventName,data);
  }
}
