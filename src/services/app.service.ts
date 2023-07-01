import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public post: any;

  constructor(private http: HttpClient) { }

  getMeeting(url: string) {
    return this.http.get(url, {responseType: 'text'});
  }

  getMeetingByPost(data: string): Observable<any> {
     return this.http.post<any>('http://grzegorzadamek.ct8.pl:6321/data', {data}
//      return this.http.post<any>('http://localhost:3000/data', {data}
     );
  }
}
