// External Imports
import { Injectable  } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { AuthService } from 'ng2-ui-auth';
import 'rxjs/add/operator/map';

// Shared Imports
import { Message, IMessage              } from '../../../models/message';
import { Label, ILabel                  } from '../../..//models/label';
import { Notification, INotification    } from '../../..//models/notification';
import { ITokenUser                     } from '../../../models/user';

// Internal Imports
import {IPaginateOptions, IPaginateResult } from './basePagination';

@Injectable()
export class UsersService {

  constructor ( private http: HttpClient,
                private auth: AuthService) {

  }

  getMessagesPage(options: IPaginateOptions): Observable<IPaginateResult<IMessage>> {
    return this.http.post('/auth/user/pageMessages', options)
    .map(response => response as IPaginateResult<IMessage>);
  }

  getMessages(): Observable<IMessage[]> {
    return this.http.get('/auth/user/messages')
    .map(response => response as IMessage[]);
  }

  getLabels(): Observable<ILabel[]> {
    return this.http.get('/auth/user/labels')
    .map(response => response as ILabel[]);
  }

  getUsers(): Observable<ITokenUser[]> {
    return this.http.get('/auth/user/users')
    .map(response => response as ITokenUser[]);
  }

  processLabels(): Observable<ILabel[]> {
    return this.http.get('/auth/user/processLabels')
    .map(response => response as ILabel[]);
  }

  processMessages(): Observable<IMessage[]> {
    return this.http.get('/auth/user/processMessages')
        .map(response => response as IMessage[])
    ;
  }

  countPendingMessages(): Observable<number> {
    return this.http.get('/auth/google/countPendingMessages')
        .map(response => response as number)
    ;
  }

  indexMessages(): Observable<number> {
    return this.http.get('/auth/search/indexEmails')
        .map(response => response as number);
  }

  search(text: string): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    // let obj = JSON.parse(text);

    return this.http.post('/auth/search/search', {text}, httpOptions)
        .map(response => response as any[]);
  }

}
