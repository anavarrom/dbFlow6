// External Imports
import { Component, OnInit                                  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators    } from '@angular/forms';
import { Router                                             } from '@angular/router';
import { AuthService                                        } from 'ng2-ui-auth';

// Custom services
import { FormHelperService } from '../../core/services/form-helper.service';
import { UserStore         } from '../../core/stores/user-store';
// Custom models
import { ITokenUser } from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor( private auth: AuthService,
               private router: Router,
               private fb: FormBuilder,
               private userStore: UserStore,
               public fh: FormHelperService) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  login(loginData: { username: string, password: string }) {
    this.auth.login(loginData)
      .subscribe({
        error: (err: any) => alert(err.message),
        next: (data: any) => {
            const currentUser = data.tokenInfo;
            // Update the user store
            this.userStore.setCurrentUser(currentUser);
        },
        complete: () => {
          this.router.navigateByUrl('main');
        }
      });
  }

  loginWithGoogle() {
    this.auth.authenticate('google')
      .subscribe({
        error: (err: any) => alert(err.message),
        next: (data: any) => {
          const currentUser = data.tokenInfo;
          // Update the user store
          this.userStore.setCurrentUser(currentUser);
      },
      complete: () => {
          this.router.navigateByUrl('main');
        }
      });
  }
}
