import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerUser(
    username: string,
    password: string,
    password2: string,
    first_name: string,
    last_name: string,
    email: string
  ) {
    return new Promise((resolve, reject) => {
console.log(username,password,password2,first_name,last_name,email);

      if (
        password === username ||
        password === first_name
      ) {
        return reject('You password must be different to your personal information');
      } else if (
        password2 != password
      ) {
        return reject('Your passwords do not match');
      } else {
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };

        const requestBody = {
          username,
          password,
          first_name,
          last_name,
          email
        };

        this.http
          .post(environment.requestBase + '/api/addUser/', requestBody, options)
          .subscribe(
            (data: any) => {
              resolve(data);
            },
            err => {
              console.log(err);
              reject(err);
            }
          );
      }
    });
  }
}
