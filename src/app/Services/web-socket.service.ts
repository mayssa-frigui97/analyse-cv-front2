import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService{

  // socket : any;

  constructor(private socket : Socket) {
    // this.socket = io(this.uri);
    // this.socket.on('connected', function () {
    //   console.log("connected !");
    // });
  }

  listen(eventName: string){
    return new Observable((subscriber)=> {
      this.socket.on(eventName, (data)=>{
        subscriber.next(data);
      })
    });
  }

  emit(eventName : string, data){
    return this.socket.emit(eventName,data);
  }

  public getSockets(): Observable<any> {
    return this.socket.fromEvent<any>('test event');
  }



}
