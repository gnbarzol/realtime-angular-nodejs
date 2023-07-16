import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService extends Socket {
  constructor() {
    super({
      url: 'http://localhost:3000',
      options: {
        query: {
          role: 'admin',
        },
      },
    });
    this.listen();
  }

  listen(): void {
    this.ioSocket.on('eventox', (res: any) => {
      console.log("LLEGA")
      console.log(res);
    })  
  }

  emitir(): void {
    this.ioSocket.emit('eventox', {});
  }
}
