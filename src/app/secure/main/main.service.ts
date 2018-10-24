
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';



// {"id":"Label_14","name":"DIVORCIO","messageListVisibility":"show","labelListVisibility":"labelShow","type":"user"}
export class Label {
  id: string;
  name: string;
  messageListVisibility: string;
  labelListVisibility: string;
  type: string;
}

@Injectable()
export class LabelsService {

  private allLabelsURL = 'http://localhost:3000/auth/labels';  // URL to web API
  private allMessagesURL = 'http://localhost:3000/google/Messages';  // URL to web API

  constructor () {}

  /*getAllLabels(): Observable<Label[]> {
    return this.http.get(this.allLabelsURL)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getAllMessages(): Observable<any[]> {
  return this.http.get(this.allMessagesURL)
                  .map(this.extractData)
                  .catch(this.handleError);
  }
*/
  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return observableThrowError(errMsg);
  }

}


