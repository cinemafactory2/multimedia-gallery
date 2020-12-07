import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MultimediasService {
  constructor(private http: HttpClient) {}

  getMultimedias() {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http
        .get(environment.requestBase + '/api/getMulti', options)
        .subscribe(
          (data: any) => {
            console.log(data);

            resolve(data);
          },
          err => {
            reject('There was an error getting the multimedia files');
          }
        );
    });
  }

  createMultimedia(multimedia) {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http
        .post(
          environment.requestBase + '/api/createMultimedia/',
          multimedia,
          options
        )
        .subscribe(
          (data: any) => {
            resolve('The multimedia was created');
          },
          err => {
            reject('There was an error creating the multimedia');
          }
        );
    });
  }
}
