import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClipsService {
  constructor(private http: HttpClient) {}

  getClips(multimedia) {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http
        .get(environment.requestBase + '/api/clips/' + multimedia.id, options)
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          err => {
            console.log(err);
            reject('There was an error getting the clips');
          }
        );
    });
  }

  addClips(
    name: string,
    initialSec: number,
    finalSec: number,
    username: string,
    idMultimedia: number,
    duration: number
  ) {
    return new Promise((resolve, reject) => {
      if (
        name === '' ||
        initialSec < 0 ||
        finalSec == 0 ||
        finalSec > duration
      ) {
        reject('Invalid data for clips');
      } else {
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };

        const requestBody = {
          name,
          initialSec,
          finalSec,
          username,
          idMultimedia
        };

        this.http
          .post(environment.requestBase + '/api/addClip/', requestBody, options)
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
