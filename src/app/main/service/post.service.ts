import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public https: HttpClient) { }


  getPosts() {
    return this.https.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  }

  updateData(body: any) {
    let headers = new HttpHeaders();
    // let params = new HttpParams();

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // params = params.set('id', body.id)

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.https.post(`https://jsonplaceholder.typicode.com/posts`, body,{headers: headers})
  }
}
