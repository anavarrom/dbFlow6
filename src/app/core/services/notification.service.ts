// External Imports
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable              } from 'rxjs';
import { AuthService             } from 'ng2-ui-auth';
import 'rxjs/add/operator/map';

// Shared Imports
import { Appointment, IAppointment      } from '../../../models/appointments';
import { Notification, INotification      } from '../../../models/notification';
import { ITokenUser                     } from '../../../models/user';

// Internal Imports
import {IPaginateOptions, IPaginateResult } from './basePagination';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor ( private http: HttpClient,
                private auth: AuthService) {

  }

  getNotificationsPage(options: IPaginateOptions): Observable<IPaginateResult<INotification>> {
    return this.http.post('/auth/notification/pageNotifications', options)
    .map(response => response as IPaginateResult<INotification>);
   }

  addNotification(notification: INotification): Observable<INotification> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post('/auth/notification/addNotification', notification, httpOptions)
    .map(response => response as INotification);
  }
}
