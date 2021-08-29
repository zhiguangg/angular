import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn: 'root' })
export class PostService {
  errors: Subject<string> = new Subject();

  constructor(private http: HttpClient) {}

  createAndPost(title: string, content: string) {
    this.http.post<{ name: string }>(
      'https://ng-complete-2nd.firebaseio.com/posts.json', 
      { title: title, content: content }, {
        headers: new HttpHeaders({ 'custom-header': 'myHeader'})
      }
    ).subscribe((posts)=> {
      console.log(posts);
    }, error => {
      this.errors.next(error);
    });
  }

  fetchPosts() {
    return this.http.get<{[ key: string]: Post}>(
      'https://ng-complete-2nd.firebaseio.com/posts.json')
      .pipe(map(response =>{
        const postArray: Post[] = [];
        for(const key in response) {
          if(response.hasOwnProperty(key)){
            postArray.push({ ...response[key], id: key });
          }
        }
        return postArray;
      }, catchError(error =>{
        return throwError(error);
      }))
    );
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-2nd.firebaseio.com/posts.json');
  }
}