import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar} from '@angular/material';

import * as io from 'socket.io-client';
// import { ObservableArray } from 'mobx/lib/types/observablearray';

@Injectable()
export class SecureSocketioService {

  private socket: SocketIOClient.Socket;

  constructor(public snackBar: MatSnackBar) {
/*
    this.socket = io('http://localhost:3000', {transports: ['websocket'] });

    this.socket.on('connection', function(msg) {
        // this.socket.emit('Connected with the socket', 'Im herre');
        this.snackBar.open('Conectado con el webscoket', 'dfgfs' , {duration: 1000} );
    });
*/
  }
  messageProcessed(): Observable<any> {
  /*  // let self = this;
    return Observable.create(observer => {
      this.socket.on('MsgRead', function(msg) {
        observer.next(msg);
      });
    });*/
    return null;
  }

  consumeSecureMessage() {
/*
    const self = this;
    this.socket.on('Test', function(msg) {
      self.snackBar.open('Prueba:' + msg , '' , {duration: 1000} );
    });

    this.socket.on('MsgCount', function(msg) {
      self.snackBar.open('Procesando ' + msg  + ' mensajes', '' , {duration: 1000} );
    });

    this.socket.on('Msg', function(msg) {
      self.snackBar.open('Mensaje ' + msg  + ' procesado', '' , {duration: 1000} );
    });

    // this.snackBar.open("ESto es una prueba","dfgfs" ,{duration: 1000} );
    */
  }
}
