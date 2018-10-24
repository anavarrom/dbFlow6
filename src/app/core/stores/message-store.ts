// External Imports
// import remotedev                                       from 'mobx-remotedev/lib/dev';
import { Injectable                                  } from '@angular/core';
import { observable, computed, action, autorun, toJS } from 'mobx';

// Project Imports
import { UsersService } from '../services/users.service';
import { Message, IMessage                           } from '../../../models/message';
import { Label                                       } from '../../../models/label';
import { Notification                                } from '../../../models/notification';
import { PaginateOptions, IPaginateResult             } from '../services/basePagination';

@Injectable()
export class MessageStore {
  @observable messages:        Message[]         = [];
  @observable labels:          Label[]           = [];

  messageOptions: PaginateOptions                = null;

  constructor(private usersService: UsersService) {

    this.messageOptions       = new PaginateOptions();
    this.messageOptions.limit = 20;
    this.messageOptions.page  = 0;

    // this.usersService.getMessages()
    //  .subscribe(messages => this.messages =  messages);

    this.usersService.processLabels()
      .subscribe(labels => this.labels =  labels);
        autorun(() => {
    });
  }

  @computed get allMessages(): Message[] {
    return this.messages;
  }

  @computed get allLabels(): Label[] {
    return this.labels;
  }

  @action moreMessages() {
    this.usersService.getMessagesPage(this.messageOptions).subscribe(
      (messages: IPaginateResult<Message> ) => {
        const msgs: Message[] = messages.docs;
        this.messages.push.apply(this.messages, msgs);
        this.messageOptions.offset += 2;
      }, err => {
        // Log errors if any
        console.log(err);
      }
    );
  }
}
