import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private serverUrl = `${environment.url}`;
  constructor(private http: HttpClient) {}

  testRoute() {
    return this.http.get(`${this.serverUrl}/hello`);
  }
}
