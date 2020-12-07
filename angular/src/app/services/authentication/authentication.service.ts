import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      if (username === '' || password === '') {
        reject('Invalid data for authentication');
      } else {
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };

        const requestBody = {
          username,
          password
        };

        this.http
          .post(environment.requestBase + '/api/login/', requestBody, options)
          .subscribe(
            (data: any) => {
              localStorage.setItem('USER', JSON.stringify(data));
              resolve(data);
            },
            err => {
              console.log(err.error.error);
              reject(err.error.error);
            }
          );
      }
    });
  }

  isAuthenticated() {
    const userData = JSON.parse(localStorage.getItem('USER'));
    if (userData) {
      return userData.username;
    } else {
      return null;
    }
  }

  logOut() {
    localStorage.removeItem('USER');
    window.location.reload();
  }
}
