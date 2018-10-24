// External Modules
import { NgModule         } from '@angular/core';
import { CommonModule      } from '@angular/common';
import { FormsModule       } from '@angular/forms';
import { MobxAngularModule } from 'mobx-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

// Custom modules
import { PrimeModule                     } from '../../shared/prime.module';
import { MaterialModule                  } from '../../shared/material.module';
// Custom Components
import { NotificationStore                } from '../../core/stores/notification-store';
import { UserStore                        } from '../../core/stores/user-store';
import { CollectionNotificationsComponent } from './collection-notifications/collection-notifications.component';
import { NotificationDetailComponent      } from './notification-detail/notification-detail.component';

// Project Services
import {UsersService} from '../../core/services/users.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MobxAngularModule,
    PrimeModule,
    MaterialModule,
    FlexLayoutModule,
    VirtualScrollModule
  ],
  declarations: [CollectionNotificationsComponent, NotificationDetailComponent],
//  providers: [{ provide: Todos, useClass: remotedev(Todos) }],
  providers: [
    UserStore,
    NotificationStore,
    UsersService
  ],
  exports: [ CollectionNotificationsComponent, NotificationDetailComponent],
  entryComponents: [
    NotificationDetailComponent
  ],
})
export class NotificationsModule { }


