import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(protected http: HttpClient) {}

  protected handleError(error: HttpResponse<any> | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof HttpResponse) {
      const body = error.body.json() || '';
      const err = body.error || body.Message || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else if (error.error && error.error.Message && error.error.StackTrace) {
      const exception = error.error as {
        Message: string;
        StackTrace: string;
        InnerException: { Message: string; StackTrace: string };
      };
      errMsg = exception.InnerException.Message
        ? exception.InnerException.Message
        : exception.Message;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return observableThrowError(errMsg);
  }
}
