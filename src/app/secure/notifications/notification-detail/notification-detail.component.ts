// External Imports
import { Component, OnInit, Inject } from '@angular/core';
// import { NgModel } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';

// Internal Imports
import {Notification} from '../../../../models/notification';
import { NotificationStore  } from '../../../core/stores/notification-store';
import { MessageStore } from '../../../core/stores/message-store';

import { UserStore } from '../../../core/stores/user-store';


@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})

export class NotificationDetailComponent implements OnInit {

  public notification: Notification = new Notification();
  public hasDueDate                 = false;
  // public options :string[]= ['o1','o2','o3'];
  // public options2 :string[]= ['patata'];

  // @ViewChild('input') input: MatInput;

  constructor( public dialogRef: MatDialogRef<NotificationDetailComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               public  notificationStore: NotificationStore,
               public messageStore: MessageStore,
               public  userStore: UserStore
              ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNotification(): void {
    this.notificationStore.addNotification(this.notification);

    this.dialogRef.close();
  }

  ngOnInit() {
    // this.input. underlineRef.nativeElement.className = null;
  }

  addStatus(event: MatAutocompleteSelectedEvent) {
    if (this.notification.labels === undefined) {
      this.notification.labels = [];
    }
    this.notification.labels.push(event.option.value.value);
  }

  addInputStatus(event: MatChipInputEvent) {
    if (this.notification.labels === undefined) {
      this.notification.labels = [];
    }

    this.notification.labels.push(event.value);

    if (event.input) {
      event.input.value = '';
    }

  }

  removeStatus(value: string) {

    const index: number = this.notification.labels.indexOf(value);
    if (index !== -1) {
        this.notification.labels.splice(index, 1);
    }
  }
}
