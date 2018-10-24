// External Imports
// import remotedev                                       from 'mobx-remotedev/lib/dev';
import { Injectable                                  } from '@angular/core';
import { TokenUser, ITokenUser                        } from '../../../models/user';
import { observable, computed, action, autorun, toJS } from 'mobx';
import { AuthService                                        } from 'ng2-ui-auth';

// Project Imports
import { UsersService } from '../services/users.service';

@Injectable()
export class UserStore {
   @observable currentUser:  TokenUser;
   @observable users:        TokenUser[] = [];

  constructor( private auth: AuthService,
               private usersService: UsersService) {

    if (this.auth.isAuthenticated()) {
      this.setCurrentUser(this.auth.getPayload());
    }
    this.usersService.getUsers()
    .subscribe(users => this.users =  users);

    autorun(() => {
  });
  }

  @computed get allUsers(): TokenUser[] {
    return this.users;
  }

  @action setCurrentUser(user: ITokenUser) {
   this.currentUser = user;
  }

 }
