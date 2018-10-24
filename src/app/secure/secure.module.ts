// External Modules
import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';
import { FormsModule       } from '@angular/forms';
import { MobxAngularModule } from 'mobx-angular';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

// Custom modules
import { PrimeModule             } from '../shared/prime.module';
import { MaterialModule             } from '../shared/material.module';
// Custom Components
import { MessageStore                 } from '../core/stores/message-store';
import { UserStore                 } from '../core/stores/user-store';

// Project Services
import { UsersService           } from '../core/services/users.service';
import { SecureSocketioService  } from './secure-socketio.service';
import { SecureComponent        } from './secure.component';
// import { ProcessMessageComponent} from './messages/process-message/process-message.component';
// import { SearchComponent } from './search/search.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MobxAngularModule,
    PrimeModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    NgxJsonViewerModule
  ],
  declarations: [SecureComponent/*, SearchComponent*/],
//  providers: [{ provide: Todos, useClass: remotedev(Todos) }],
  providers: [UserStore, MessageStore, UsersService, SecureSocketioService],
  exports: [SecureComponent],
  entryComponents: [
    // ProcessMessageComponent
  ],

})
export class SecureModule { }
