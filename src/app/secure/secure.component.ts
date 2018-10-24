// External Imports

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';
import { MatSnackBar, MatDialog} from '@angular/material';

// Project Imports
import { UsersService         } from '../core/services/users.service';
import { UserStore            } from '../core/stores/user-store';

import { SecureSocketioService   } from './secure-socketio.service';
import { environment             } from '../../environments/environment';
// Project Componnets
// import {ProcessMessageComponent} from './messages/process-message/process-message.component'


@Component({
  selector: 'app-secure-comps',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']

})

export class SecureComponent {
  title = 'app';
  events = [];
  opened = true;
  searchText = '';
  searchResult: any;

  // private socket: SocketIOClient.Socket;

  constructor( private auth: AuthService,
               private router: Router,
               public snackBar: MatSnackBar,
               private userService: UsersService,
               public userStore: UserStore,
               private socketService: SecureSocketioService,
               public dialog: MatDialog,  ) {
    //   this.socket = io('http://localhost:3000',{transports: ['websocket'] });


      /*this.socket.on('connection', function(msg) {
        this.socket.emit('Im here', 'Im herre');
      });*/


      /*this.socket.on('Msg', function(msg){
        this.snackBar.open(msg,"dfgfs" ,{duration: 1000} );
      });*/
      socketService.consumeSecureMessage();

    }

    logout() {
      this.auth.logout().subscribe({
        error: (err: any) => alert(err.message),
        complete: () => this.router.navigateByUrl('login')
      });
    }

    indexEmails() {
      this.userService.indexMessages().subscribe({
        error: (err: any) => alert(err.message),
        complete: () => {}
      });
    }


    processMessages() {

    /*  let dialogRef = this.dialog.open(ProcessMessageComponent, {
        disableClose: true,
        width: '640px',
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    */
      // this.userService.processMessages().subscribe(msgs => {
      //  this.snackBar.open("VAmosss!!!!!!!","dfgfs" ,{duration: 1000} );
     // });
      /*this.googleService.countPendingMessages()
      .subscribe(count => {
        this.snackBar.open("Pendientes " +  count,"dfgfs" ,{duration: 1000} );
        this.userService.processMessages();
      });*/
  }
}
