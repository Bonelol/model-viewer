import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { ModelClassDetails } from '../models/ModelClassDetails';

@Injectable({
  providedIn: 'root'
})
export class ModelDescribeService extends HttpService {
  rootUrl = 'https://localhost:44308';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getModels(): Observable<any> {
      const url = `${this.rootUrl}/model/list`;
      return this.http.get(url, {withCredentials: true}).pipe(
          map(response => {
              const json = response;
              return json as {Name: string, FullName: string}[];
          }),
          catchError(this.handleError));
  }

  getModelDesctiption(className: string): Observable<ModelClassDetails[]> {
    const url = `${this.rootUrl}/model/describe/${className}`;
    return this.http.get(url, {withCredentials: true}).pipe(
        map(response => {
            const json = response;
            return json as ModelClassDetails[];
        }),
        catchError(this.handleError));
  }

  search(query: any): Observable<any[]> {
    const url = `${this.rootUrl}/model/search`;
    return this.http.post(url, query, {withCredentials: true}).pipe(
      map(response => {
          const json = response;
          return json as any[];
      }),
      catchError(this.handleError));
  }

  update(query: any, values: Map<string, any>): Observable<any[]> {
    const url = `${this.rootUrl}/model/update?query=${JSON.stringify(query)}`;
    return this.http.post(url, values, {withCredentials: true}).pipe(
      map(response => {
          const json = response;
          return json as any[];
      }),
      catchError(this.handleError));
  }
}
