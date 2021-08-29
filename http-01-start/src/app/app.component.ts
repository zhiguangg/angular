import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching: boolean = false;
  error = null;
  errorSub: Subscription;
  
  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.errors.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.postService.fetchPosts().subscribe(posts=>{
      this.loadedPosts = posts;
    }, error =>{
      this.error = error.message;
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndPost(postData.title, postData.content);
    console.log(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts()
    .subscribe(posts =>{
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error =>{
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    });
  }

  onHandlingError() {
    this.error = null;
  }
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
