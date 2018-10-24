// External Imports
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable              } from 'rxjs';
import { AuthService             } from 'ng2-ui-auth';
import 'rxjs/add/operator/map';

// Shared Imports
import { Appointment, IAppointment      } from '../../../models/appointments';
import { ITokenUser                     } from '../../../models/user';

// Internal Imports
import {IPaginateOptions, IPaginateResult } from './basePagination';

@Injectable()
export class CalendarService {

  constructor ( private http: HttpClient,
                private auth: AuthService) {

  }

/*  getMessagesPage(options:iPaginateOptions): Observable<iPaginateResult<iMessage>> {
    return this.http.post('/auth/user/pageMessages', options)
    .map(response => response as iPaginateResult<iMessage>)
  }*/

  getAllAppointments(): Observable<IAppointment[]> {
    return this.http.get('/auth/calendar/allAppointments')
    .map(response => response as IAppointment[]);
  }

}
