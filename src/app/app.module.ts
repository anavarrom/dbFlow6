// External Modules
import { HttpClientModule         } from '@angular/common/http';
import { NgModule                 } from '@angular/core';
import { ReactiveFormsModule      } from '@angular/forms';
import { BrowserModule            } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { Ng2UiAuthModule          } from 'ng2-ui-auth';
import { FlexLayoutModule         } from '@angular/flex-layout';
import { MobxAngularModule        } from 'mobx-angular';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';


// Custom  modules
import { AppRoutingModule         } from './app-routing.module';
import { SecureModule             } from './secure/secure.module';
import { PrimeModule              } from './shared/prime.module';
import { MaterialModule           } from './shared/material.module';
import { SharedModule             } from './shared/shared.module';
// import { MessagesModule           } from './secure/messages/messages.module';
// import { LabelsModule             } from './secure/labels/labels.module';
// import { AppointmenModule         } from './secure/appointments/appointments.module';
import { NotificationsModule         } from './secure/notifications/notifications.module';
// import { FilesModule              } from './secure/files/files.module';

// Custom Components
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';

// To be removed
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { MainComponent } from './secure/main/main.component';

// Project Services
import { FormHelperService } from './core/services/form-helper.service';
import { JsonInterceptorService } from './core/interceptors/json-interceptor.service';
 import { MyHttpLogInterceptor } from './core/interceptors/http.intercept';
// import {MyErrorHandler} from './shared/errors/MyErrorHandler';


@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    MainComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MobxAngularModule,
    FlexLayoutModule,
    MaterialModule,
    PrimeModule,
    SharedModule,
    SecureModule,
    // MessagesModule,
    // LabelsModule,
    // AppointmenModule,
    NotificationsModule,
    // FilesModule,
    Ng2UiAuthModule.forRoot({
      providers: {
        google: {
          clientId: '1040156216476-moaoejmnru44umfgjulbbr1tkb5lef7c.apps.googleusercontent.com',
          scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://mail.google.com/',
            'https://www.googleapis.com/auth/gmail.modify',
            'https://www.googleapis.com/auth/drive.appfolder',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/calendar'
          ]
        }
      }
    })
  ],
  providers: [
    JsonInterceptorService,
    FormHelperService,
  //  { provide: ErrorHandler, useValue: MyErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
