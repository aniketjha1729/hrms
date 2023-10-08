import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  // sendMessage() {
  //   this.socket.emit('message');
  // }

  getMessage() {
    console.log('Socket Called');

    return this.socket.fromEvent('message');
  }
}
