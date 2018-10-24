// External Imports
// import remotedev                                       from 'mobx-remotedev/lib/dev';
import { Injectable                                  } from '@angular/core';
import { observable, computed, action, autorun, toJS } from 'mobx';

// Project Imports
import { NotificationService                         } from '../services/notification.service';
import { UsersService                                } from '../services/users.service';

import { Label                                       } from '../../../models/label';
import { Notification                                } from '../../../models/notification';
import { PaginateOptions, IPaginateResult            } from '../services/basePagination';

@Injectable()
export class NotificationStore {
  @observable notifications:   Notification[]    = [];

  notificationOptions: PaginateOptions           = null;

  constructor(private notifService: NotificationService,
              private usersService: UsersService) {

    this.notificationOptions        = new PaginateOptions();
    this.notificationOptions.limit  = 5;
    this.notificationOptions.page   = 0;

    this.usersService.processLabels();
        autorun(() => {
    });
  }


  @computed get allNotifications(): Notification[] {
    return this.notifications;
  }

  @action addNotification(notification: Notification) {
    this.notifService.addNotification(notification).subscribe(
      notif => {
        this.notifications.push(notif);
      }, err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  @action moreNotifications() {
    this.notifService.getNotificationsPage(this.notificationOptions).subscribe(
      (notifications: IPaginateResult<Notification>) => {
        const notifs: Notification[] = notifications.docs;
        this.notifications.push.apply(this.notifications, notifs);
        this.notificationOptions.offset += 2;
      }, err => {
        // Log errors if any
        console.log(err);
      }
    );
  }
}
