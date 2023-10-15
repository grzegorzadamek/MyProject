import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public post: any;

  constructor(private _http: HttpClient) { }

  public getMeeting(url: string): Observable<any> {
    return this._http.get(url, {responseType: 'text'});
  }

  public getMeetingByPost(data: string): Observable<any> {
//      return this._http.post<any>('http://grzegorzadamek.ct8.pl:6321/data', {data}
     return this._http.post<any>('https://netly-node.onrender.com/data', {data}
//      return this.http.post<any>('http://localhost:3000/data', {data}
     );
  }

  public getBlackList(): Observable<any> {
  return this._http.get('/src/services/blackList.json', {responseType: 'text'});
  }
}
