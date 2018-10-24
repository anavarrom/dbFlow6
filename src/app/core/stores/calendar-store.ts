// External Imports
// import remotedev                                       from 'mobx-remotedev/lib/dev';
import { Injectable                                  } from '@angular/core';
import { observable, computed, action, autorun, toJS } from 'mobx';

// Project Imports
import { CalendarService                             } from '../services/calendar.service';
import { Appointment                                 } from '../../../models/appointments';
import { PaginateOptions, IPaginateResult            } from '../services/basePagination';

@Injectable()
export class CalendarStore {
 // @observable appointments:   Appointment[]    = [];
  appointments:   Appointment[]    = [];
  // notificationOptions: PaginateOptions           = null;

  constructor(private calendarService: CalendarService) {

    // this.notificationOptions        = new PaginateOptions();
    // this.notificationOptions.limit  = 5;
    // this.notificationOptions.page   = 0;

    // this.usersService.getNotifications()
    //    .subscribe(notifications => this.notifications =  notifications);
  }

 all() {
    this.calendarService.getAllAppointments()
    .subscribe(appointments => this.appointments =  appointments);
  }

  /*@computed get allAppointments(): Appointment[] {
    return this.appointments;
  }*/
/*
  @action addNotification(notification: Notification) {
    this.usersService.addNotification(notification).subscribe(
      notification => {
        this.notifications.push(notification);
      },err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  @action moreNotifications() {
    this.usersService.getNotificationsPage(this.notificationOptions).subscribe(
      (notifications : iPaginateResult<Notification>)=> {
        let notifs: Notification[] = notifications.docs;
        this.notifications.push.apply(this.notifications, notifs);
        this.notificationOptions.offset += 2;
      },err => {
        // Log errors if any
        console.log(err);
      }
    );
  }*/
}
