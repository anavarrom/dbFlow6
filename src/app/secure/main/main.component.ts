import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';



import {Label, LabelsService} from './main.service';

import {MessageStore} from '../../core/stores/message-store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [LabelsService]
})

export class MainComponent implements OnInit {
  user: any;
  expiration: Date;
  secret: Observable<string>;
  labelsDto: Label[];
  errorMessage: string;
  myLabels: any;
  myMessages: any;

  constructor(private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private labelsService: LabelsService, public  messages: MessageStore) {

    this.myLabels = [];
    this.myMessages = [];
  }

  ngOnInit() {
    this.user = this.auth.getPayload();
    this.expiration = this.auth.getExpirationDate();
    this.secret = this.http.get<string>('/secret');
    // this.messages.loadMessages3();
  }

  logout() {
    this.auth.logout()
      .subscribe({
        error: (err: any) => alert(err.message),
        complete: () => this.router.navigateByUrl('login')
      });
  }

  refresh() {
    this.http.get<string>('/auth/refresh')
      .pipe(tap(token => this.auth.setToken(token)))
      .subscribe({
        error: (err: any) => alert(err.message),
        complete: () => this.expiration = this.auth.getExpirationDate()
      });
  }

  link() {
    this.auth.link('google')
      .subscribe({
        error: (err: any) => alert(err.message),
        complete: () => {
          this.expiration = this.auth.getExpirationDate();
          this.user = this.auth.getPayload();
        }
      });
  }

   getLabels() {
    const allLabelsURL = 'http://localhost:3000/auth/labels';  // URL to web API

    // let x;
     // this.http.get<string>('/auth/labels')
     this.http.get<string>('/auth/google/labels2')
      .pipe(tap(token => this.auth.setToken(token)))
      .subscribe(
        labels => this.myLabels = labels,
        error =>  this.errorMessage = <any>error);
     // this.labelsService.getAllLabels()
  /*   this.http.get('/auth/labels')
                  .pipe(tap(token => this.auth.setToken(token)))
                     .subscribe(
                       labels => x = labels,
                       error =>  this.errorMessage = <any>error);

                       */
  }

   getMessages() {
   /* this.http.get<string>('/auth/google/messages')
   //   .pipe(tap(token => this.auth.setToken(token)))
      .subscribe(
        patata => this.myMessages = patata,
        error =>  this.errorMessage = <any>error);*/
  }
}

